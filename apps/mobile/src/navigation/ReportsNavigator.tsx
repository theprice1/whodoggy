import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportFoundDogScreen from "../screens/Reports/ReportFoundDogScreen";

export type ReportsStackParamList = {
  ReportFoundDog: undefined;
};

const _Stack = createNativeStackNavigator<ReportsStackParamList>();

const ReportsNavigator: React.FC = () => {
  return (
    <_Stack.Navigator initialRouteName="ReportFoundDog">
      <_Stack.Screen name="ReportFoundDog" component={ReportFoundDogScreen} />
    </_Stack.Navigator>
  );
};

export default ReportsNavigator;
