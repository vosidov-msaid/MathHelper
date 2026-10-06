import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'math-homework-helper/quiz-best-scores';

type BestScore = {
  score: number;
  total: number;
};

type QuizProgressContextValue = {
  bestScores: Record<string, BestScore>;
  recordAttempt: (quizId: string, score: number, total: number) => void;
};

const QuizProgressContext = createContext<QuizProgressContextValue | null>(null);

export function QuizProgressProvider({ children }: { children: ReactNode }) {
  const [bestScores, setBestScores] = useState<Record<string, BestScore>>({});

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setBestScores(JSON.parse(raw));
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
  }, []);

  return (
    <QuizProgressContext.Provider value={{ bestScores, recordAttempt }}>{children}</QuizProgressContext.Provider>
  );
}

export function useQuizProgress() {
  const ctx = useContext(QuizProgressContext);
  if (!ctx) {
    throw new Error('useQuizProgress must be used within a QuizProgressProvider');
  }
  return ctx;
}
