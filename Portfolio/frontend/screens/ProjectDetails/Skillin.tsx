// screens/ProjectDetails/Skillin.tsx
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

// Replace with actual Skillin image if available
const skillinImage = require("../../../assets/UsedImages/Skillin.png");

export default function Skillin({ navigation }) {
  const title = "Skillin";
  const description = `
Skillin is a custom-built content delivery network (CDN) that functions as an e-learning platform engineered that host and distribute educational videos, lessons, and tutoring. 

The backend architecture utilizes AWS cloud services for things like data base and authozation and server hosting. Our viedos are handled by CloudFront to handle seemles content delviery.

On the front end, Skillin features a React Native mobile app that enable students to explore courses, connect with tutors, and track learning progress. The platform integrates secure user authentication, dynamic course management, and real-time analytics to monitor engagement and optimize content delivery.

This project highlights expertise in full-stack architecture, cloud optimization for cost and performance, and crafting a seamless user experience tailored for both students and instructors.
`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Image
        source={skillinImage}
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
