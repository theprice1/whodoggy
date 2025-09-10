// packages/mobile/src/hooks/useThemedAssets.ts
import { useColorScheme } from 'react-native';

export const useThemedAssets = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getThemedImage = (lightImage: string, darkImage: string) => {
    return isDark ? darkImage : lightImage;
  };

  const getThemedIcon = (name: string) => {
    return isDark ? `${name}-dark` : name;
  };

  const colors = {
    primary: isDark ? '#4799F0' : '#2D89EF',
    secondary: isDark ? '#F7B84B' : '#F5A623',
    background: isDark ? '#121212' : '#FFFFFF',
    surface: isDark ? '#1E1E1E' : '#F5F5F5',
    text: isDark ? '#EAEAEA' : '#2C3E50',
  };

  return {
    getThemedImage,
    getThemedIcon,
    colors,
    isDark,
  };
};
