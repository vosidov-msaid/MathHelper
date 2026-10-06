import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SavedProblemsProvider } from '@/contexts/SavedProblemsContext';

export default function RootLayout() {
  return (
    <SavedProblemsProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </SavedProblemsProvider>
  );
}
