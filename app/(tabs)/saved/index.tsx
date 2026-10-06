import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProblemListItem } from '@/components/ProblemListItem';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useSavedProblems } from '@/contexts/SavedProblemsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatRelativeTime } from '@/lib/time';

export default function SavedScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { savedProblems } = useSavedProblems();
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filters = useMemo(() => {
    const subjects = Array.from(new Set(savedProblems.map((problem) => problem.subject)));
    return ['All', ...subjects];
  }, [savedProblems]);

  const filteredProblems = savedProblems
    .filter((problem) => activeFilter === 'All' || problem.subject === activeFilter)
    .filter((problem) => problem.question.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Saved Problems" subtitle="Your bookmarked solutions" />

        {savedProblems.length === 0 ? (
          <Text style={styles.emptyText}>
            Nothing saved yet. Scan a problem on the Dashboard and tap Save to add it here.
          </Text>
        ) : (
          <>
            <SearchBar value={query} onChangeText={setQuery} placeholder="Search saved problems" />

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

            {filteredProblems.length === 0 ? (
              <Text style={styles.emptyText}>No saved problems match your search.</Text>
            ) : (
              filteredProblems.map((problem) => (
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
          </>
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
    emptyText: {
      fontSize: FontSize.body,
      color: colors.textSecondary,
    },
    filterRow: {
      marginBottom: Spacing.lg,
    },
    chip: {
      borderRadius: Radius.full,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: Spacing.sm,
    },
    chipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    chipText: {
      fontSize: FontSize.body,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    chipTextActive: {
      color: colors.surface,
    },
  });
