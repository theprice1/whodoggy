// navigation/ProtectedRoute.tsx
import { Text } from "react-native";
import { useAuth } from "@whodoggy/shared"

export const _ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  if (!user) return <Text>You must log in to continue.</Text>;
  return <>{children}</>;
};
