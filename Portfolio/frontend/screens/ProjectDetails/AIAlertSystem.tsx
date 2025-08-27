// screens/ProjectDetails/AIAlertSystem.tsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { Text, Portal, Modal } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";

import { Colors } from "../../styles/Colors";
import { TYPOGRAPHY } from "../../styles/TYPOGRAPHY";

// Use a fallback image since AIAlertSystem.png doesn't exist yet
const aiImage = require("../../../assets/UsedImages/Grafana.png");

export default function AIAlertSystem({ navigation }) {
  const [imageOpen, setImageOpen] = useState(false);

  const title = "AI Alert System";
  const description = `
This project focuses on real-time anomaly detection for industrial sensor data using an AI pipeline built entirely on Microsoft Azure. The architecture begins with telemetry collected from IoT-enabled devices and routed through Azure IoT Hub and Event Hub. Data is streamed into Azure Data Lake for storage and staged processing.

Azure Functions handle real-time event processing and push transformed data into both Microsoft Azure SQL Database for structured querying and Databricks for large-scale batch training. We developed a PyTorch-based anomaly detection model that uses a recursive scoring system: each new input is evaluated against both historical data and recent behavior. When the model detects a significant shift—measured using linear thresholds—it dynamically retrains itself, giving more weight to the recent high-variance data and reducing influence from stale trends.

This adaptive scoring mechanism allows the model to improve over time, learning from both past patterns and live feedback. Anomalies and performance metrics are pushed into Grafana via Azure Monitor and InfluxDB, where alerts and real-time dashboards provide full visibility into the system’s behavior.
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

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <Pressable
          onPress={() => setImageOpen(true)}
          style={styles.imagePressable}
        >
          <Image source={aiImage} style={styles.image} resizeMode="contain" />
        </Pressable>

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
        title="AI Alert System"
      >
        <Image
          source={aiImage}
          resizeMode="contain"
          style={styles.modalImage}
        />
      </PaperModal>
    </>
  );
}

/** Inline PaperModal component */
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
  imagePressable: {
    width: "70%",
    height: 400,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: Colors.secondary, // ✅ keep secondary
  },
  image: {
    width: "100%",
    height: "100%",
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
    fontFamily: TYPOGRAPHY.fontFamily.modernBold, // Orbitron Bold
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
