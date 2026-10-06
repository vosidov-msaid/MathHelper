import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'math-homework-helper/saved-problems';

export type SavedProblem = {
  id: string;
  // ponytail: base64 data URI kept inline in AsyncStorage for simplicity.
  // Upgrade to expo-file-system-backed storage if saved-image volume grows large.
  // Undefined for problems solved from typed/handwritten text input (no photo).
  imageUri?: string;
  question: string;
  subject: string;
  answer: string;
  steps: string[];
  savedAt: number;
};

type SavedProblemsContextValue = {
  savedProblems: SavedProblem[];
  addSavedProblem: (problem: Omit<SavedProblem, 'id' | 'savedAt'>) => Promise<void>;
  removeSavedProblem: (id: string) => Promise<void>;
};

const SavedProblemsContext = createContext<SavedProblemsContextValue | null>(null);

export function SavedProblemsProvider({ children }: { children: ReactNode }) {
  const [savedProblems, setSavedProblems] = useState<SavedProblem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setSavedProblems(JSON.parse(raw));
      })
      .catch(() => {});
  }, []);

  const persist = useCallback((updater: (prev: SavedProblem[]) => SavedProblem[]) => {
    setSavedProblems((prev) => {
      const next = updater(prev);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const addSavedProblem = useCallback(
    async (problem: Omit<SavedProblem, 'id' | 'savedAt'>) => {
      const entry: SavedProblem = {
        ...problem,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        savedAt: Date.now(),
      };
      persist((prev) => [entry, ...prev]);
    },
    [persist],
  );

  const removeSavedProblem = useCallback(
    async (id: string) => {
      persist((prev) => prev.filter((problem) => problem.id !== id));
    },
    [persist],
  );

  return (
    <SavedProblemsContext.Provider value={{ savedProblems, addSavedProblem, removeSavedProblem }}>
      {children}
    </SavedProblemsContext.Provider>
  );
}

export function useSavedProblems() {
  const ctx = useContext(SavedProblemsContext);
  if (!ctx) {
    throw new Error('useSavedProblems must be used within a SavedProblemsProvider');
  }
  return ctx;
}
