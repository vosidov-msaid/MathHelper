import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { MathResultCard } from '@/components/MathResultCard';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useSavedProblems } from '@/contexts/SavedProblemsContext';
import { QueuedScan, useScanQueue } from '@/contexts/ScanQueueContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { MathProblemResult } from '@/lib/openrouter';

const statusLabel = (scan: QueuedScan) => {
  switch (scan.status) {
    case 'queued':
      return 'Waiting for connection…';
    case 'retrying':
      return 'Retrying…';
    case 'failed':
      return scan.lastError ?? 'Scan failed';
    case 'solved':
      return 'Ready to review';
  }
};

export function ScanQueueBanner() {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { queuedScans, removeFromQueue, retryNow } = useScanQueue();
  const { addSavedProblem } = useSavedProblems();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());

  if (queuedScans.length === 0) return null;

  const handleSave = async (scan: QueuedScan, index: number, problem: MathProblemResult) => {
    await addSavedProblem({
      imageUri: scan.imageUri,
      question: problem.question,
      subject: problem.subject,
      answer: problem.answer,
      steps: problem.steps,
    });
    setSavedKeys((prev) => new Set(prev).add(`${scan.id}-${index}`));
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionLabel}>Pending Scans</Text>
      {queuedScans.map((scan) => {
        const isExpanded = expandedId === scan.id;
        return (
          <View key={scan.id} style={[styles.card, cardShadow]}>
            <Pressable
              style={styles.row}
              onPress={() => {
                if (scan.status === 'solved') setExpandedId(isExpanded ? null : scan.id);
              }}>
              <Image source={{ uri: scan.imageUri }} style={styles.thumbnail} />
              <View style={styles.textBlock}>
                <Text style={styles.statusText} numberOfLines={2}>
                  {statusLabel(scan)}
                </Text>
              </View>
              {scan.status === 'retrying' ? <ActivityIndicator size="small" color={colors.primary} /> : null}
              {scan.status === 'queued' || scan.status === 'failed' ? (
                <Pressable style={styles.iconButton} onPress={() => retryNow(scan.id)} hitSlop={8}>
                  <Ionicons name="refresh" size={16} color={colors.primary} />
                </Pressable>
              ) : null}
              <Pressable style={styles.iconButton} onPress={() => removeFromQueue(scan.id)} hitSlop={8}>
                <Ionicons name="trash-outline" size={16} color={colors.textSecondary} />
              </Pressable>
            </Pressable>

            {isExpanded && scan.results ? (
              <View style={styles.resultsWrap}>
                {scan.results.map((problem, index) => (
                  <MathResultCard
                    key={index}
                    question={problem.question}
                    subject={problem.subject}
                    answer={problem.answer}
                    steps={problem.steps}
                    saved={savedKeys.has(`${scan.id}-${index}`)}
                    onSave={() => handleSave(scan, index, problem)}
                  />
                ))}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    wrap: {
      marginBottom: Spacing.lg,
    },
    sectionLabel: {
      fontSize: FontSize.sectionHeader,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: Spacing.sm,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.sm,
      marginBottom: Spacing.sm,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    thumbnail: {
      width: 40,
      height: 40,
      borderRadius: Radius.sm,
      backgroundColor: colors.background,
    },
    textBlock: {
      flex: 1,
    },
    statusText: {
      fontSize: FontSize.body,
      color: colors.textPrimary,
    },
    iconButton: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    resultsWrap: {
      marginTop: Spacing.sm,
    },
  });
