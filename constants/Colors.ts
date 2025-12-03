/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Rick and Morty themed color palette.
 */

const tintColorLight = '#00b4d8';
const tintColorDark = '#90e0ef';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f8f8f8',
    cardBackground: '#ffffff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#ddd',
    secondaryText: '#666666',
    loader: '#666666',
    error: '#dc3545',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    cardBackground: '#1a1a1a',
    tint: tintColorDark,
    icon: '#CCCCCC',
    tabIconDefault: '#CCCCCC',
    tabIconSelected: tintColorDark,
    border: '#333333',
    secondaryText: '#AAAAAA',
    loader: '#AAAAAA',
    error: '#ff6b6b',
  },
};
