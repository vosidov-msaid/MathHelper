import '@/lib/suppressNotificationWarning';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LearnProgressProvider } from '@/contexts/LearnProgressContext';
import { QuizProgressProvider } from '@/contexts/QuizProgressContext';
import { SavedProblemsProvider } from '@/contexts/SavedProblemsContext';
import { ScanQueueProvider } from '@/contexts/ScanQueueContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import '@/lib/notifications';

function RootNavigator() {
  const { isDark } = useTheme();
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <SavedProblemsProvider>
      <ScanQueueProvider>
        <LearnProgressProvider>
          <QuizProgressProvider>
            <SettingsProvider>
              <ThemeProvider>
                <RootNavigator />
              </ThemeProvider>
            </SettingsProvider>
          </QuizProgressProvider>
        </LearnProgressProvider>
      </ScanQueueProvider>
    </SavedProblemsProvider>
  );
}
