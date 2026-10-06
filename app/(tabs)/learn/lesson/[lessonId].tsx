import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/BackHeader';
import { StepList } from '@/components/StepList';
import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useLearnProgress } from '@/contexts/LearnProgressContext';
import { findLessonById } from '@/data/courses';

export default function LessonDetailScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { isLessonReviewed, toggleLessonReviewed } = useLearnProgress();
  const found = findLessonById(lessonId);

  if (!found) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <BackHeader title="Lesson not found" />
        </View>
      </SafeAreaView>
    );
  }

  const { course, lesson } = found;
  const reviewed = isLessonReviewed(lesson.id);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackHeader title={lesson.title} subtitle={course.title} />

        <Text style={styles.explanation}>{lesson.explanation}</Text>

        <Text style={styles.sectionLabel}>Key Points</Text>
        <View style={[styles.card, CardShadow]}>
          {lesson.keyPoints.map((point, index) => (
            <View key={index} style={styles.keyPointRow}>
              <Ionicons name="checkmark" size={16} color={Colors.accent} style={styles.keyPointIcon} />
              <Text style={styles.keyPointText}>{point}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Worked Example</Text>
        <View style={[styles.card, CardShadow]}>
          <Text style={styles.problemText}>{lesson.example.problem}</Text>
          <View style={styles.divider} />
          <StepList steps={lesson.example.solution} />
        </View>

        <Pressable
          style={[styles.reviewButton, reviewed && styles.reviewButtonActive]}
          onPress={() => toggleLessonReviewed(lesson.id)}>
          <Ionicons
            name={reviewed ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={20}
            color={reviewed ? Colors.surface : Colors.primary}
          />
          <Text style={[styles.reviewButtonText, reviewed && styles.reviewButtonTextActive]}>
            {reviewed ? 'Reviewed' : 'Mark as Reviewed'}
          </Text>
        </Pressable>
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
  explanation: {
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    fontSize: FontSize.sectionHeader,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  keyPointRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  keyPointIcon: {
    marginTop: 2,
  },
  keyPointText: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  problemText: {
    fontSize: FontSize.cardTitle,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  reviewButtonActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  reviewButtonText: {
    fontSize: FontSize.body,
    fontWeight: '700',
    color: Colors.primary,
  },
  reviewButtonTextActive: {
    color: Colors.surface,
  },
});
