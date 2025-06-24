import React from "react";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";
import AppNavigator from "./navigation/AppNavigator";

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6200ee",
    background: "#ffffff",
    surface: "#ffffff",
    text: "#000000",
  },
};

export default function App() {
  return (
    <PaperProvider theme={lightTheme}>
      <AppNavigator />
    </PaperProvider>
  );
}
