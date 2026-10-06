import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/BackHeader';
import { MathResultCard } from '@/components/MathResultCard';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useSavedProblems } from '@/contexts/SavedProblemsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatRelativeTime } from '@/lib/time';

export default function SavedProblemDetailScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { problemId } = useLocalSearchParams<{ problemId: string }>();
  const { savedProblems, removeSavedProblem } = useSavedProblems();
  const problem = savedProblems.find((p) => p.id === problemId);

  if (!problem) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <BackHeader title="Problem not found" />
        </View>
      </SafeAreaView>
    );
  }

  const handleRemove = () => {
    removeSavedProblem(problem.id);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackHeader title="Saved Problem" subtitle={`Saved ${formatRelativeTime(problem.savedAt)}`} />

        <Image source={{ uri: problem.imageUri }} style={styles.image} resizeMode="contain" />

        <MathResultCard
          question={problem.question}
          subject={problem.subject}
          answer={problem.answer}
          steps={problem.steps}
        />

        <Pressable style={styles.removeButton} onPress={handleRemove}>
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
          <Text style={styles.removeButtonText}>Remove from Saved</Text>
        </Pressable>
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
    image: {
      width: '100%',
      height: 220,
      borderRadius: Radius.md,
      backgroundColor: colors.surface,
      marginBottom: Spacing.lg,
    },
    removeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.sm,
      borderWidth: 1,
      borderColor: colors.danger,
      borderRadius: Radius.md,
      paddingVertical: Spacing.md,
      minHeight: 48,
      marginTop: Spacing.md,
    },
    removeButtonText: {
      fontSize: FontSize.body,
      fontWeight: '700',
      color: colors.danger,
    },
  });
