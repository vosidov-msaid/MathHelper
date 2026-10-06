import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import type { Difficulty } from '@/data/quizzes';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  subject: string;
  difficulty: Difficulty;
  questionCount: number;
  bestScore?: { score: number; total: number };
  onPress: () => void;
};

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  Easy: Colors.accent,
  Medium: Colors.highlight,
  Hard: Colors.danger,
};

export function QuizCard({ icon, title, subject, difficulty, questionCount, bestScore, onPress }: Props) {
  return (
    <Pressable style={[styles.card, CardShadow]} onPress={onPress}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={22} color={Colors.primary} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subject}>
          {subject} · {questionCount} questions
        </Text>
        {bestScore ? (
          <Text style={styles.bestScore}>
            Best: {bestScore.score}/{bestScore.total}
          </Text>
        ) : null}
      </View>
      <View style={[styles.difficultyTag, { backgroundColor: `${DIFFICULTY_COLOR[difficulty]}1A` }]}>
        <Text style={[styles.difficultyText, { color: DIFFICULTY_COLOR[difficulty] }]}>{difficulty}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: FontSize.cardTitle,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  subject: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  bestScore: {
    fontSize: FontSize.caption,
    color: Colors.accent,
    fontWeight: '600',
    marginTop: 2,
  },
  difficultyTag: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  difficultyText: {
    fontSize: FontSize.caption,
    fontWeight: '700',
  },
});
