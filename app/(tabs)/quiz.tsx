import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SectionHeader } from '@/components/SectionHeader';
import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { question } from '@/data/quiz';

export default function QuizScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const progressPct = (question.questionNumber / question.totalQuestions) * 100;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader
          title="Quiz"
          subtitle={`Question ${question.questionNumber} of ${question.totalQuestions}`}
        />

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>

        <View style={[styles.questionCard, CardShadow]}>
          <Text style={styles.questionText}>{question.prompt}</Text>
        </View>

        {question.options.map((option) => {
          const selected = option.id === selectedId;
          return (
            <Pressable
              key={option.id}
              style={[styles.optionRow, selected && styles.optionRowSelected]}
              onPress={() => setSelectedId(option.id)}>
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}

        <Pressable style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next Question</Text>
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
  nextButtonText: {
    color: Colors.surface,
    fontSize: FontSize.body,
    fontWeight: '700',
  },
});
