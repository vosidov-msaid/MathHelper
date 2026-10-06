import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useMemo } from 'react';
import { Alert, Image, Pressable, Share, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/BackHeader';
import { MathResultCard } from '@/components/MathResultCard';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { SavedProblem, useSavedProblems } from '@/contexts/SavedProblemsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatRelativeTime } from '@/lib/time';

const buildSolutionText = (problem: SavedProblem) => {
  const steps = problem.steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
  return `${problem.question}\n\nSubject: ${problem.subject}\nAnswer: ${problem.answer}\n\nSteps:\n${steps}`;
};

const writeShareableImage = (problem: SavedProblem) => {
  const match = problem.imageUri.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  const [, mimeType, base64] = match;
  const extension = mimeType.split('/')[1] ?? 'jpg';
  const file = new File(Paths.cache, `shared-problem-${problem.id}.${extension}`);
  if (file.exists) file.delete();
  file.create();
  file.write(base64, { encoding: 'base64' });
  return { uri: file.uri, mimeType };
};

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
    Alert.alert('Remove this problem?', 'This will delete it from Saved. This can\'t be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          removeSavedProblem(problem.id);
          router.back();
        },
      },
    ]);
  };

  const handleShareSolution = async () => {
    await Share.share({ message: buildSolutionText(problem) });
  };

  const handleShareImage = async () => {
    const available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert('Sharing unavailable', 'Sharing isn\'t supported on this device.');
      return;
    }
    const shareable = writeShareableImage(problem);
    if (!shareable) {
      Alert.alert('Couldn\'t share image', 'This problem\'s image could not be prepared for sharing.');
      return;
    }
    await Sharing.shareAsync(shareable.uri, { mimeType: shareable.mimeType, dialogTitle: 'Share Problem Image' });
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

        <View style={styles.shareRow}>
          <Pressable style={styles.shareButton} onPress={handleShareSolution}>
            <Ionicons name="document-text-outline" size={18} color={colors.primary} />
            <Text style={styles.shareButtonText}>Share Solution</Text>
          </Pressable>
          <Pressable style={styles.shareButton} onPress={handleShareImage}>
            <Ionicons name="image-outline" size={18} color={colors.primary} />
            <Text style={styles.shareButtonText}>Share Image</Text>
          </Pressable>
        </View>

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
    shareRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginTop: Spacing.md,
    },
    shareButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.xs,
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      paddingVertical: Spacing.md,
      minHeight: 48,
    },
    shareButtonText: {
      fontSize: FontSize.body,
      fontWeight: '600',
      color: colors.primary,
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
