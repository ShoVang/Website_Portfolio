import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Modal, Portal } from "react-native-paper";
import useScreenDimensions from "../hooks/useScreenDimensions";

type PaperModalProps = {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  height?: string | number; // '75%' or 400
  width?: string | number;
};

export default function PaperModal({
  visible,
  onDismiss,
  children,
  height = "75%",
  width = "85%",
}: PaperModalProps) {
  const { height: screenHeight, width: screenWidth } = useScreenDimensions();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.container,
          {
            height:
              typeof height === "string"
                ? screenHeight * (parseFloat(height) / 100)
                : height,
            width:
              typeof width === "string"
                ? screenWidth * (parseFloat(width) / 100)
                : width,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    alignSelf: "center",
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16, // optional: supported in newer RN versions
    paddingBottom: 12,
  },
});
