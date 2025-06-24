import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TopTabNavigator from "./TopTabNavigator";
//import { useAuth } from "../hooks/AuthContext";

export default function AppNavigator() {
  //const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <TopTabNavigator />
    </NavigationContainer>
  );
}
