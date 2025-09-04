// navigation/ProtectedRoute.tsx
import { Text, useAuth } from "../../../../";

export const _ProtectedRoute = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { user } = useAuth();
	if (!user) return <Text>You must log in to continue.</Text>;
	return <>{children}</>;
};
