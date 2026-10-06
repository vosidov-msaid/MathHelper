import { StyleSheet, Text, View } from 'react-native';

import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';

type Props = {
  question: string;
  subject: string;
  answer: string;
  steps: string[];
};

export function MathResultCard({ question, subject, answer, steps }: Props) {
  return (
    <View style={[styles.card, CardShadow]}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{subject}</Text>
      </View>
      <Text style={styles.question}>{question}</Text>

      <View style={styles.answerBlock}>
        <Text style={styles.answerLabel}>Answer</Text>
        <Text style={styles.answerValue}>{answer}</Text>
      </View>

      <Text style={styles.breakdownLabel}>Step-by-step breakdown</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.background,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: FontSize.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  question: {
    fontSize: FontSize.cardTitle,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  answerBlock: {
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    gap: 2,
  },
  answerLabel: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  answerValue: {
    fontSize: FontSize.sectionHeader,
    color: Colors.accent,
    fontWeight: '700',
  },
  breakdownLabel: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  stepRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: FontSize.caption,
    color: Colors.surface,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
});
