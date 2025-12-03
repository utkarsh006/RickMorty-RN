import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useGlobalTheme } from '@/hooks/useGlobalTheme';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  const { isDark } = useGlobalTheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Custom dark theme with pure black background
  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.dark.background,
      card: Colors.dark.cardBackground,
      text: Colors.dark.text,
      border: Colors.dark.border,
      primary: Colors.dark.tint,
    },
  };

  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.light.background,
      card: Colors.light.cardBackground,
      text: Colors.light.text,
      border: Colors.light.border,
      primary: Colors.light.tint,
    },
  };

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <NavigationThemeProvider value={isDark ? customDarkTheme : customLightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="character/[id]" options={{ 
          title: 'Character',
          headerStyle: {
            backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
          },
          headerTintColor: isDark ? Colors.dark.text : Colors.light.text,
        }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={isDark ? Colors.dark.background : Colors.light.background} />
    </NavigationThemeProvider>
  );
}
