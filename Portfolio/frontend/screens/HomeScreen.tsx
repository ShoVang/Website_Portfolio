import React from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import { Colors } from "../styles/Colors";
import { Text, Banner, BottomNavigation } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function HomeScreen() {
  const icons = {
    dice: require("../../assets/icons8-dice-50.png"),
    chip: require("../../assets/casino-chip.png"),
    cards: require("../../assets/icons8-cards-50.png"),
  };

  return (
    <View style={styles.container}>
      {/* Styled Banner */}
      <Banner visible={true} actions={[]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Image
            source={icons.chip}
            style={[styles.iconImage, { marginRight: 12 }]}
            resizeMode="contain"
          />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.neonText}>ROLL THE DICE</Text>
            <Text style={styles.neonText}>HIRE ME</Text>
          </View>
          <Image
            source={icons.dice}
            style={[styles.iconImage, { marginLeft: 12 }]}
            resizeMode="contain"
          />
        </View>
      </Banner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  banner: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    marginBottom: 20,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  bannerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  neonText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 28,
    textShadowColor: "#FFB300",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    marginBottom: 0,
    textAlign: "center",
  },
});
