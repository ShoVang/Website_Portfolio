import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { Colors } from "../styles/Colors";

export default function ContactScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Please fill out all fields.");
      return;
    }
    // Handle form submission here (e.g., send to server or email API)
    Alert.alert("Message sent!", "Thank you for reaching out.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}>
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.neonText}>Get in Touch</Text>
            </View>
          </View>
        </View>

        <Text style={styles.introText}>
          If you'd like to work together or have any questions, please feel free
          to reach out by filling out the form below. I’ll get back to you as
          soon as possible!
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
        >
          Send Message
        </Button>
      </KeyboardAvoidingView>
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
    paddingVertical: 20,
    marginBottom: 20,
    width: "100%",
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  neonText: {
    color: Colors.yellow,
    fontWeight: "bold",
    fontSize: 28,
    textShadowColor: Colors.neonBlue,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    letterSpacing: 2,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    textAlign: "center",
  },
  introText: {
    color: Colors.black,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: Colors.cardBackground,
    color: Colors.white,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 10,
    alignSelf: "center",
  },
});
