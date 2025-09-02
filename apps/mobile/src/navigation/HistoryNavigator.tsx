import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScanHistoryScreen from "../screens/History/ScanHistoryScreen";

export type HistoryStackParamList = {
  ScanHistory: undefined;
};

const Stack = createNativeStackNavigator<HistoryStackParamList>();

const HistoryNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ScanHistory">
      <Stack.Screen name="ScanHistory" component={ScanHistoryScreen} />
    </Stack.Navigator>
  );
};

export default HistoryNavigator;
