import React from "react";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";
import AppNavigator from "./navigation/AppNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

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
  // 👇 Load MaterialCommunityIcons font explicitly
  const [fontsLoaded] = useFonts({
    ...MaterialCommunityIcons.font,
  });

  if (!fontsLoaded) {
    return null; // Wait until fonts are ready
  }

  return (
    <PaperProvider theme={lightTheme}>
      <AppNavigator />
    </PaperProvider>
  );
}
