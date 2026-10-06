import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/BackHeader';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

const SECTIONS = [
  {
    title: 'No account required',
    body: 'Math Homework Helper has no sign-in, no user accounts, and no server-side profile. There is nothing to register for and nothing tied to your identity.',
  },
  {
    title: 'What stays on your device',
    body: 'Saved problems (including the photo, answer, and breakdown), Learn progress, quiz scores, and your Settings preferences are all stored locally on your device. None of this is uploaded to or stored on any server operated by this app.',
  },
  {
    title: 'What gets sent off-device',
    body: 'When you scan a problem, the photo is sent to OpenRouter (a third-party AI API) solely to transcribe and solve the math problem in it. No other data — no saved history, no settings, no device identifiers — is included in that request.',
  },
  {
    title: 'No tracking or ads',
    body: 'This app does not use analytics, advertising, or tracking services of any kind.',
  },
  {
    title: 'Deleting your data',
    body: 'You can remove any individual saved problem from the Saved tab at any time. Uninstalling the app, or clearing its storage from your device settings, removes everything the app has stored.',
  },
];

export default function PrivacyScreen() {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackHeader title="Privacy Policy" subtitle="What this app does and doesn't do with your data" />

        {SECTIONS.map((section) => (
          <View key={section.title} style={[styles.card, cardShadow]}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.cardBody}>{section.body}</Text>
          </View>
        ))}
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
    card: {
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      gap: Spacing.xs,
    },
    cardTitle: {
      fontSize: FontSize.cardTitle,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    cardBody: {
      fontSize: FontSize.body,
      color: colors.textSecondary,
      lineHeight: 20,
    },
  });
