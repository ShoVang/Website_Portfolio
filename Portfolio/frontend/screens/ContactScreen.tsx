import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Text, Button, Portal, Modal } from "react-native-paper";
import { useFonts } from "expo-font";

import { Colors } from "../styles/Colors";
import { TYPOGRAPHY } from "../styles/TYPOGRAPHY";
import emailjs from "@emailjs/browser";

export default function ContactScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [fontsLoaded] = useFonts({
    [TYPOGRAPHY.fontFamily
      .arcade]: require("../../assets/Fonts/Press_Start_2P/PressStart2P-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modern]: require("../../assets/Fonts/Orbitron/static/Orbitron-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modernBold]: require("../../assets/Fonts/Orbitron/static/Orbitron-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setModalMessage("Please fill out all fields.");
      setModalVisible(true);
      return;
    }

    setLoading(true);

    const templateParams = {
      to_name: "SSV Designers",
      from_name: name,
      message: message,
      reply_to: email,
    };

    emailjs
      .send(
        "service_a0p3xpk",
        "template_0mut4y7",
        templateParams,
        "bJfN3-EWhmjF9bba0"
      )
      .then(() => {
        setLoading(false);
        setModalMessage("Message Sent! Thank you for reaching out.");
        setModalVisible(true);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch(() => {
        setLoading(false);
        setModalMessage("Message Failed. Please try again later.");
        setModalVisible(true);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>GET IN TOUCH</Text>
        </View>

        <Text style={styles.introText}>
          If you'd like to work together or have any questions, please fill out
          the form below. I’ll get back to you as soon as possible!
        </Text>

        <TextInput
          placeholder="Your Name"
          placeholderTextColor={Colors.lightGray}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Your Email"
          placeholderTextColor={Colors.lightGray}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Your Message"
          placeholderTextColor={Colors.lightGray}
          value={message}
          onChangeText={setMessage}
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={6}
        />

        <Button
          mode="contained"
          buttonColor={Colors.primary}
          textColor={Colors.yellow}
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={{ fontFamily: TYPOGRAPHY.fontFamily.modernBold }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </KeyboardAvoidingView>

      {/* Modal for messages */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalText}>{modalMessage}</Text>
          <Button
            mode="contained"
            onPress={() => setModalVisible(false)}
            style={styles.modalButton}
            labelStyle={{ fontFamily: TYPOGRAPHY.fontFamily.modernBold }}
          >
            OK
          </Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: Colors.secondary,
  },
  banner: {
    backgroundColor: Colors.primary,
    paddingVertical: 25,
    marginBottom: 20,
    alignItems: "center",
  },
  bannerText: {
    color: Colors.yellow,
    fontSize: 22,
    fontFamily: TYPOGRAPHY.fontFamily.arcade,
    textShadowColor: Colors.neonBlue,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  introText: {
    color: Colors.black,
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: TYPOGRAPHY.fontFamily.modern,
  },
  input: {
    backgroundColor: Colors.cardBackground,
    color: Colors.white,
    borderColor: Colors.background,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    fontFamily: TYPOGRAPHY.fontFamily.modern,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 8,
  },
  modalContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalText: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: TYPOGRAPHY.fontFamily.modernBold,
  },
  modalButton: {
    alignSelf: "center",
  },
});
