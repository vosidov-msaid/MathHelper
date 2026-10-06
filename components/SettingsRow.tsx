import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import type { ColorScheme } from '@/constants/colors';
import { FontSize, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

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
      value?: string;
      onPress?: () => void;
    };

export function SettingsRow(props: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (props.type === 'switch') {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{props.label}</Text>
        <Switch
          value={props.value}
          onValueChange={props.onValueChange}
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </View>
    );
  }

  return (
    <Pressable style={styles.row} onPress={props.onPress}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.trailing}>
        {props.value ? <Text style={styles.value}>{props.value}</Text> : null}
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      </View>
    </Pressable>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
    },
    label: {
      fontSize: FontSize.body,
      color: colors.textPrimary,
    },
    trailing: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },
    value: {
      fontSize: FontSize.body,
      color: colors.textSecondary,
    },
  });
