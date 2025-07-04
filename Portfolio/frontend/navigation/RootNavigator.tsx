import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopTabNavigator from "./TopTabNavigator";
import ProjectDetail from "../screens/ProjectDetail";

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
    </Stack.Navigator>
  );
}
