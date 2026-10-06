import { StyleSheet, Text, View } from 'react-native';

import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';

type Props = {
  snippet: string;
  subject: string;
  timeAgo: string;
};

export function ProblemListItem({ snippet, subject, timeAgo }: Props) {
  return (
    <View style={[styles.card, CardShadow]}>
      <View style={styles.textBlock}>
        <Text style={styles.snippet} numberOfLines={1}>
          {snippet}
        </Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{subject}</Text>
        </View>
      </View>
      <Text style={styles.timeAgo}>{timeAgo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  textBlock: {
    flex: 1,
    gap: Spacing.xs,
    marginRight: Spacing.sm,
  },
  snippet: {
    fontSize: FontSize.cardTitle,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.background,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: FontSize.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
});
