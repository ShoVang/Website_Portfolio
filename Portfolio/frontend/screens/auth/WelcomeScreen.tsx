import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/AuthNavigator";
import { Colors } from "../../styles/Colors";
import useScreenDimensions from "../../hooks/useScreenDimensions";

type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function WelcomeScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { width, height } = useScreenDimensions();
  const styles = getStyles(width, height);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to the App
      </Text>
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Log In
      </Button>
      <View style={{ height: 10 }} />
      <Button mode="outlined" onPress={() => navigation.navigate("Signup")}>
        Sign Up
      </Button>
    </View>
  );
}

function getStyles(width: number, height: number) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: Colors.background,
    },
    title: {
      marginBottom: height * 0.04,
      color: Colors.text,
      textAlign: "center",
    },
  });
}
