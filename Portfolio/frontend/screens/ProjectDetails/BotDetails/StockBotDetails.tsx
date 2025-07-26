import React from "react";
import { View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../styles/Colors";

const stockBotImage = require("../../../../assets/UsedImages/StockBot.png");

export default function StockBotDetails({ navigation }) {
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
