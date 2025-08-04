// packages/shared/components/AppLayout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../styles/theme'.ts;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
});
