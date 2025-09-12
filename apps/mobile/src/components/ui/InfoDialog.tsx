// apps/mobile/src/components/ui/InfoDialog.tsx
import type React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface InfoDialogProps {
	visible: boolean;
	message: string;
	onClose: () => void;
}

export const InfoDialog: React.FC<InfoDialogProps> = ({
	visible,
	message,
	onClose,
}) => {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.overlay}>
				<View style={styles.dialog}>
					<Text style={styles.message}>{message}</Text>
					<TouchableOpacity style={styles.button} onPress={onClose}>
						<Text style={styles.buttonText}>OK</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	dialog: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 8,
		minWidth: 300,
	},
	message: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 12,
		borderRadius: 6,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "600",
	},
});
