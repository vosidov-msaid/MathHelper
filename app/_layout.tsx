import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LearnProgressProvider } from '@/contexts/LearnProgressContext';
import { QuizProgressProvider } from '@/contexts/QuizProgressContext';
import { SavedProblemsProvider } from '@/contexts/SavedProblemsContext';

export default function RootLayout() {
  return (
    <SavedProblemsProvider>
      <LearnProgressProvider>
        <QuizProgressProvider>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </QuizProgressProvider>
      </LearnProgressProvider>
    </SavedProblemsProvider>
  );
}
