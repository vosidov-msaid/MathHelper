import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/BackHeader';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useLearnProgress } from '@/contexts/LearnProgressContext';
import { useTheme } from '@/contexts/ThemeContext';
import { findCourse } from '@/data/courses';

export default function CourseDetailScreen() {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const { reviewedLessonIds } = useLearnProgress();
  const course = findCourse(courseId);

  if (!course) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <BackHeader title="Course not found" />
        </View>
      </SafeAreaView>
    );
  }

  const reviewedCount = course.lessons.filter((lesson) => reviewedLessonIds.has(lesson.id)).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackHeader title={course.title} subtitle={course.description} />

        <Text style={styles.progressLabel}>
          {reviewedCount} of {course.lessons.length} lessons reviewed
        </Text>

        {course.lessons.map((lesson, index) => {
          const reviewed = reviewedLessonIds.has(lesson.id);
          return (
            <Pressable
              key={lesson.id}
              style={[styles.lessonCard, cardShadow]}
              onPress={() => router.push({ pathname: '/learn/lesson/[lessonId]', params: { lessonId: lesson.id } })}>
              <View style={styles.lessonNumber}>
                <Text style={styles.lessonNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.lessonBody}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonSummary}>{lesson.summary}</Text>
              </View>
              <Ionicons
                name={reviewed ? 'checkmark-circle' : 'chevron-forward'}
                size={reviewed ? 22 : 18}
                color={reviewed ? colors.accent : colors.textSecondary}
              />
            </Pressable>
          );
        })}
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
    progressLabel: {
      fontSize: FontSize.body,
      color: colors.textSecondary,
      marginBottom: Spacing.md,
    },
    lessonCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      gap: Spacing.md,
    },
    lessonNumber: {
      width: 28,
      height: 28,
      borderRadius: Radius.full,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    lessonNumberText: {
      fontSize: FontSize.caption,
      fontWeight: '700',
      color: colors.primary,
    },
    lessonBody: {
      flex: 1,
      gap: 2,
    },
    lessonTitle: {
      fontSize: FontSize.cardTitle,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    lessonSummary: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
    },
  });
