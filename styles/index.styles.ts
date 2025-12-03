import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Styles {
  container: ViewStyle;
  loader: ViewStyle;
  loaderText: TextStyle;
  errorText: TextStyle;
}

export const createStyles = (isDark: boolean): Styles => {
  const colors = isDark ? Colors.dark : Colors.light;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderText: {
      marginTop: 8,
      color: colors.loader,
    },
    errorText: {
      color: colors.error,
      textAlign: 'center',
      marginTop: 20,
    },
  });
};