// screens/ProjectDetails/Skillin.tsx
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
import { Colors } from "../../styles/Colors";

// Replace with actual Skillin image if available
const skillinImage = require("../../../assets/UsedImages/Skillin.png");

export default function Skillin({ navigation }) {
  const [imageOpen, setImageOpen] = useState(false);

  const title = "Skillin";
  const description = `
Skillin is a custom-built content delivery network (CDN) that functions as an e-learning platform engineered to host and distribute educational videos, lessons, and tutoring.

The backend architecture utilizes AWS cloud services for database management, authorization, and server hosting. Videos are handled by CloudFront to provide seamless content delivery.

On the front end, Skillin features a React Native mobile app that enables students to explore courses, connect with tutors, and track learning progress. The platform integrates secure user authentication, dynamic course management, and real-time analytics to monitor engagement and optimize content delivery.

This project highlights expertise in full-stack architecture, cloud optimization for cost and performance, and crafting a seamless user experience tailored for both students and instructors.
`;

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Pressable image */}
        <Pressable
          onPress={() => setImageOpen(true)}
          style={styles.imagePressable}
        >
          <Image
            source={skillinImage}
            style={styles.image}
            resizeMode="contain"
            onError={(error) => console.log("Image error:", error.nativeEvent)}
            onLoad={() => console.log("Image loaded successfully")}
          />
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

      {/* Modal for enlarged image */}
      <PaperModal
        visible={imageOpen}
        onDismiss={() => setImageOpen(false)}
        title="Skillin"
      >
        <Image
          source={skillinImage}
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

  imagePressable: {
    width: "50%",
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
