import { router } from 'expo-router';
import { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SectionHeader } from '@/components/SectionHeader';
import { SettingsRow } from '@/components/SettingsRow';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { appVersion, navRows, toggleRows } from '@/data/settings';
import { cancelDailyReminder, requestNotificationPermission, scheduleDailyReminder } from '@/lib/notifications';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { settings, setSetting } = useSettings();

  const handleToggle = async (id: (typeof toggleRows)[number]['id'], value: boolean) => {
    if (id === 'notifications') {
      if (value) {
        const granted = await requestNotificationPermission();
        if (!granted) {
          Alert.alert('Permission needed', 'Enable notifications for this app in your device settings first.');
          return;
        }
        setSetting('notifications', true);
      } else {
        setSetting('notifications', false);
        if (settings.dailyReminder) {
          setSetting('dailyReminder', false);
          await cancelDailyReminder();
        }
      }
      return;
    }

    if (id === 'dailyReminder') {
      if (value) {
        const scheduled = await scheduleDailyReminder();
        if (!scheduled) {
          Alert.alert('Permission needed', 'Enable notifications to turn on Daily Reminder.');
          return;
        }
        setSetting('notifications', true);
        setSetting('dailyReminder', true);
      } else {
        await cancelDailyReminder();
        setSetting('dailyReminder', false);
      }
      return;
    }

    setSetting(id, value);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Settings" />

        <View style={styles.group}>
          {toggleRows.map((row) => (
            <SettingsRow
              key={row.id}
              type="switch"
              label={row.label}
              value={settings[row.id]}
              onValueChange={(value) => handleToggle(row.id, value)}
            />
          ))}
        </View>

        <View style={styles.group}>
          {navRows.map((row) => (
            <SettingsRow
              key={row.id}
              type="chevron"
              label={row.label}
              onPress={() => router.push(row.route)}
            />
          ))}
        </View>

        <Text style={styles.version}>App Version {appVersion}</Text>
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
    group: {
      borderRadius: Radius.md,
      overflow: 'hidden',
      marginBottom: Spacing.lg,
    },
    version: {
      textAlign: 'center',
      fontSize: FontSize.caption,
      color: colors.textSecondary,
      marginTop: Spacing.sm,
    },
  });
