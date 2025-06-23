import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Text,
  Portal,
  Modal,
  RadioButton,
  Card,
} from "react-native-paper";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Apple");

  const options = ["Apple", "Banana", "Cherry"];

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => setModalVisible(true)}>
        Open Modal
      </Button>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text variant="titleMedium" style={styles.modalText}>
            This is inside the modal!
          </Text>
        </Modal>
      </Portal>

      <Card style={styles.card}>
        <Card.Title title="Choose a fruit" />
        <Card.Content>
          <RadioButton.Group
            onValueChange={(value) => setSelectedItem(value)}
            value={selectedItem}
          >
            {options.map((option) => (
              <RadioButton.Item key={option} label={option} value={option} />
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Text variant="bodyLarge" style={styles.selectedText}>
        Selected: {selectedItem}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  modalText: {
    textAlign: "center",
  },
  card: {
    marginTop: 30,
  },
  selectedText: {
    marginTop: 20,
    fontWeight: "bold",
  },
});
