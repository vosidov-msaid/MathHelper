import { useAudioPlayer } from 'expo-audio';
import { useCallback } from 'react';

import { useSettings } from '@/contexts/SettingsContext';

export function useConfirmSound() {
  const { settings } = useSettings();
  const player = useAudioPlayer(require('../assets/sounds/confirm.wav'));

  return useCallback(() => {
    if (!settings.soundEffects) return;
    player.seekTo(0);
    player.play();
  }, [settings.soundEffects, player]);
}
