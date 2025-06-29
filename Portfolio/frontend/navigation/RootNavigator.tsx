import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopTabNavigator from "./TopTabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TopTabNavigator} />
      {/* Add more non-tab screens here */}
    </Stack.Navigator>
  );
}
