import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { MathResultCard } from '@/components/MathResultCard';
import { Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import type { SavedProblem } from '@/contexts/SavedProblemsContext';
import { formatRelativeTime } from '@/lib/time';

type Props = {
  problem: SavedProblem;
  onDelete: () => void;
};

export function SavedProblemCard({ problem, onDelete }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageRow}>
        <Image source={{ uri: problem.imageUri }} style={styles.thumbnail} />
        <View style={styles.meta}>
          <Text style={styles.savedAt}>Saved {formatRelativeTime(problem.savedAt)}</Text>
          <Pressable style={styles.deleteButton} onPress={onDelete} hitSlop={8}>
            <Ionicons name="trash-outline" size={14} color={Colors.danger} />
            <Text style={styles.deleteText}>Remove</Text>
          </Pressable>
        </View>
      </View>

      <MathResultCard
        question={problem.question}
        subject={problem.subject}
        answer={problem.answer}
        steps={problem.steps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: Radius.sm,
    backgroundColor: Colors.background,
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  savedAt: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  deleteText: {
    fontSize: FontSize.caption,
    color: Colors.danger,
    fontWeight: '600',
  },
});
