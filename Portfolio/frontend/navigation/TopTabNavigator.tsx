import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { BottomNavigation, Provider } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import ContactScreen from "../screens/ContactScreen";

export default function TopTabNavigator() {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "home", title: "Home", icon: "home" },
    { key: "about", title: "About Me", icon: "account" },
    { key: "contact", title: "Contact", icon: "email" },
  ];

  const renderScene = () => {
    switch (routes[index].key) {
      case "home":
        return <HomeScreen />;
      case "about":
        return <AboutScreen />;
      case "contact":
        return <ContactScreen />;
      default:
        return null;
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <BottomNavigation.Bar
          navigationState={{ index, routes }}
          onTabPress={({ route }) => {
            const newIndex = routes.findIndex((r) => r.key === route.key);
            if (newIndex !== -1) {
              setIndex(newIndex);
            }
          }}
          renderIcon={({ route, color }) => (
            <MaterialCommunityIcons name={route.icon} size={24} color={color} />
          )}
          getLabelText={({ route }) => route.title}
          style={styles.topBar}
        />
        {renderScene()}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
