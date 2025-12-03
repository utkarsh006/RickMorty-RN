import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGlobalTheme } from '@/hooks/useGlobalTheme';
import { Colors } from '@/constants/Colors';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useGlobalTheme();
  
  const colors = useMemo(() => isDark ? Colors.dark : Colors.light, [isDark]);
  const iconName = isDark ? 'sun.max.fill' : 'moon.fill';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <IconSymbol
        name={iconName}
        size={20}
        color={colors.tint}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.3)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 8,
      },
    }),
  },
});

