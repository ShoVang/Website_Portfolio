// screens/ProjectDetails/CITSTicketSystem.tsx
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../styles/Colors";

// Replace with actual CITS Ticket System image if available
const citsImage = require("../../../assets/UsedImages/CITS.png");

export default function CITSTicketSystem({ navigation }) {
  const title = "CITS Ticket System";
  const description = `
The CITS Ticket System is a custom-built IT support platform designed to streamline communication and deliver fast technical support between an IT company and its clients.

The app provides a centralized dashboard where clients can submit tickets, describe issues, and receive real-time updates on their resolution status. On the backend, we implemented a secure REST API with role-based authentication and a scalable database structure to manage clients, tickets, and internal team workflows.

Messaging between clients and support staff is handled with live notifications and status tracking to ensure transparency and quick response times. The platform also includes email integration to alert both clients and staff of important updates, and a clean UI that makes ticket management easy for both sides.

This project highlights backend design for service-oriented apps, secure authentication, and real-time communication systems tailored to IT support environments.
`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Image
        source={citsImage}
        style={styles.image}
        resizeMode="contain"
        onError={(error) => console.log("Image error:", error.nativeEvent)}
        onLoad={() => console.log("Image loaded successfully")}
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
