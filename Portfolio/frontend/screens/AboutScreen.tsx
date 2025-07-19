import React from "react";
import { ScrollView, View, StyleSheet, Platform } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "../styles/Colors";
import useScreenDimensions from "../hooks/useScreenDimensions";

export default function AboutScreen() {
  const { height, width, isLandscape } = useScreenDimensions();

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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondary, // now fills whole screen
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
    fontWeight: "bold",
    fontSize: 28,
    textShadowColor: Colors.neonBlue,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    letterSpacing: 2,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "left",
  },
});
