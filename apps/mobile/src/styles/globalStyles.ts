// packages/mobile/src/styles/globalStyles.ts
import { StyleSheet } from "react-native";
import theme from "../../../../packages/shared/src/styles/theme"; // default import

export const _globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: parseFloat(theme.spacing[4]), // convert string to number if needed
  },
  heading: {
    fontSize: parseFloat(theme.fontSize.xl),
    color: theme.colors.text,
    marginBottom: parseFloat(theme.spacing[4]),
  },
  text: {
    fontSize: parseFloat(theme.fontSize.base),
    color: theme.colors.text,
  },
});
