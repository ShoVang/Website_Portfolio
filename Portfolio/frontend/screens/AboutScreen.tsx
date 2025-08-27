import React from "react";
import { ScrollView, View, StyleSheet, Linking } from "react-native";
import { useFonts } from "expo-font";
import { Text, Button } from "react-native-paper";

import { Colors } from "../styles/Colors";
import { TYPOGRAPHY } from "../styles/TYPOGRAPHY";
import useScreenDimensions from "../hooks/useScreenDimensions";

export default function AboutScreen() {
  const { height, width, isLandscape } = useScreenDimensions();

  const [fontsLoaded, fontError] = useFonts({
    [TYPOGRAPHY.fontFamily
      .arcade]: require("../../assets/Fonts/Press_Start_2P/PressStart2P-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modern]: require("../../assets/Fonts/Orbitron/static/Orbitron-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modernBold]: require("../../assets/Fonts/Orbitron/static/Orbitron-Bold.ttf"),
  });

  if (!fontsLoaded) return null; // wait until fonts are loaded

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.neonText}>ABOUT ME</Text>
            </View>
          </View>
        </View>

        <Text style={styles.description}>
          I'm a computer science major graduating in 2025, focusing on a career
          as a full-stack developer. I’m skilled in both front-end and back-end
          development for web and app projects, with a particular passion for
          designing visually appealing and responsive user interfaces.
        </Text>

        <Text style={styles.description}>
          I also enjoy automating processes to make businesses or personal tasks
          more efficient. This website is a showcase of my skills, developed
          through both school and personal projects, as I pursue internship and
          entry-level opportunities.
        </Text>

        <Text style={styles.description}>
          I also created it to offer affordable services to small businesses,
          hoping to make tech solutions accessible for those looking to grow.
        </Text>

        {/* GitHub Button */}
        <Button
          mode="contained"
          style={styles.githubButton}
          labelStyle={{
            fontFamily: TYPOGRAPHY.fontFamily.modernBold,
            fontSize: 20,
          }}
          icon="github"
          onPress={() => Linking.openURL("https://github.com/ShoVang")}
        >
          Visit My GitHub
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  banner: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    marginBottom: 20,
    width: "100%",
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  bannerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1,
  },
  neonText: {
    color: Colors.yellow,
    fontSize: 28,
    textShadowColor: Colors.neonBlue,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    letterSpacing: 2,
    fontFamily: TYPOGRAPHY.fontFamily.arcade,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#222222ff",
    lineHeight: 28,
    marginBottom: 20,
    textAlign: "left",
    fontFamily: TYPOGRAPHY.fontFamily.modernBold,
    backgroundColor: "rgba(102, 97, 97, 0.3)",
    padding: 10,
    borderRadius: 8,
  },
  githubButton: {
    marginTop: 10,
    backgroundColor: Colors.secondary, // GitHub dark gray
    borderRadius: 8,
    paddingVertical: 4,
  },
});
