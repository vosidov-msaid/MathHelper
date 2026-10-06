import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { MathResultCard } from '@/components/MathResultCard';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useSavedProblems } from '@/contexts/SavedProblemsContext';
import { useScanQueue } from '@/contexts/ScanQueueContext';
import { useTheme } from '@/contexts/ThemeContext';
import { analyzeMathImage, analyzeMathText, MathProblemResult, OpenRouterError } from '@/lib/openrouter';
import { useConfirmSound } from '@/lib/sounds';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'queued';
type Mode = 'photo' | 'type';

export function PhotoUploadCard() {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { addSavedProblem } = useSavedProblems();
  const { enqueuePhotoScan, enqueueTextScan } = useScanQueue();
  const playConfirm = useConfirmSound();
  const [mode, setMode] = useState<Mode>('photo');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [note, setNote] = useState('');
  const [typedProblem, setTypedProblem] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [results, setResults] = useState<MathProblemResult[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedIndices, setSavedIndices] = useState<Set<number>>(new Set());

  const resetRunState = () => {
    setStatus('idle');
    setResults([]);
    setErrorMessage(null);
    setSavedIndices(new Set());
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    resetRunState();
  };

  const onImagePicked = (asset: ImagePicker.ImagePickerAsset) => {
    setImageUri(asset.uri);
    setImageBase64(asset.base64 ?? null);
    setMimeType(asset.mimeType ?? 'image/jpeg');
    setNote('');
    resetRunState();
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
    setNote('');
    resetRunState();
  };

  const runSolve = async (solve: () => Promise<MathProblemResult[]>, enqueue: () => Promise<void>) => {
    setStatus('loading');
    setErrorMessage(null);
    setSavedIndices(new Set());
    try {
      const problems = await solve();
      setResults(problems);
      setStatus('success');
    } catch (error) {
      if (error instanceof OpenRouterError) {
        setErrorMessage(error.message);
        setStatus('error');
        return;
      }
      // Not an OpenRouterError means fetch itself failed (no connectivity) —
      // queue it for automatic retry instead of leaving a dead-end error.
      await enqueue();
      setStatus('queued');
    }
  };

  const scanProblem = () => {
    if (!imageBase64) return;
    const trimmedNote = note.trim() || undefined;
    return runSolve(
      () => analyzeMathImage(imageBase64, mimeType, trimmedNote),
      () =>
        enqueuePhotoScan(
          imageBase64,
          mimeType,
          imageUri ?? `data:${mimeType};base64,${imageBase64}`,
          trimmedNote,
        ),
    );
  };

  const solveTyped = () => {
    const trimmed = typedProblem.trim();
    if (!trimmed) return;
    return runSolve(
      () => analyzeMathText(trimmed),
      () => enqueueTextScan(trimmed),
    );
  };

  const handleRetry = () => (mode === 'photo' ? scanProblem() : solveTyped());

  const saveProblem = async (index: number, problem: MathProblemResult) => {
    await addSavedProblem({
      imageUri: mode === 'photo' && imageBase64 ? `data:${mimeType};base64,${imageBase64}` : undefined,
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
      <Text style={styles.title}>Solve a Problem</Text>
      <Text style={styles.subtitle}>
        {mode === 'photo' ? 'Take a photo or upload one from your library' : 'Type or paste an equation or word problem'}
      </Text>

      <View style={styles.modeRow}>
        <Pressable
          style={[styles.modeButton, mode === 'photo' && styles.modeButtonActive]}
          onPress={() => switchMode('photo')}>
          <Ionicons name="camera-outline" size={16} color={mode === 'photo' ? colors.surface : colors.textSecondary} />
          <Text style={[styles.modeButtonText, mode === 'photo' && styles.modeButtonTextActive]}>Photo</Text>
        </Pressable>
        <Pressable
          style={[styles.modeButton, mode === 'type' && styles.modeButtonActive]}
          onPress={() => switchMode('type')}>
          <Ionicons name="create-outline" size={16} color={mode === 'type' ? colors.surface : colors.textSecondary} />
          <Text style={[styles.modeButtonText, mode === 'type' && styles.modeButtonTextActive]}>Type</Text>
        </Pressable>
      </View>

      {mode === 'photo' ? (
        <>
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
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="Explain the problem (optional) — e.g. 'stuck on step 2'"
              placeholderTextColor={colors.textSecondary}
              multiline
            />
          ) : null}

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
        </>
      ) : (
        <>
          <TextInput
            style={styles.typedInput}
            value={typedProblem}
            onChangeText={setTypedProblem}
            placeholder="e.g. 2x + 5 = 15"
            placeholderTextColor={colors.textSecondary}
            multiline
          />

          <Pressable
            style={[
              styles.scanButton,
              (status === 'loading' || !typedProblem.trim()) && styles.scanButtonDisabled,
            ]}
            onPress={solveTyped}
            disabled={status === 'loading' || !typedProblem.trim()}>
            {status === 'loading' ? (
              <ActivityIndicator color={colors.surface} />
            ) : (
              <>
                <Ionicons name="sparkles" size={18} color={colors.surface} />
                <Text style={styles.scanButtonText}>Solve Problem</Text>
              </>
            )}
          </Pressable>
        </>
      )}

      {status === 'error' && errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <Pressable style={styles.retryButton} onPress={handleRetry}>
            <Ionicons name="refresh" size={16} color={colors.danger} />
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : null}

      {status === 'queued' ? (
        <View style={styles.queuedBox}>
          <Ionicons name="cloud-offline-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.queuedText}>
            You&apos;re offline — this scan has been queued and will retry automatically when you&apos;re back online.
          </Text>
        </View>
      ) : null}

      {status === 'success' && results.length === 0 ? (
        <Text style={styles.emptyText}>
          {mode === 'photo'
            ? 'No math problem was found in that photo. Try another one.'
            : 'No math problem was found in that text. Try rephrasing it.'}
        </Text>
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
    modeRow: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      borderRadius: Radius.full,
      padding: 2,
      gap: 2,
      alignSelf: 'flex-start',
      marginBottom: Spacing.xs,
    },
    modeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 6,
      paddingHorizontal: Spacing.sm,
      borderRadius: Radius.full,
    },
    modeButtonActive: {
      backgroundColor: colors.primary,
    },
    modeButtonText: {
      fontSize: FontSize.caption,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    modeButtonTextActive: {
      color: colors.surface,
    },
    noteInput: {
      minHeight: 44,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: Radius.sm,
      padding: Spacing.sm,
      fontSize: FontSize.body,
      color: colors.textPrimary,
      textAlignVertical: 'top',
    },
    typedInput: {
      minHeight: 80,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: Radius.sm,
      padding: Spacing.sm,
      fontSize: FontSize.body,
      color: colors.textPrimary,
      textAlignVertical: 'top',
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
      gap: Spacing.xs,
    },
    errorText: {
      fontSize: FontSize.caption,
      color: colors.danger,
    },
    retryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: Spacing.xs,
    },
    retryButtonText: {
      fontSize: FontSize.caption,
      fontWeight: '700',
      color: colors.danger,
    },
    queuedBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      backgroundColor: colors.background,
      borderRadius: Radius.sm,
      padding: Spacing.sm,
    },
    queuedText: {
      flex: 1,
      fontSize: FontSize.caption,
      color: colors.textSecondary,
    },
    emptyText: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
    },
  });
