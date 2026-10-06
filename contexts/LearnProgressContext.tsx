import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'math-homework-helper/reviewed-lessons';

type LearnProgressContextValue = {
  reviewedLessonIds: Set<string>;
  isLessonReviewed: (lessonId: string) => boolean;
  toggleLessonReviewed: (lessonId: string) => void;
};

const LearnProgressContext = createContext<LearnProgressContextValue | null>(null);

export function LearnProgressProvider({ children }: { children: ReactNode }) {
  const [reviewedLessonIds, setReviewedLessonIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setReviewedLessonIds(new Set(JSON.parse(raw)));
      })
      .catch(() => {});
  }, []);

  const toggleLessonReviewed = useCallback((lessonId: string) => {
    setReviewedLessonIds((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next))).catch(() => {});
      return next;
    });
  }, []);

  const isLessonReviewed = useCallback((lessonId: string) => reviewedLessonIds.has(lessonId), [reviewedLessonIds]);

  return (
    <LearnProgressContext.Provider value={{ reviewedLessonIds, isLessonReviewed, toggleLessonReviewed }}>
      {children}
    </LearnProgressContext.Provider>
  );
}

export function useLearnProgress() {
  const ctx = useContext(LearnProgressContext);
  if (!ctx) {
    throw new Error('useLearnProgress must be used within a LearnProgressProvider');
  }
  return ctx;
}
