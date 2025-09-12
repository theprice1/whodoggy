import React from 'react';
import { Text, TextStyle } from 'react-native';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000', style }) => {
  const getIconSymbol = (iconName: string): string => {
    const iconMap: Record<string, string> = {
      home: '🏠', search: '🔍', settings: '⚙️', profile: '👤',
      scan: '📱', help: '❓', back: '←', close: '×', check: '✓'
    };
    return iconMap[iconName] || '?';
  };

  return (
    <Text style={[{ fontSize: size, color: color }, style]}>
      {getIconSymbol(name)}
    </Text>
  );
};
