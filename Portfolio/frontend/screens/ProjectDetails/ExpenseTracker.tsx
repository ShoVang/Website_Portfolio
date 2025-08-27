// screens/ProjectDetails/ExpenseTracker.tsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  Pressable,
} from "react-native";
import { Text, Button, Portal, Modal } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";

import { Colors } from "../../styles/Colors";
import { TYPOGRAPHY } from "../../styles/TYPOGRAPHY";

const balanceImage = require("../../../assets/UsedImages/Balance.png");

export default function ExpenseTracker({ navigation }) {
  const [imageOpen, setImageOpen] = useState(false);

  const title = "Balance Tracker";
  const description =
    "I developed a user-friendly website that allows users to easily track their expenses by uploading an Excel file. The system generates a graph that visualizes the fluctuations in their account balances over time. Additionally, I provided users with a template they can download, offering a seamless and efficient way to manage their financial data.";

  const [fontsLoaded] = useFonts({
    [TYPOGRAPHY.fontFamily
      .arcade]: require("../../../assets/Fonts/Press_Start_2P/PressStart2P-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modern]: require("../../../assets/Fonts/Orbitron/static/Orbitron-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modernBold]: require("../../../assets/Fonts/Orbitron/static/Orbitron-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const openLink = () => {
    Linking.openURL("https://balance-tracker-d0e1b.web.app/");
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <Pressable
          onPress={() => setImageOpen(true)}
          style={styles.imagePressable}
        >
          <Image
            source={balanceImage}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>

        <Button
          mode="contained"
          onPress={openLink}
          style={styles.button}
          labelStyle={{
            color: Colors.white,
            fontFamily: TYPOGRAPHY.fontFamily.modernBold,
          }}
        >
          Visit Balance Tracker Website
        </Button>

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
        visible={imageOpen}
        onDismiss={() => setImageOpen(false)}
        title="Balance Tracker"
      >
        <Image
          source={balanceImage}
          resizeMode="contain"
          style={styles.modalImage}
        />
      </PaperModal>
    </>
  );
}

function PaperModal({ visible, onDismiss, title, children }) {
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
    fontFamily: TYPOGRAPHY.fontFamily.arcade,
  },
  description: {
    fontSize: 18,
    color: Colors.black, // light text for dark background
    lineHeight: 28,
    marginBottom: 20,
    textAlign: "left",
    fontFamily: TYPOGRAPHY.fontFamily.modernBold,
    backgroundColor: "rgba(102, 97, 97, 0.3)", // subtle overlay
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  imagePressable: {
    width: "70%",
    height: 400,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: Colors.secondary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    marginTop: 10,
    width: "70%",
    borderRadius: 8,
    alignSelf: "center",
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
    fontFamily: TYPOGRAPHY.fontFamily.modernBold,
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
