import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Colors } from '@/constants/Colors';
import { useGlobalTheme } from '@/hooks/useGlobalTheme';

export default function TabLayout() {
  const { isDark } = useGlobalTheme();
  const colors = useMemo(() => isDark ? Colors.dark : Colors.light, [isDark]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <ThemeToggle />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
