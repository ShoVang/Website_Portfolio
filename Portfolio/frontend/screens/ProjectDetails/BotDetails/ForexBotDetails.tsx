import React from "react";
import { View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../styles/Colors";

const forexBotImage = require("../../../../assets/UsedImages/ForexBot.png");

export default function ForexBotDetails({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>fBot (Forex Trading Bot)</Text>
      <Text style={styles.description}>
        fBot is an advanced forex trading bot built in Python and integrated
        with the OANDA API for real-time data and order execution. The bot
        trades major FX pairs using a combination of technical analysis
        (support/resistance, wedge patterns, candlestick formations) and
        algorithmic strategies. It features automated risk management, trailing
        stops, and adaptive position sizing. The system is designed for high
        reliability and can operate 24/7 in live market conditions.
      </Text>
      <Image source={forexBotImage} style={styles.image} resizeMode="contain" />
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
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
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
