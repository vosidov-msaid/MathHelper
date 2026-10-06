import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';
import { FontSize, Spacing } from '@/constants/layout';

type Props =
  | {
      type: 'switch';
      label: string;
      value: boolean;
      onValueChange: (value: boolean) => void;
    }
  | {
      type: 'chevron';
      label: string;
    };

export function SettingsRow(props: Props) {
  if (props.type === 'switch') {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{props.label}</Text>
        <Switch
          value={props.value}
          onValueChange={props.onValueChange}
          trackColor={{ true: Colors.primary, false: Colors.border }}
        />
      </View>
    );
  }

  return (
    <Pressable style={styles.row}>
      <Text style={styles.label}>{props.label}</Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  label: {
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
});
