import { router } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PhotoUploadCard } from '@/components/PhotoUploadCard';
import { ProblemListItem } from '@/components/ProblemListItem';
import { ScanQueueBanner } from '@/components/ScanQueueBanner';
import { SectionHeader } from '@/components/SectionHeader';
import { StatCard } from '@/components/StatCard';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Spacing } from '@/constants/layout';
import { useSavedProblems } from '@/contexts/SavedProblemsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatRelativeTime } from '@/lib/time';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { savedProblems } = useSavedProblems();

  const stats = useMemo(() => {
    const subjectCount = new Set(savedProblems.map((problem) => problem.subject)).size;
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const savedThisWeek = savedProblems.filter((problem) => problem.savedAt >= weekAgo).length;
    return [
      { id: 'saved', icon: 'bookmark' as const, value: String(savedProblems.length), label: 'Saved' },
      { id: 'subjects', icon: 'shapes' as const, value: String(subjectCount), label: 'Subjects' },
      { id: 'week', icon: 'calendar' as const, value: String(savedThisWeek), label: 'This Week' },
    ];
  }, [savedProblems]);

  const recentProblems = savedProblems.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title={getGreeting()} subtitle="Scan a problem to get started" />

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <StatCard key={stat.id} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </View>

        <PhotoUploadCard />

        <ScanQueueBanner />

        <Text style={styles.sectionLabel}>Recent Problems</Text>
        {recentProblems.length === 0 ? (
          <Text style={styles.emptyText}>Nothing scanned yet — your saved problems will show up here.</Text>
        ) : (
          recentProblems.map((problem) => (
            <ProblemListItem
              key={problem.id}
              imageUri={problem.imageUri}
              snippet={problem.question}
              subject={problem.subject}
              timeAgo={formatRelativeTime(problem.savedAt)}
              onPress={() =>
                router.push({ pathname: '/saved/[problemId]', params: { problemId: problem.id } })
              }
            />
          ))
        )}
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
    statsRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },
    sectionLabel: {
      fontSize: FontSize.sectionHeader,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: Spacing.sm,
    },
    emptyText: {
      fontSize: FontSize.body,
      color: colors.textSecondary,
    },
  });
