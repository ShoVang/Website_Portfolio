// screens/ProjectDetail.tsx
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { Colors } from "../styles/Colors";

export default function ProjectDetail({ route, navigation }) {
  const { title, description, details } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.section}>Short Description:</Text>
      <Text style={styles.text}>{description}</Text>

      <Text style={styles.section}>Details:</Text>
      <Text style={styles.text}>{details || "No extra details provided."}</Text>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        Back
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Colors.secondary,
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.neonBlue,
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
    marginTop: 8,
  },
  button: {
    marginTop: 40,
    backgroundColor: Colors.primary,
  },
});
