import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProblemListItem } from '@/components/ProblemListItem';
import { SectionHeader } from '@/components/SectionHeader';
import { Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { filters, savedProblems } from '@/data/saved';

export default function SavedScreen() {
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Saved Problems" subtitle="Your bookmarked solutions" />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {filters.map((filter) => {
            const active = filter === activeFilter;
            return (
              <Pressable
                key={filter}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setActiveFilter(filter)}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{filter}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {savedProblems.map((problem) => (
          <ProblemListItem
            key={problem.id}
            snippet={problem.snippet}
            subject={problem.subject}
            timeAgo={problem.savedAgo}
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
  filterRow: {
    marginBottom: Spacing.lg,
  },
  chip: {
    borderRadius: Radius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: Colors.surface,
  },
});
