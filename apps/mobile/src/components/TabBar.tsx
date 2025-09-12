import type React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "./Icon";

interface Tab {
	label: string;
	icon: string;
	special?: boolean;
}

interface TabBarProps {
	tabs: Tab[];
	activeTab: number;
	onTabPress: (index: number) => void;
}

const colors = {
	surface: "#FFFFFF",
	primary: "#007AFF",
	gray: "#8E8E93",
};

export const TabBar: React.FC<TabBarProps> = ({
	tabs,
	activeTab,
	onTabPress,
}) => {
	return (
		<View style={[styles.container, { backgroundColor: colors.surface }]}>
			{tabs.map((tab, index) => (
				<TouchableOpacity
					key={index}
					style={[styles.tab, tab.special && styles.specialTab]}
					onPress={() => onTabPress(index)}
				>
					<Icon
						name={tab.icon}
						size={24}
						color={activeTab === index ? colors.primary : colors.gray}
					/>
					<Text
						style={[
							styles.tabLabel,
							{ color: activeTab === index ? colors.primary : colors.gray },
						]}
					>
						{tab.label}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 60,
		borderTopWidth: 1,
		borderTopColor: "#E0E0E0",
	},
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
	},
	specialTab: {
		backgroundColor: "#F0F8FF",
	},
	tabLabel: {
		fontSize: 12,
		marginTop: 4,
	},
});
