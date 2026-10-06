import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/BackHeader';
import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useQuizProgress } from '@/contexts/QuizProgressContext';
import { findQuiz } from '@/data/quizzes';

export default function QuizPlayScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const { recordAttempt } = useQuizProgress();
  const quiz = findQuiz(quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [phase, setPhase] = useState<'playing' | 'results'>('playing');

  if (!quiz) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <BackHeader title="Quiz not found" />
        </View>
      </SafeAreaView>
    );
  }

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswers([]);
    setPhase('playing');
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    const nextAnswers = [...answers, selectedIndex];

    if (currentIndex === quiz.questions.length - 1) {
      const score = nextAnswers.filter((answer, i) => answer === quiz.questions[i].correctIndex).length;
      recordAttempt(quiz.id, score, quiz.questions.length);
      setAnswers(nextAnswers);
      setPhase('results');
    } else {
      setAnswers(nextAnswers);
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
    }
  };

  if (phase === 'results') {
    const score = answers.filter((answer, i) => answer === quiz.questions[i].correctIndex).length;
    const total = quiz.questions.length;
    const pct = Math.round((score / total) * 100);

    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          <BackHeader title="Results" subtitle={quiz.title} />

          <View style={[styles.scoreCard, CardShadow]}>
            <Text style={styles.scoreValue}>
              {score}/{total}
            </Text>
            <Text style={styles.scorePct}>{pct}% correct</Text>
          </View>

          <Text style={styles.sectionLabel}>Review Answers</Text>
          {quiz.questions.map((question, qIndex) => {
            const userAnswer = answers[qIndex];
            const isCorrect = userAnswer === question.correctIndex;
            return (
              <View key={question.id} style={[styles.reviewCard, CardShadow]}>
                <View style={styles.reviewHeader}>
                  <Ionicons
                    name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                    size={18}
                    color={isCorrect ? Colors.accent : Colors.danger}
                  />
                  <Text style={styles.reviewPrompt}>{question.prompt}</Text>
                </View>

                {question.options.map((option, oIndex) => {
                  const isUserChoice = oIndex === userAnswer;
                  const isCorrectChoice = oIndex === question.correctIndex;
                  return (
                    <View
                      key={oIndex}
                      style={[
                        styles.reviewOption,
                        isCorrectChoice && styles.reviewOptionCorrect,
                        isUserChoice && !isCorrectChoice && styles.reviewOptionWrong,
                      ]}>
                      <Text
                        style={[
                          styles.reviewOptionText,
                          (isCorrectChoice || isUserChoice) && styles.reviewOptionTextEmphasis,
                        ]}>
                        {option}
                      </Text>
                      {isCorrectChoice ? <Ionicons name="checkmark" size={16} color={Colors.accent} /> : null}
                      {isUserChoice && !isCorrectChoice ? (
                        <Ionicons name="close" size={16} color={Colors.danger} />
                      ) : null}
                    </View>
                  );
                })}

                <Text style={styles.explanation}>{question.explanation}</Text>
              </View>
            );
          })}

          <Pressable style={styles.retakeButton} onPress={resetQuiz}>
            <Ionicons name="refresh" size={18} color={Colors.surface} />
            <Text style={styles.retakeButtonText}>Retake Quiz</Text>
          </Pressable>
          <Pressable style={styles.backToListButton} onPress={() => router.back()}>
            <Text style={styles.backToListButtonText}>Back to Quizzes</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const question = quiz.questions[currentIndex];
  const progressPct = ((currentIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackHeader title={quiz.title} subtitle={`Question ${currentIndex + 1} of ${quiz.questions.length}`} />

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>

        <View style={[styles.questionCard, CardShadow]}>
          <Text style={styles.questionText}>{question.prompt}</Text>
        </View>

        {question.options.map((option, index) => {
          const selected = index === selectedIndex;
          return (
            <Pressable
              key={index}
              style={[styles.optionRow, selected && styles.optionRowSelected]}
              onPress={() => setSelectedIndex(index)}>
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{option}</Text>
            </Pressable>
          );
        })}

        <Pressable
          style={[styles.nextButton, selectedIndex === null && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={selectedIndex === null}>
          <Text style={styles.nextButtonText}>{isLastQuestion ? 'See Results' : 'Next Question'}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl * 2,
  },
  progressTrack: {
    height: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.border,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  progressFill: {
    height: '100%',
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
  },
  questionCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  questionText: {
    fontSize: FontSize.sectionHeader,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  optionRow: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    minHeight: 48,
    justifyContent: 'center',
  },
  optionRowSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  },
  optionText: {
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  nextButton: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: Colors.surface,
    fontSize: FontSize.body,
    fontWeight: '700',
  },
  scoreCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: 4,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.primary,
  },
  scorePct: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  sectionLabel: {
    fontSize: FontSize.sectionHeader,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  reviewPrompt: {
    flex: 1,
    fontSize: FontSize.cardTitle,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  reviewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    marginBottom: 4,
  },
  reviewOptionCorrect: {
    borderColor: Colors.accent,
    backgroundColor: `${Colors.accent}14`,
  },
  reviewOptionWrong: {
    borderColor: Colors.danger,
    backgroundColor: '#FEE2E2',
  },
  reviewOptionText: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  reviewOptionTextEmphasis: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  explanation: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginTop: Spacing.xs,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    minHeight: 48,
    marginTop: Spacing.md,
  },
  retakeButtonText: {
    color: Colors.surface,
    fontSize: FontSize.body,
    fontWeight: '700',
  },
  backToListButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  backToListButtonText: {
    color: Colors.primary,
    fontSize: FontSize.body,
    fontWeight: '600',
  },
});
