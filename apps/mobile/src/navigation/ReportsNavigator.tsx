import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportFoundDogScreen from "../screens/Reports/ReportFoundDogScreen";

export type ReportsStackParamList = {
  ReportFoundDog: undefined;
};

const Stack = createNativeStackNavigator<ReportsStackParamList>();

const ReportsNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ReportFoundDog">
      <Stack.Screen name="ReportFoundDog" component={ReportFoundDogScreen} />
    </Stack.Navigator>
  );
};

export default ReportsNavigator;
