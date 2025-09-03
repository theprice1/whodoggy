import React, { type FC } from "react";
import { Button, Modal, Text, View } from "...";

interface InfoDialogProps {
	visible: boolean;
	message: string;
	onClose: () => void;
}

const InfoDialog: FC<InfoDialogProps> = ({ visible, message, onClose }) => (
	<Modal visible={visible} transparent>
		<View className="flex-1 justify-center items-center bg-black/50">
			<View className="bg-white p-4 rounded-lg">
				<Text>{message}</Text>
				<Button title="Close" onPress={onClose} />
			</View>
		</View>
	</Modal>
);

export default InfoDialog;
