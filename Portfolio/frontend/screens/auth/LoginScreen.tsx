import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useAuth } from "../../hooks/AuthContext";
import useScreenDimensions from "../../hooks/useScreenDimensions";
import { Colors } from "../../styles/Colors";

export default function LoginScreen() {
  const { login } = useAuth();
  const { width, height } = useScreenDimensions();
  const styles = getStyles(width, height);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Login
      </Text>

      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={login}>
        Log In
      </Button>
    </View>
  );
}

function getStyles(width: number, height: number) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: Colors.background,
    },
    title: {
      marginBottom: height * 0.03,
      textAlign: "center",
      color: Colors.text,
    },
    input: {
      marginBottom: 15,
    },
  });
}
