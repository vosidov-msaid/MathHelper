import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { TopicCard } from '@/components/TopicCard';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useLearnProgress } from '@/contexts/LearnProgressContext';
import { useTheme } from '@/contexts/ThemeContext';
import { levels } from '@/data/courses';

export default function LearnScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { reviewedLessonIds } = useLearnProgress();
  const [activeLevel, setActiveLevel] = useState('All');
  const [query, setQuery] = useState('');

  const levelFilters = useMemo(() => ['All', ...levels.map((level) => level.title)], []);

  const filteredLevels = useMemo(() => {
    const q = query.trim().toLowerCase();
    return levels
      .filter((level) => activeLevel === 'All' || level.title === activeLevel)
      .map((level) => ({
        ...level,
        courses: level.courses.filter(
          (course) => !q || course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q),
        ),
      }))
      .filter((level) => level.courses.length > 0);
  }, [activeLevel, query]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Learn" subtitle="Browse courses from elementary through college" />

        <SearchBar value={query} onChangeText={setQuery} placeholder="Search courses" />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {levelFilters.map((filter) => {
            const active = filter === activeLevel;
            return (
              <Pressable
                key={filter}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setActiveLevel(filter)}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{filter}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {filteredLevels.length === 0 ? (
          <Text style={styles.emptyText}>No courses match your search.</Text>
        ) : (
          filteredLevels.map((level) => (
            <View key={level.id}>
              <Text style={styles.levelLabel}>{level.title}</Text>
              {level.courses.map((course) => {
                const reviewedCount = course.lessons.filter((lesson) => reviewedLessonIds.has(lesson.id)).length;
                const progressPct = Math.round((reviewedCount / course.lessons.length) * 100);
                return (
                  <TopicCard
                    key={course.id}
                    icon={course.icon}
                    title={course.title}
                    description={course.description}
                    progressPct={progressPct}
                    lessonCount={course.lessons.length}
                    onPress={() => router.push({ pathname: '/learn/[courseId]', params: { courseId: course.id } })}
                  />
                );
              })}
            </View>
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
    levelLabel: {
      fontSize: FontSize.sectionHeader,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: Spacing.sm,
      marginTop: Spacing.sm,
    },
    filterRow: {
      marginBottom: Spacing.md,
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
    emptyText: {
      fontSize: FontSize.body,
      color: colors.textSecondary,
    },
  });
