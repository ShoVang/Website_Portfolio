// screens/ProjectDetails/CITSTicketSystem.tsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Text, Portal, Modal } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../styles/Colors";

// Replace with actual CITS Ticket System image if available
const citsImage = require("../../../assets/UsedImages/CITS.png");

export default function CITSTicketSystem({ navigation }) {
  const [imageOpen, setImageOpen] = useState(false);

  const title = "CITS Ticket System";
  const description = `
The CITS Ticket System is a custom-built IT support platform designed to streamline communication and deliver fast technical support between an IT company and its clients.

The app provides a centralized dashboard where clients can submit tickets, describe issues, and receive real-time updates on their resolution status. On the backend, we implemented a secure REST API with role-based authentication and a scalable database structure to manage clients, tickets, and internal team workflows.

Messaging between clients and support staff is handled with live notifications and status tracking to ensure transparency and quick response times. The platform also includes email integration to alert both clients and staff of important updates, and a clean UI that makes ticket management easy for both sides.

This project highlights backend design for service-oriented apps, secure authentication, and real-time communication systems tailored to IT support environments.
`;

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Pressable image styled to match AIAlertSystem.tsx (100% width, 200 height, rounded) */}
        <Pressable
          onPress={() => setImageOpen(true)}
          style={styles.imagePressable}
        >
          <Image
            source={citsImage}
            style={styles.image}
            resizeMode="contain" // match the AIAlertSystem look; switch to "cover" if you prefer
            onError={(error) => console.log("Image error:", error.nativeEvent)}
            onLoad={() => console.log("Image loaded successfully")}
          />
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backIconContainer}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={Colors.primary}
          />
        </Pressable>
      </ScrollView>

      {/* Inline PaperModal for enlarged image */}
      <PaperModal
        visible={imageOpen}
        onDismiss={() => setImageOpen(false)}
        title="CITS Ticket System"
      >
        <Image
          source={citsImage}
          resizeMode="contain"
          style={styles.modalImage}
        />
      </PaperModal>
    </>
  );
}

/** Inline PaperModal component (single-file usage) */
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
          <Pressable
            onPress={onDismiss}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
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

  // Match AIAlertSystem image look, but make it pressable
  imagePressable: {
    width: "50%",
    height: 400,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: Colors.secondary,
    //shadowColor: Colors.black,
    //shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.15,
    //   shadowRadius: 4,
    //   elevation: 3,
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

  // Modal styles
  modalContainer: {
    width: Math.min(width - 24, 720),
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 8,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    textAlign: "center",
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
