import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'math-homework-helper/quiz-best-scores';
const ATTEMPTS_STORAGE_KEY = 'math-homework-helper/quiz-attempts';
// ponytail: cap history length per quiz so AsyncStorage doesn't grow unbounded
// from repeated retakes; oldest attempts are dropped first.
const MAX_ATTEMPTS_PER_QUIZ = 20;

type BestScore = {
  score: number;
  total: number;
};

export type QuizAttempt = {
  score: number;
  total: number;
  takenAt: number;
};

type QuizProgressContextValue = {
  bestScores: Record<string, BestScore>;
  attempts: Record<string, QuizAttempt[]>;
  recordAttempt: (quizId: string, score: number, total: number) => void;
};

const QuizProgressContext = createContext<QuizProgressContextValue | null>(null);

export function QuizProgressProvider({ children }: { children: ReactNode }) {
  const [bestScores, setBestScores] = useState<Record<string, BestScore>>({});
  const [attempts, setAttempts] = useState<Record<string, QuizAttempt[]>>({});

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setBestScores(JSON.parse(raw));
      })
      .catch(() => {});
    AsyncStorage.getItem(ATTEMPTS_STORAGE_KEY)
      .then((raw) => {
        if (raw) setAttempts(JSON.parse(raw));
      })
      .catch(() => {});
  }, []);

  const recordAttempt = useCallback((quizId: string, score: number, total: number) => {
    setBestScores((prev) => {
      const existing = prev[quizId];
      if (existing && existing.score >= score) return prev;
      const next = { ...prev, [quizId]: { score, total } };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
    setAttempts((prev) => {
      const history = prev[quizId] ?? [];
      const next = {
        ...prev,
        [quizId]: [{ score, total, takenAt: Date.now() }, ...history].slice(0, MAX_ATTEMPTS_PER_QUIZ),
      };
      AsyncStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  return (
    <QuizProgressContext.Provider value={{ bestScores, attempts, recordAttempt }}>
      {children}
    </QuizProgressContext.Provider>
  );
}

export function useQuizProgress() {
  const ctx = useContext(QuizProgressContext);
  if (!ctx) {
    throw new Error('useQuizProgress must be used within a QuizProgressProvider');
  }
  return ctx;
}
