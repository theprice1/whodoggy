import { Text } from "react-native";
// navigation/ProtectedRoute.tsx
import { useAuth } from "../hooks/useAuth.js";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Text>You must log in to continue.</Text>;
  return <>{children}</>;
};
