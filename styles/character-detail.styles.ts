import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Styles {
  container: ViewStyle;
  center: ViewStyle;
  muted: TextStyle;
  error: TextStyle;
  backBtn: ViewStyle;
  backBtnText: TextStyle;
  headerArea: ViewStyle;
  heroImage: ViewStyle;
  name: TextStyle;
  meta: TextStyle;
  metaRow: ViewStyle;
  metaLabel: TextStyle;
  metaValue: TextStyle;
  sectionTitle: TextStyle;
  separator: ViewStyle;
}

export const createStyles = (isDark: boolean): Styles => {
  const colors = isDark ? Colors.dark : Colors.light;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    muted: {
      marginTop: 8,
      color: colors.secondaryText,
    },
    error: {
      color: colors.error,
      textAlign: 'center',
    },
    backBtn: {
      marginTop: 12,
      backgroundColor: colors.cardBackground,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    backBtnText: {
      color: colors.text,
      fontWeight: '600',
    },
    headerArea: {
      alignItems: 'center',
      paddingBottom: 12,
    },
    heroImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 12,
    },
    name: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
    },
    meta: {
      color: colors.secondaryText,
      marginTop: 4,
      marginBottom: 8,
    },
    metaRow: {
      flexDirection: 'row',
      marginTop: 4,
    },
    metaLabel: {
      color: colors.secondaryText,
      marginRight: 6,
    },
    metaValue: {
      color: colors.text,
      fontWeight: '500',
    },
    sectionTitle: {
      marginTop: 16,
      fontSize: 18,
      fontWeight: '700',
      alignSelf: 'flex-start',
      color: colors.text,
    },
    separator: {
      height: 12,
    },
  });
}; 