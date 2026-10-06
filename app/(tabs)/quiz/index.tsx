import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QuizCard } from '@/components/QuizCard';
import { SectionHeader } from '@/components/SectionHeader';
import { Colors } from '@/constants/colors';
import { FontSize, Spacing } from '@/constants/layout';
import { useQuizProgress } from '@/contexts/QuizProgressContext';
import { Difficulty, quizzes } from '@/data/quizzes';

const DIFFICULTY_ORDER: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export default function QuizListScreen() {
  const { bestScores } = useQuizProgress();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Quiz" subtitle="Short quizzes to practice what you've learned" />

        {DIFFICULTY_ORDER.map((difficulty) => {
          const group = quizzes.filter((quiz) => quiz.difficulty === difficulty);
          if (group.length === 0) return null;
          return (
            <View key={difficulty}>
              <Text style={styles.groupLabel}>{difficulty}</Text>
              {group.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  icon={quiz.icon}
                  title={quiz.title}
                  subject={quiz.subject}
                  difficulty={quiz.difficulty}
                  questionCount={quiz.questions.length}
                  bestScore={bestScores[quiz.id]}
                  onPress={() => router.push({ pathname: '/quiz/[quizId]', params: { quizId: quiz.id } })}
                />
              ))}
            </View>
          );
        })}
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
  groupLabel: {
    fontSize: FontSize.sectionHeader,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
