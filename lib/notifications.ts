import * as Notifications from 'expo-notifications';
import { LogBox, Platform } from 'react-native';

// ponytail: this app only schedules local notifications (the daily reminder),
// never remote push — this log is expo-notifications warning about a remote-push
// limitation in Expo Go that doesn't apply to us, so it's just noise.
LogBox.ignoreLogs(['expo-notifications: Android Push notifications']);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyReminder(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const granted = await requestNotificationPermission();
  if (!granted) return false;

  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Keep your streak going',
      body: "You haven't practiced today — scan a problem or try a quick quiz.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 0,
    },
  });
  return true;
}

export async function cancelDailyReminder(): Promise<void> {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}
