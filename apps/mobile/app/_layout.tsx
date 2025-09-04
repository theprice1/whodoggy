// apps/mobile/app/_layout.tsx
import { Stack } from "../../../";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "WhoDoggy" }} />
		</Stack>
	);
}
