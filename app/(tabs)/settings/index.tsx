import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SectionHeader } from '@/components/SectionHeader';
import { SettingsRow } from '@/components/SettingsRow';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { appVersion, navRows, toggleRows } from '@/data/settings';
import { cancelDailyReminder, requestNotificationPermission, scheduleDailyReminder } from '@/lib/notifications';

const formatReminderTime = (hour: number, minute: number) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
};

export default function SettingsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { settings, setSetting } = useSettings();
  const [showTimePicker, setShowTimePicker] = useState(false);

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
        const scheduled = await scheduleDailyReminder(settings.reminderHour, settings.reminderMinute);
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

  const handleTimeChange = async (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShowTimePicker(false);
    if (event.type === 'dismissed' || !date) return;

    const hour = date.getHours();
    const minute = date.getMinutes();
    setSetting('reminderHour', hour);
    setSetting('reminderMinute', minute);
    if (settings.dailyReminder) {
      await scheduleDailyReminder(hour, minute);
    }
  };

  const reminderDate = useMemo(() => {
    const date = new Date();
    date.setHours(settings.reminderHour, settings.reminderMinute, 0, 0);
    return date;
  }, [settings.reminderHour, settings.reminderMinute]);

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
          {settings.dailyReminder ? (
            <SettingsRow
              type="chevron"
              label="Reminder Time"
              value={formatReminderTime(settings.reminderHour, settings.reminderMinute)}
              onPress={() => setShowTimePicker(true)}
            />
          ) : null}
        </View>

        {showTimePicker ? (
          <View style={styles.pickerWrap}>
            <DateTimePicker
              value={reminderDate}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
            {Platform.OS === 'ios' ? (
              <SettingsRow type="chevron" label="Done" onPress={() => setShowTimePicker(false)} />
            ) : null}
          </View>
        ) : null}

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
    pickerWrap: {
      borderRadius: Radius.md,
      overflow: 'hidden',
      marginBottom: Spacing.lg,
      backgroundColor: colors.surface,
    },
    version: {
      textAlign: 'center',
      fontSize: FontSize.caption,
      color: colors.textSecondary,
      marginTop: Spacing.sm,
    },
  });
