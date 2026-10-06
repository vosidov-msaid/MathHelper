import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PhotoUploadCard } from '@/components/PhotoUploadCard';
import { ProblemListItem } from '@/components/ProblemListItem';
import { SectionHeader } from '@/components/SectionHeader';
import { StatCard } from '@/components/StatCard';
import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { greetingName, quickActions, recentProblems, stats } from '@/data/dashboard';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title={`Good afternoon, ${greetingName}`} subtitle="Let's keep the streak going" />

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <StatCard key={stat.id} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </View>

        <PhotoUploadCard />

        <Text style={styles.sectionLabel}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          {quickActions.map((action) => (
            <Pressable key={action.id} style={[styles.actionCard, CardShadow]}>
              <Ionicons name={action.icon} size={22} color={Colors.primary} />
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Recent Problems</Text>
        {recentProblems.map((problem) => (
          <ProblemListItem
            key={problem.id}
            snippet={problem.snippet}
            subject={problem.subject}
            timeAgo={problem.timeAgo}
          />
        ))}
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
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    fontSize: FontSize.sectionHeader,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    gap: Spacing.xs,
    minHeight: 72,
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: FontSize.caption,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});
