// screens/ProjectDetails/TradingBots/CryptoBotDetails.tsx
import React from "react";
import { View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";

import { Colors } from "../../../styles/Colors";
import { TYPOGRAPHY } from "../../../styles/TYPOGRAPHY";

const cryptoBotImage = require("../../../../assets/UsedImages/CryptoBot.png");

export default function CryptoBotDetails({ navigation }) {
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
      <Text style={styles.heading}>cBot (Crypto Trading Bot)</Text>
      <Text style={styles.description}>
        cBot is an automated cryptocurrency trading bot built using the
        open-source Freqtrade framework (Python). It operates on major crypto
        exchanges and is designed for fast execution and easy customization. The
        bot uses technical indicators such as Simple Moving Averages (SMA),
        Relative Strength Index (RSI), and momentum-based entries to identify
        trading opportunities. Risk management is handled through dynamic
        stop-loss and take-profit settings. The strategy is optimized for high
        volatility and rapid market changes, making it ideal for crypto pairs.
      </Text>
      <Image
        source={cryptoBotImage}
        style={styles.image}
        resizeMode="contain"
      />
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
    color: Colors.black, // ✅ black text
    lineHeight: 28,
    marginBottom: 20,
    textAlign: "left",
    fontFamily: TYPOGRAPHY.fontFamily.modernBold, // Orbitron Bold
    backgroundColor: "rgba(102, 97, 97, 0.3)", // ✅ readability overlay
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
