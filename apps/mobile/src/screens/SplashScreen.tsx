// packages/mobile/src/screens/SplashScreen.tsx
import type React from "react";
import { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import SplashScreenNative from "react-native-splash-screen";
import Logo from "../assets/images/logo/logo-animated.svg";

export const SplashScreen: React.FC = () => {
	const fadeAnim = new Animated.Value(0);
	const scaleAnim = new Animated.Value(0.8);

	useEffect(() => {
		// Hide native splash screen
		SplashScreenNative.hide();

		// Animate logo
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 800,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				tension: 10,
				friction: 2,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.logoContainer,
					{
						opacity: fadeAnim,
						transform: [{ scale: scaleAnim }],
					},
				]}
			>
				<Logo width={200} height={200} />
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2D89EF",
		justifyContent: "center",
		alignItems: "center",
	},
	logoContainer: {
		alignItems: "center",
	},
});
