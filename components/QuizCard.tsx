import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';
import type { Difficulty } from '@/data/quizzes';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  subject: string;
  difficulty: Difficulty;
  questionCount: number;
  bestScore?: { score: number; total: number };
  attemptCount?: number;
  onPress: () => void;
};

const getDifficultyColor = (colors: ColorScheme): Record<Difficulty, string> => ({
  Easy: colors.accent,
  Medium: colors.highlight,
  Hard: colors.danger,
});

export function QuizCard({
  icon,
  title,
  subject,
  difficulty,
  questionCount,
  bestScore,
  attemptCount,
  onPress,
}: Props) {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const DIFFICULTY_COLOR = getDifficultyColor(colors);

  return (
    <Pressable style={[styles.card, cardShadow]} onPress={onPress}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subject}>
          {subject} · {questionCount} questions
        </Text>
        {bestScore ? (
          <Text style={styles.bestScore}>
            Best: {bestScore.score}/{bestScore.total}
            {attemptCount ? ` · ${attemptCount} attempt${attemptCount === 1 ? '' : 's'}` : ''}
          </Text>
        ) : null}
      </View>
      <View style={[styles.difficultyTag, { backgroundColor: `${DIFFICULTY_COLOR[difficulty]}1A` }]}>
        <Text style={[styles.difficultyText, { color: DIFFICULTY_COLOR[difficulty] }]}>{difficulty}</Text>
      </View>
    </Pressable>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      gap: Spacing.md,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: Radius.sm,
      backgroundColor: colors.background,
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
      color: colors.textPrimary,
    },
    subject: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
    },
    bestScore: {
      fontSize: FontSize.caption,
      color: colors.accent,
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
