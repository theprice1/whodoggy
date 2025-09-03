// packages/shared/components/AppLayout.tsx
import type React from "react";
import { StyleSheet, View } from "...";
import { theme } from "...";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => <View style={styles.container}>{children}</View>;

const _styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		padding: theme.spacing.md,
	},
});
