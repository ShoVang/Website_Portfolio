import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../styles/Colors";
import useScreenDimensions from "../../hooks/useScreenDimensions";

export default function SignupScreen() {
  const navigation = useNavigation();
  const { width, height } = useScreenDimensions();
  const styles = getStyles(width, height);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Sign up with:", email, password);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Create an Account
      </Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSignup}>
        Sign Up
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

function getStyles(width: number, height: number) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: Colors.background,
    },
    title: {
      marginBottom: height * 0.04,
      textAlign: "center",
      color: Colors.text,
    },
    input: {
      marginBottom: 16,
    },
    link: {
      marginTop: 20,
      color: Colors.primary,
      textAlign: "center",
    },
  });
}
