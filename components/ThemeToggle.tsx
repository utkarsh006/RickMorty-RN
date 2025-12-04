import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme, toggleColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export function ThemeToggle() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        borderWidth: 1,
        borderColor: colors.border,
      }}
      onPress={toggleColorScheme}
      activeOpacity={0.7}
    >
      <IconSymbol
        name={colorScheme === 'dark' ? 'sun.max.fill' : 'moon.fill'}
        size={20}
        color={colors.tint}
      />
    </TouchableOpacity>
  );
}

