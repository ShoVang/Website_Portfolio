// screens/ProjectDetails/ExpenseTracker.tsx
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  Pressable,
} from "react-native";
import { Text, Button } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../styles/Colors";

const balanceImage = require("../../../assets/UsedImages/Balance.png");

export default function ExpenseTracker({ navigation }) {
  const title = "Balance Tracker";
  const description =
    "I developed a user-friendly website that allows users to easily track their expenses by uploading an Excel file. The system generates a graph that visualizes the fluctuations in their account balances over time. Additionally, I provided users with a template they can download, offering a seamless and efficient way to manage their financial data.";

  const openLink = () => {
    Linking.openURL("https://balance-tracker-d0e1b.web.app/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Image
        source={balanceImage}
        style={styles.image}
        resizeMode="contain"
        onError={(error) => console.log("Image error:", error.nativeEvent)}
        onLoad={() => console.log("Image loaded successfully")}
      />

      <Button
        mode="contained"
        onPress={openLink}
        style={styles.button}
        labelStyle={{ color: Colors.white }}
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
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    marginTop: 10,
    width: "100%",
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
