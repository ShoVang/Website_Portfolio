import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopTabNavigator from "./TopTabNavigator";
import ProjectDetail from "../screens/ProjectDetails/ProjectDetail";
import ExpenseTracker from "../screens/ProjectDetails/ExpenseTracker";
import AIAlertSystem from "../screens/ProjectDetails/AIAlertSystem";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TopTabNavigator} />
      {/* Add more non-tab screens here */}
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetail}
        options={{ title: "Project Details" }}
      />
      <Stack.Screen
        name="ExpenseTracker"
        component={ExpenseTracker}
        options={{ title: "Expense Tracker" }}
      />
      <Stack.Screen
        name="AIAlertSystem"
        component={AIAlertSystem}
        options={{ title: "AI Alert System" }}
      />
    </Stack.Navigator>
  );
}
