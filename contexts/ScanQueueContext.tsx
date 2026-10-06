import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { analyzeMathImage, analyzeMathText, MathProblemResult, OpenRouterError } from '@/lib/openrouter';

const STORAGE_KEY = 'math-homework-helper/scan-queue';

export type QueuedScan = {
  id: string;
  kind: 'photo' | 'text';
  // ponytail: base64 data kept inline in AsyncStorage for simplicity, same tradeoff
  // already accepted in SavedProblemsContext. Only set when kind === 'photo'.
  imageUri?: string;
  imageBase64?: string;
  mimeType?: string;
  note?: string;
  // Only set when kind === 'text'.
  problemText?: string;
  queuedAt: number;
  attempts: number;
  status: 'queued' | 'retrying' | 'solved' | 'failed';
  results?: MathProblemResult[];
  lastError?: string;
};

type ScanQueueContextValue = {
  queuedScans: QueuedScan[];
  enqueuePhotoScan: (imageBase64: string, mimeType: string, imageUri: string, note?: string) => Promise<void>;
  enqueueTextScan: (problemText: string) => Promise<void>;
  removeFromQueue: (id: string) => Promise<void>;
  retryNow: (id: string) => Promise<void>;
};

const ScanQueueContext = createContext<ScanQueueContextValue | null>(null);

export function ScanQueueProvider({ children }: { children: ReactNode }) {
  const [queuedScans, setQueuedScans] = useState<QueuedScan[]>([]);
  const queuedScansRef = useRef<QueuedScan[]>([]);
  const wasConnected = useRef(true);
  const networkState = Network.useNetworkState();

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setQueuedScans(JSON.parse(raw));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    queuedScansRef.current = queuedScans;
  }, [queuedScans]);

  const persist = useCallback((updater: (prev: QueuedScan[]) => QueuedScan[]) => {
    setQueuedScans((prev) => {
      const next = updater(prev);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const enqueuePhotoScan = useCallback(
    async (imageBase64: string, mimeType: string, imageUri: string, note?: string) => {
      const entry: QueuedScan = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        kind: 'photo',
        imageUri,
        imageBase64,
        mimeType,
        note,
        queuedAt: Date.now(),
        attempts: 0,
        status: 'queued',
      };
      persist((prev) => [entry, ...prev]);
    },
    [persist],
  );

  const enqueueTextScan = useCallback(
    async (problemText: string) => {
      const entry: QueuedScan = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        kind: 'text',
        problemText,
        queuedAt: Date.now(),
        attempts: 0,
        status: 'queued',
      };
      persist((prev) => [entry, ...prev]);
    },
    [persist],
  );

  const removeFromQueue = useCallback(
    async (id: string) => {
      persist((prev) => prev.filter((scan) => scan.id !== id));
    },
    [persist],
  );

  const attemptScan = useCallback(
    async (scan: QueuedScan) => {
      persist((prev) => prev.map((s) => (s.id === scan.id ? { ...s, status: 'retrying' } : s)));
      try {
        const results =
          scan.kind === 'photo'
            ? await analyzeMathImage(scan.imageBase64!, scan.mimeType!, scan.note)
            : await analyzeMathText(scan.problemText!);
        persist((prev) =>
          prev.map((s) => (s.id === scan.id ? { ...s, status: 'solved', results, attempts: s.attempts + 1 } : s)),
        );
      } catch (error) {
        // A network-level failure (fetch rejects) isn't an OpenRouterError — stay
        // queued for the next reconnect. An OpenRouterError (API-level) won't fix
        // itself by waiting, so mark it failed instead of retrying forever.
        const isNetworkFailure = !(error instanceof OpenRouterError);
        const message = error instanceof OpenRouterError ? error.message : 'Still unable to reach the network.';
        persist((prev) =>
          prev.map((s) =>
            s.id === scan.id
              ? { ...s, status: isNetworkFailure ? 'queued' : 'failed', lastError: message, attempts: s.attempts + 1 }
              : s,
          ),
        );
      }
    },
    [persist],
  );

  const retryNow = useCallback(
    async (id: string) => {
      const scan = queuedScansRef.current.find((s) => s.id === id);
      if (scan) await attemptScan(scan);
    },
    [attemptScan],
  );

  // Drain queued scans sequentially whenever connectivity transitions offline -> online.
  useEffect(() => {
    const isConnected = Boolean(networkState.isConnected && networkState.isInternetReachable !== false);
    if (isConnected && !wasConnected.current) {
      (async () => {
        for (const scan of queuedScansRef.current.filter((s) => s.status === 'queued')) {
          await attemptScan(scan);
        }
      })();
    }
    wasConnected.current = isConnected;
  }, [networkState.isConnected, networkState.isInternetReachable, attemptScan]);

  return (
    <ScanQueueContext.Provider
      value={{ queuedScans, enqueuePhotoScan, enqueueTextScan, removeFromQueue, retryNow }}>
      {children}
    </ScanQueueContext.Provider>
  );
}

export function useScanQueue() {
  const ctx = useContext(ScanQueueContext);
  if (!ctx) {
    throw new Error('useScanQueue must be used within a ScanQueueProvider');
  }
  return ctx;
}
