// screens/ProjectDetails/TradingBots.tsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Text, Button, Portal, Modal } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";

import { Colors } from "../../styles/Colors";
import { TYPOGRAPHY } from "../../styles/TYPOGRAPHY";

const cryptoBotImage = require("../../../assets/UsedImages/CryptoBot.png");
const forexBotImage = require("../../../assets/UsedImages/ForexBot.png");
const stockBotImage = require("../../../assets/UsedImages/StockBot.png");

export default function TradingBots({ navigation }) {
  const [modal, setModal] = useState<{
    visible: boolean;
    title?: string;
    source?: any;
  }>({ visible: false });

  const title = "Trading Bots";
  const description = `
A collection of my automated trading bots built for different markets and strategies. Each bot is designed to operate independently, with unique technical approaches and risk management rules based on the instrument it trades.

• cBot (Crypto): Focuses on cryptocurrency pairs using basic technicals, simple moving averages, and momentum-based entries. Designed for fast execution and easy customization.

• fBot (Forex): Trades major FX pairs using advanced technical analysis including support/resistance levels, wedge patterns, and candlestick formations. Integrates with the OANDA API for live data and order execution.

• sBot (Penny Stocks): Specializes in microcap equities using order book analysis and liquidity tracking to capture short-term moves. Employs a hybrid strategy combining volume imbalances and price action signals.
`;

  const [fontsLoaded] = useFonts({
    [TYPOGRAPHY.fontFamily
      .arcade]: require("../../../assets/Fonts/Press_Start_2P/PressStart2P-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modern]: require("../../../assets/Fonts/Orbitron/static/Orbitron-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modernBold]: require("../../../assets/Fonts/Orbitron/static/Orbitron-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const openImage = (imgSource: any, imgTitle: string) =>
    setModal({ visible: true, source: imgSource, title: imgTitle });
  const closeImage = () => setModal({ visible: false });

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.botGrid}>
          {/* cBot */}
          <View style={styles.botCard}>
            <Pressable
              onPress={() => openImage(cryptoBotImage, "cBot (Crypto)")}
              style={styles.imagePressable}
            >
              <Image
                source={cryptoBotImage}
                style={styles.image}
                resizeMode="contain"
              />
            </Pressable>
            <Button
              mode="contained"
              buttonColor={Colors.primary}
              textColor={Colors.white}
              style={styles.detailsButton}
              labelStyle={{ fontFamily: TYPOGRAPHY.fontFamily.modernBold }}
              onPress={() => navigation.navigate("CryptoBotDetails")}
            >
              See More Details
            </Button>
          </View>

          {/* fBot */}
          <View style={styles.botCard}>
            <Pressable
              onPress={() => openImage(forexBotImage, "fBot (Forex)")}
              style={styles.imagePressable}
            >
              <Image
                source={forexBotImage}
                style={styles.image}
                resizeMode="contain"
              />
            </Pressable>
            <Button
              mode="contained"
              buttonColor={Colors.primary}
              textColor={Colors.white}
              style={styles.detailsButton}
              labelStyle={{ fontFamily: TYPOGRAPHY.fontFamily.modernBold }}
              onPress={() => navigation.navigate("ForexBotDetails")}
            >
              See More Details
            </Button>
          </View>

          {/* sBot */}
          <View style={styles.botCard}>
            <Pressable
              onPress={() => openImage(stockBotImage, "sBot (Penny Stocks)")}
              style={styles.imagePressable}
            >
              <Image
                source={stockBotImage}
                style={styles.image}
                resizeMode="contain"
              />
            </Pressable>
            <Button
              mode="contained"
              buttonColor={Colors.primary}
              textColor={Colors.white}
              style={styles.detailsButton}
              labelStyle={{ fontFamily: TYPOGRAPHY.fontFamily.modernBold }}
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

      <PaperModal
        visible={modal.visible}
        onDismiss={closeImage}
        title={modal.title || "Preview"}
      >
        {modal.source ? (
          <Image
            source={modal.source}
            resizeMode="contain"
            style={styles.modalImage}
          />
        ) : null}
      </PaperModal>
    </>
  );
}

function PaperModal({
  visible,
  onDismiss,
  title,
  children,
}: {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Pressable onPress={onDismiss} style={styles.closeButton}>
            <MaterialCommunityIcons
              name="close"
              size={22}
              color={Colors.primary}
            />
          </Pressable>
        </View>
        <View style={styles.modalBody}>{children}</View>
      </Modal>
    </Portal>
  );
}

const { width, height } = Dimensions.get("window");

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
    backgroundColor: "rgba(102, 97, 97, 0.3)", // ✅ overlay for readability
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  botGrid: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
    flexWrap: "wrap",
    gap: 12,
  },
  botCard: {
    alignItems: "center",
    width: 200,
  },
  imagePressable: {
    width: 200,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: Colors.secondary, // ✅ keep consistent
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsButton: {
    width: 200,
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
  modalContainer: {
    width: Math.min(width - 24, 720),
    alignSelf: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
  },
  modalTitle: {
    flex: 1,
    fontSize: 20,
    color: Colors.primary,
    textAlign: "center",
    fontFamily: TYPOGRAPHY.fontFamily.modernBold, // ✅ Orbitron Bold
  },
  closeButton: {
    position: "absolute",
    right: 4,
    top: 4,
    padding: 8,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
  },
  modalBody: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingBottom: 8,
  },
  modalImage: {
    width: "100%",
    height: Math.min(height * 0.7, 700),
    borderRadius: 12,
  },
});
