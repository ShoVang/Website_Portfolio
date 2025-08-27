import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import {
  BottomNavigation,
  Provider as PaperProvider,
  MD3LightTheme,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Colors } from "../styles/Colors";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import ContactScreen from "../screens/ContactScreen";

export default function TopTabNavigator({ navigation }) {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "home", title: "Home", icon: "home" },
    { key: "about", title: "About Me", icon: "account" },
    { key: "contact", title: "Contact", icon: "email" },
  ];

  // Load custom font
  const [fontsLoaded] = useFonts({
    OrbitronBold: require("../../assets/Fonts/Orbitron/static/Orbitron-Bold.ttf"),
  });

  // Custom theme for nav bar labels + background
  const navBarTheme = useMemo(() => {
    const base = MD3LightTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        surface: "#2E2E2E", // background
        elevation: {
          ...base.colors.elevation,
          level2: "#2E2E2E", // bar bg color
        },
      },
      fonts: {
        ...base.fonts,
        labelLarge: { ...base.fonts.labelLarge, fontFamily: "OrbitronBold" },
        labelMedium: { ...base.fonts.labelMedium, fontFamily: "OrbitronBold" },
        labelSmall: { ...base.fonts.labelSmall, fontFamily: "OrbitronBold" },
      },
    };
  }, []);

  const renderScene = () => {
    switch (routes[index].key) {
      case "home":
        return <HomeScreen navigation={navigation} />;
      case "about":
        return <AboutScreen />;
      case "contact":
        return <ContactScreen />;
      default:
        return null;
    }
  };

  if (!fontsLoaded) return null;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <BottomNavigation.Bar
          theme={navBarTheme}
          navigationState={{ index, routes }}
          onTabPress={({ route }) => {
            const newIndex = routes.findIndex((r) => r.key === route.key);
            if (newIndex !== -1) setIndex(newIndex);
          }}
          renderIcon={({ route }) => (
            <MaterialCommunityIcons
              name={route.icon}
              size={24}
              color={Colors.primary} // always red
            />
          )}
          getLabelText={({ route }) => route.title}
          activeColor={Colors.primary} // label+icon when active
          inactiveColor="#aaa" // label+icon when inactive
          style={styles.topBar}
        />
        {renderScene()}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#2E2E2E",
  },
});
