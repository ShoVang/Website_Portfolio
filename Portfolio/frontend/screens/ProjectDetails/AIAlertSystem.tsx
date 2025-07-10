// screens/ProjectDetails/AIAlertSystem.tsx
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

// Use a fallback image since AIAlertSystem.png doesn't exist yet
const aiImage = require("../../../assets/UsedImages/Grafana.png");

export default function AIAlertSystem({ navigation }) {
  const title = "AI Alert System";
  const description =
    "This project focuses on real-time anomaly detection for industrial sensor data using an AI pipeline built entirely on Microsoft Azure. The architecture begins with telemetry collected from IoT-enabled devices and routed through Azure IoT Hub and Event Hub. Data is streamed into Azure Data Lake for storage and staged processing. \n\nAzure Functions handle real-time event processing and push transformed data into both Microsoft Azure SQL Database for structured querying and Databricks for large-scale batch training. We developed a PyTorch-based anomaly detection model that uses a recursive scoring system: each new input is evaluated against both historical data and recent behavior. When the model detects a significant shift—measured using linear thresholds—it dynamically retrains itself, giving more weight to the recent high-variance data and reducing influence from stale trends.\n\nThis adaptive scoring mechanism allows the model to improve over time, learning from both past patterns and live feedback. Anomalies and performance metrics are pushed into Grafana via Azure Monitor and InfluxDB, where alerts and real-time dashboards provide full visibility into the system’s behavior.";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Image
        source={aiImage}
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
