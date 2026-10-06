import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SectionHeader } from '@/components/SectionHeader';
import { TopicCard } from '@/components/TopicCard';
import { Colors } from '@/constants/colors';
import { FontSize, Spacing } from '@/constants/layout';
import { useLearnProgress } from '@/contexts/LearnProgressContext';
import { levels } from '@/data/courses';

export default function LearnScreen() {
  const { reviewedLessonIds } = useLearnProgress();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Learn" subtitle="Browse courses from elementary through college" />

        {levels.map((level) => (
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
  levelLabel: {
    fontSize: FontSize.sectionHeader,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
