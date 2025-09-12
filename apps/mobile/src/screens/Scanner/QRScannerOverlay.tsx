import type React from "react";
import { StyleSheet, Text, View } from "react-native";

interface QRScannerOverlayProps {
	isScanning?: boolean;
}

export const QRScannerOverlay: React.FC<QRScannerOverlayProps> = ({
	isScanning = false,
}) => {
	return (
		<View style={styles.overlay}>
			<View style={styles.topMask} />
			<View style={styles.middleRow}>
				<View style={styles.sideMask} />
				<View style={styles.scanArea}>
					<View style={styles.corners}>
						<View style={[styles.corner, styles.topLeft]} />
						<View style={[styles.corner, styles.topRight]} />
						<View style={[styles.corner, styles.bottomLeft]} />
						<View style={[styles.corner, styles.bottomRight]} />
					</View>
					{isScanning && (
						<View
							style={[
								styles.scanLine,
								// Add animation here if needed
							]}
						/>
					)}
				</View>
				<View style={styles.sideMask} />
			</View>
			<View style={styles.bottomMask}>
				<Text style={styles.instruction}>
					Position the QR code within the frame to scan
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "transparent",
	},
	topMask: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	middleRow: {
		flexDirection: "row",
		height: 250,
	},
	sideMask: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	scanArea: {
		width: 250,
		height: 250,
		position: "relative",
	},
	corners: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	corner: {
		position: "absolute",
		width: 20,
		height: 20,
		borderColor: "#FFFFFF",
	},
	topLeft: {
		top: 0,
		left: 0,
		borderTopWidth: 3,
		borderLeftWidth: 3,
	},
	topRight: {
		top: 0,
		right: 0,
		borderTopWidth: 3,
		borderRightWidth: 3,
	},
	bottomLeft: {
		bottom: 0,
		left: 0,
		borderBottomWidth: 3,
		borderLeftWidth: 3,
	},
	bottomRight: {
		bottom: 0,
		right: 0,
		borderBottomWidth: 3,
		borderRightWidth: 3,
	},
	scanLine: {
		position: "absolute",
		left: 0,
		right: 0,
		height: 2,
		backgroundColor: "#00FF00",
		top: "50%",
	},
	bottomMask: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		justifyContent: "center",
		alignItems: "center",
	},
	instruction: {
		color: "#FFFFFF",
		fontSize: 16,
		textAlign: "center",
		paddingHorizontal: 20,
	},
});
