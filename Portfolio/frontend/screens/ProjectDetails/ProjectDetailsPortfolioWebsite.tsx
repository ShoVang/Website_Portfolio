// screens/ProjectDetails/ProjectDetailsPortfolioWebsite.tsx
import React from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";

import { Colors } from "../../styles/Colors";
import { TYPOGRAPHY } from "../../styles/TYPOGRAPHY";

export default function ProjectDetailsPortfolioWebsite({ navigation }) {
  const [fontsLoaded] = useFonts({
    [TYPOGRAPHY.fontFamily
      .arcade]: require("../../../assets/Fonts/Press_Start_2P/PressStart2P-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modern]: require("../../../assets/Fonts/Orbitron/static/Orbitron-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modernBold]: require("../../../assets/Fonts/Orbitron/static/Orbitron-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Portfolio Website</Text>
      <Text style={styles.description}>
        This portfolio website was built to showcase my projects, skills, and
        experience as a developer. It is built using React Native for a modern,
        cross-platform experience, and leverages React Navigation for smooth
        transitions between sections. The site features a custom slot machine
        animation, interactive project cards, and a clean, responsive design.
        The backend is structured for easy expansion, and the codebase is
        organized for maintainability and scalability. All UI components are
        styled for a cohesive, professional look, and the site is optimized for
        both desktop and mobile viewing.
      </Text>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backIconContainer}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={Colors.primary}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Colors.secondary,
    flexGrow: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    color: Colors.primary,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: TYPOGRAPHY.fontFamily.arcade, // PressStart2P
  },
  description: {
    fontSize: 18,
    color: Colors.black, // readable dark text
    lineHeight: 28,
    marginBottom: 20,
    textAlign: "left",
    fontFamily: TYPOGRAPHY.fontFamily.modernBold, // Orbitron Bold
    backgroundColor: "rgba(102, 97, 97, 0.3)", // overlay for readability
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  backIconContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
