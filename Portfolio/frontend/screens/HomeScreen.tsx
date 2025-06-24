import React from "react";
import { View, StyleSheet, Image, Platform, ScrollView } from "react-native";
import { Colors } from "../styles/Colors";
import { Text, Banner, Card } from "react-native-paper";

export default function HomeScreen() {
  const icons = {
    dice: require("../../assets/icons8-dice-50.png"),
    chip: require("../../assets/casino-chip.png"),
    cards: require("../../assets/icons8-cards-50.png"),
  };

  const projects = [
    {
      title: "Portfolio Website",
      description: "Built with React and hosted on Firebase.",
    },
    {
      title: "Expense Tracker",
      description: "Upload Excel, analyze data, track budget.",
    },
    {
      title: "AI Alert System",
      description: "Sensor anomaly detection with Azure + Grafana.",
    },
  ];

  const skills = [
    "React Native",
    "Firebase",
    "MongoDB",
    "Node.js",
    "Python",
    "Automation",
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <Banner visible={true} actions={[]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Image
            source={icons.chip}
            style={[styles.iconImage, { marginRight: 12 }]}
            resizeMode="contain"
          />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.neonText}>ROLL THE DICE</Text>
            <Text style={styles.neonText}>HIRE ME</Text>
          </View>
          <Image
            source={icons.dice}
            style={[styles.iconImage, { marginLeft: 12 }]}
            resizeMode="contain"
          />
        </View>
      </Banner>

      {/* My Work */}
      <Text style={styles.sectionTitle}>My Work</Text>
      {projects.map((project, index) => (
        <Card key={index} style={styles.card}>
          <Card.Title title={project.title} />
          <Card.Content>
            <Text>{project.description}</Text>
          </Card.Content>
        </Card>
      ))}

      {/* Skills */}
      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={styles.skillContainer}>
        {skills.map((skill, index) => (
          <Card key={index} style={styles.skillCard}>
            <Card.Content>
              <Text style={{ textAlign: "center" }}>{skill}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  banner: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    marginTop: -2,
    marginBottom: 20,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  bannerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  neonText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 28,
    textShadowColor: "#FFB300",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    marginBottom: 0,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
  card: {
    marginBottom: 12,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillCard: {
    width: "30%",
    marginBottom: 10,
    alignItems: "center",
  },
});
