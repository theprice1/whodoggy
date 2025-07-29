// packages/mobile/src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';
import { theme } from '@shared/styles/theme';


export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  heading: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  text: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
});
