// screens/ProjectDetails/TradingBots.tsx
import React from "react";
import { View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { Text, Button } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../styles/Colors";

// Replace these with your actual images for each bot
const cryptoBotImage = require("../../../assets/UsedImages/CryptoBot.png");
const forexBotImage = require("../../../assets/UsedImages/ForexBot.png");
const stockBotImage = require("../../../assets/UsedImages/StockBot.png");

export default function TradingBots({ navigation }) {
  const title = "Trading Bots";
  const description = `
A collection of my automated trading bots built for different markets and strategies. Each bot is designed to operate independently, with unique technical approaches and risk management rules based on the instrument it trades.

• cBot (Crypto): Focuses on cryptocurrency pairs using basic technicals, simple moving averages, and momentum-based entries. Designed for fast execution and easy customization.

• fBot (Forex): Trades major FX pairs using advanced technical analysis including support/resistance levels, wedge patterns, and candlestick formations. Integrates with the OANDA API for live data and order execution.

• sBot (Penny Stocks): Specializes in microcap equities using order book analysis and liquidity tracking to capture short-term moves. Employs a hybrid strategy combining volume imbalances and price action signals.
`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.botGrid}>
        {/* cBot */}
        <View style={styles.botCard}>
          <Image
            source={cryptoBotImage}
            style={styles.image}
            resizeMode="contain"
          />
          <Button
            mode="contained"
            buttonColor={Colors.primary}
            textColor={Colors.white}
            style={styles.detailsButton}
            onPress={() => navigation.navigate("CryptoBotDetails")}
          >
            See More Details
          </Button>
        </View>

        {/* fBot */}
        <View style={styles.botCard}>
          <Image
            source={forexBotImage}
            style={styles.image}
            resizeMode="contain"
          />
          <Button
            mode="contained"
            buttonColor={Colors.primary}
            textColor={Colors.white}
            style={styles.detailsButton}
            onPress={() => navigation.navigate("ForexBotDetails")}
          >
            See More Details
          </Button>
        </View>

        {/* sBot */}
        <View style={styles.botCard}>
          <Image
            source={stockBotImage}
            style={styles.image}
            resizeMode="contain"
          />
          <Button
            mode="contained"
            buttonColor={Colors.primary}
            textColor={Colors.white}
            style={styles.detailsButton}
            onPress={() => navigation.navigate("StockBotDetails")}
          >
            See More Details
          </Button>
        </View>
      </View>

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
  botGrid: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
  },
  botCard: {
    alignItems: "center",
    width: 200, // Larger card size
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  detailsButton: {
    width: 200, // Match image width
    borderRadius: 6,
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
