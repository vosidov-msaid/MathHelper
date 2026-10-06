import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SectionHeader } from '@/components/SectionHeader';
import { SettingsRow } from '@/components/SettingsRow';
import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { appVersion, navRows, profile, toggleRows } from '@/data/settings';

export default function SettingsScreen() {
  const [values, setValues] = useState(() =>
    Object.fromEntries(toggleRows.map((row) => [row.id, row.defaultValue])),
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Settings" />

        <View style={[styles.profileCard, CardShadow]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.initials}</Text>
          </View>
          <View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
          </View>
        </View>

        <View style={styles.group}>
          {toggleRows.map((row) => (
            <SettingsRow
              key={row.id}
              type="switch"
              label={row.label}
              value={values[row.id]}
              onValueChange={(value) => setValues((prev) => ({ ...prev, [row.id]: value }))}
            />
          ))}
        </View>

        <View style={styles.group}>
          {navRows.map((row) => (
            <SettingsRow key={row.id} type="chevron" label={row.label} />
          ))}
        </View>

        <Text style={styles.version}>App Version {appVersion}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl * 2,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.surface,
    fontSize: FontSize.sectionHeader,
    fontWeight: '700',
  },
  profileName: {
    fontSize: FontSize.cardTitle,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  profileEmail: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  group: {
    borderRadius: Radius.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  version: {
    textAlign: 'center',
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
});
