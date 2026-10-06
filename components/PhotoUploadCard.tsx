import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { MathResultCard } from '@/components/MathResultCard';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useSavedProblems } from '@/contexts/SavedProblemsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { analyzeMathImage, MathProblemResult, OpenRouterError } from '@/lib/openrouter';
import { useConfirmSound } from '@/lib/sounds';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function PhotoUploadCard() {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { addSavedProblem } = useSavedProblems();
  const playConfirm = useConfirmSound();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [status, setStatus] = useState<Status>('idle');
  const [results, setResults] = useState<MathProblemResult[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedIndices, setSavedIndices] = useState<Set<number>>(new Set());

  const onImagePicked = (asset: ImagePicker.ImagePickerAsset) => {
    setImageUri(asset.uri);
    setImageBase64(asset.base64 ?? null);
    setMimeType(asset.mimeType ?? 'image/jpeg');
    setStatus('idle');
    setResults([]);
    setErrorMessage(null);
    setSavedIndices(new Set());
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera access needed', 'Enable camera access to take a photo of a problem.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7, base64: true });
    if (!result.canceled) {
      onImagePicked(result.assets[0]);
    }
  };

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Enable photo library access to upload a problem.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, base64: true });
    if (!result.canceled) {
      onImagePicked(result.assets[0]);
    }
  };

  const clearImage = () => {
    setImageUri(null);
    setImageBase64(null);
    setStatus('idle');
    setResults([]);
    setErrorMessage(null);
    setSavedIndices(new Set());
  };

  const scanProblem = async () => {
    if (!imageBase64) return;
    setStatus('loading');
    setErrorMessage(null);
    setSavedIndices(new Set());
    try {
      const problems = await analyzeMathImage(imageBase64, mimeType);
      setResults(problems);
      setStatus('success');
    } catch (error) {
      const message = error instanceof OpenRouterError ? error.message : 'Something went wrong while scanning.';
      setErrorMessage(message);
      setStatus('error');
    }
  };

  const saveProblem = async (index: number, problem: MathProblemResult) => {
    if (!imageBase64) return;
    await addSavedProblem({
      imageUri: `data:${mimeType};base64,${imageBase64}`,
      question: problem.question,
      subject: problem.subject,
      answer: problem.answer,
      steps: problem.steps,
    });
    setSavedIndices((prev) => new Set(prev).add(index));
    playConfirm();
  };

  return (
    <View style={[styles.card, cardShadow]}>
      <Text style={styles.title}>Upload a Problem</Text>
      <Text style={styles.subtitle}>Take a photo or upload one from your library</Text>

      {imageUri ? (
        <View style={styles.previewWrap}>
          <Image source={{ uri: imageUri }} style={styles.preview} />
          <Pressable style={styles.removeButton} onPress={clearImage}>
            <Ionicons name="close" size={16} color={colors.surface} />
          </Pressable>
        </View>
      ) : null}

      <View style={styles.buttonRow}>
        <Pressable style={styles.actionButton} onPress={takePhoto}>
          <Ionicons name="camera" size={20} color={colors.primary} />
          <Text style={styles.actionLabel}>Take Photo</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={pickPhoto}>
          <Ionicons name="image" size={20} color={colors.primary} />
          <Text style={styles.actionLabel}>Upload Photo</Text>
        </Pressable>
      </View>

      {imageUri ? (
        <Pressable
          style={[styles.scanButton, status === 'loading' && styles.scanButtonDisabled]}
          onPress={scanProblem}
          disabled={status === 'loading'}>
          {status === 'loading' ? (
            <ActivityIndicator color={colors.surface} />
          ) : (
            <>
              <Ionicons name="sparkles" size={18} color={colors.surface} />
              <Text style={styles.scanButtonText}>Scan Problem</Text>
            </>
          )}
        </Pressable>
      ) : null}

      {status === 'error' && errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {status === 'success' && results.length === 0 ? (
        <Text style={styles.emptyText}>No math problem was found in that photo. Try another one.</Text>
      ) : null}

      {status === 'success' &&
        results.map((problem, index) => (
          <MathResultCard
            key={index}
            question={problem.question}
            subject={problem.subject}
            answer={problem.answer}
            steps={problem.steps}
            saved={savedIndices.has(index)}
            onSave={() => saveProblem(index, problem)}
          />
        ))}
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.md,
      marginBottom: Spacing.lg,
      gap: Spacing.sm,
    },
    title: {
      fontSize: FontSize.cardTitle,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
      marginBottom: Spacing.xs,
    },
    previewWrap: {
      alignSelf: 'flex-start',
      position: 'relative',
      marginBottom: Spacing.xs,
    },
    preview: {
      width: 160,
      height: 160,
      borderRadius: Radius.md,
      backgroundColor: colors.background,
    },
    removeButton: {
      position: 'absolute',
      top: -8,
      right: -8,
      width: 24,
      height: 24,
      borderRadius: Radius.full,
      backgroundColor: colors.textPrimary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.xs,
      backgroundColor: colors.background,
      borderRadius: Radius.sm,
      paddingVertical: Spacing.sm,
      minHeight: 44,
    },
    actionLabel: {
      fontSize: FontSize.body,
      fontWeight: '600',
      color: colors.primary,
    },
    scanButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.xs,
      backgroundColor: colors.primary,
      borderRadius: Radius.sm,
      paddingVertical: Spacing.sm,
      minHeight: 44,
    },
    scanButtonDisabled: {
      opacity: 0.7,
    },
    scanButtonText: {
      fontSize: FontSize.body,
      fontWeight: '700',
      color: colors.surface,
    },
    errorBox: {
      backgroundColor: '#FEE2E2',
      borderRadius: Radius.sm,
      padding: Spacing.sm,
    },
    errorText: {
      fontSize: FontSize.caption,
      color: colors.danger,
    },
    emptyText: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
    },
  });
