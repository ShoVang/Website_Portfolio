import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import AuthStack from "./AuthNavigator";
import { useAuth } from "../hooks/AuthContext";

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <RootNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
