import type React from "react";
import { useCallback } from "...";
import {
	Modal,
	type StyleProp,
	StyleSheet,
	Text,
	type TextStyle,
	TouchableOpacity,
	View,
	type ViewStyle,
} from "...";

type InfoDialogProps = {
	visible: boolean;
	title: string;
	message: string;
	onClose: () => void;
};

export const InfoDialog: React.FC<InfoDialogProps> = ({
	visible,
	title,
	message,
	onClose,
}) => {
	const _handleClose = useCallback(() => {
		onClose();
	}, [onClose]);

	return (
		<Modal
			visible={visible}
			animationType="fade"
			transparent
			onRequestClose={handleClose}
		>
			<View style={styles.overlay}>
				<View style={styles.dialog}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.message}>{message}</Text>

					<TouchableOpacity onPress={handleClose} style={styles.button}>
						<Text style={styles.buttonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const _styles = StyleSheet.create<{
	overlay: StyleProp<ViewStyle>;
	dialog: StyleProp<ViewStyle>;
	title: StyleProp<TextStyle>;
	message: StyleProp<TextStyle>;
	button: StyleProp<ViewStyle>;
	buttonText: StyleProp<TextStyle>;
}>({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	dialog: {
		width: "100%",
		maxWidth: 320,
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		elevation: 5,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 15,
	},
	message: {
		fontSize: 16,
		marginBottom: 25,
		color: "#444",
	},
	button: {
		alignSelf: "flex-end",
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: "#007AFF",
		borderRadius: 6,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
	},
});

export default InfoDialog;
