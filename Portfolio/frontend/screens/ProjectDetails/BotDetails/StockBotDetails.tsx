// screens/ProjectDetails/TradingBots/StockBotDetails.tsx
import React from "react";
import { StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";

import { Colors } from "../../../styles/Colors";
import { TYPOGRAPHY } from "../../../styles/TYPOGRAPHY";

const stockBotImage = require("../../../../assets/UsedImages/StockBot.png");

export default function StockBotDetails({ navigation }) {
  const [fontsLoaded] = useFonts({
    [TYPOGRAPHY.fontFamily
      .arcade]: require("../../../../assets/Fonts/Press_Start_2P/PressStart2P-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modern]: require("../../../../assets/Fonts/Orbitron/static/Orbitron-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modernBold]: require("../../../../assets/Fonts/Orbitron/static/Orbitron-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>sBot (Penny Stock Trading Bot)</Text>
      <Text style={styles.description}>
        sBot is a specialized trading bot designed for microcap and penny
        stocks. It leverages order book analysis, liquidity tracking, and
        real-time volume imbalances to identify short-term trading
        opportunities. The bot combines price action signals with a hybrid
        strategy that adapts to changing market conditions. Built in Python,
        sBot is optimized for fast execution and can handle high-frequency data
        feeds from multiple brokers.
      </Text>
      <Image source={stockBotImage} style={styles.image} resizeMode="contain" />
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
    backgroundColor: Colors.secondary, // consistent background
    flexGrow: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    color: Colors.primary,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: TYPOGRAPHY.fontFamily.arcade, // ✅ PressStart2P
  },
  description: {
    fontSize: 18,
    color: Colors.black, // ✅ readable
    lineHeight: 28,
    marginBottom: 20,
    textAlign: "left",
    fontFamily: TYPOGRAPHY.fontFamily.modernBold, // ✅ Orbitron Bold
    backgroundColor: "rgba(102, 97, 97, 0.3)", // ✅ overlay
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
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
