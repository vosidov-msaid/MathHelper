import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LearnProgressProvider } from '@/contexts/LearnProgressContext';
import { SavedProblemsProvider } from '@/contexts/SavedProblemsContext';

export default function RootLayout() {
  return (
    <SavedProblemsProvider>
      <LearnProgressProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </LearnProgressProvider>
    </SavedProblemsProvider>
  );
}
