import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';

export function PhotoUploadCard() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera access needed', 'Enable camera access to take a photo of a problem.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Enable photo library access to upload a problem.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.card, CardShadow]}>
      <Text style={styles.title}>Upload a Problem</Text>
      <Text style={styles.subtitle}>Take a photo or upload one from your library</Text>

      {imageUri ? (
        <View style={styles.previewWrap}>
          <Image source={{ uri: imageUri }} style={styles.preview} />
          <Pressable style={styles.removeButton} onPress={() => setImageUri(null)}>
            <Ionicons name="close" size={16} color={Colors.surface} />
          </Pressable>
        </View>
      ) : null}

      <View style={styles.buttonRow}>
        <Pressable style={styles.actionButton} onPress={takePhoto}>
          <Ionicons name="camera" size={20} color={Colors.primary} />
          <Text style={styles.actionLabel}>Take Photo</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={pickPhoto}>
          <Ionicons name="image" size={20} color={Colors.primary} />
          <Text style={styles.actionLabel}>Upload Photo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.cardTitle,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  previewWrap: {
    alignSelf: 'flex-start',
    position: 'relative',
    marginBottom: Spacing.xs,
  },
  preview: {
    width: 160,
    height: 160,
    borderRadius: Radius.md,
    backgroundColor: Colors.background,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    backgroundColor: Colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.sm,
    minHeight: 44,
  },
  actionLabel: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.primary,
  },
});
