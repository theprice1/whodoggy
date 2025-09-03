import { Text } from "...";
// navigation/ProtectedRoute.tsx
import { useAuth } from "...";

export const _ProtectedRoute = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { user } = useAuth();
	if (!user) return <Text>You must log in to continue.</Text>;
	return <>{children}</>;
};
