import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/BackHeader';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

const TOPICS = [
  {
    title: 'Scanning a problem',
    body: 'On the Dashboard, tap "Take Photo" or "Upload Photo" under Upload a Problem, then tap "Scan Problem". The app sends your photo to an AI model that transcribes each problem, solves it, and gives a step-by-step breakdown.',
  },
  {
    title: 'Saving a solved problem',
    body: 'After a scan finishes, tap "Save" on any result to add it to your Saved tab. You can review it anytime, and remove it from the Saved screen when you no longer need it.',
  },
  {
    title: 'Learning a topic',
    body: 'The Learn tab has courses grouped by level, from Elementary through College. Open a course to see its lessons, and mark a lesson "Reviewed" once you\'ve gone through it — your progress is saved on your device.',
  },
  {
    title: 'Taking a quiz',
    body: 'The Quiz tab lists short quizzes by difficulty. After answering all questions, you\'ll see your score and a full review of each question with the correct answer and an explanation. Your best score per quiz is remembered.',
  },
  {
    title: 'Your data',
    body: 'There is no account or sign-in. Everything you save — scanned problems, lesson progress, quiz scores, and settings — stays on your device. See Privacy Policy for details.',
  },
];

export default function HelpScreen() {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackHeader title="Help & Support" subtitle="How to use Math Homework Helper" />

        {TOPICS.map((topic) => (
          <View key={topic.title} style={[styles.card, cardShadow]}>
            <Text style={styles.cardTitle}>{topic.title}</Text>
            <Text style={styles.cardBody}>{topic.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: Spacing.lg,
      paddingBottom: Spacing.xl * 2,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      gap: Spacing.xs,
    },
    cardTitle: {
      fontSize: FontSize.cardTitle,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    cardBody: {
      fontSize: FontSize.body,
      color: colors.textSecondary,
      lineHeight: 20,
    },
  });
