import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Styles {
  card: ViewStyle;
  image: ImageStyle;
  info: ViewStyle;
  name: TextStyle;
  species: TextStyle;
}

export const createStyles = (isDark: boolean): Styles => {
  const colors = isDark ? Colors.dark : Colors.light;
  
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    image: {
      width: 96,
      height: 96,
    },
    info: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    species: {
      color: colors.secondaryText,
      marginTop: 4,
    },
  });
};