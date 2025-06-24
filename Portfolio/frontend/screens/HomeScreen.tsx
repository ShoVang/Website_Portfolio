import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { Colors } from "../styles/Colors";
import { Text, Card, Modal, Portal, Button, Banner } from "react-native-paper";
import * as Animatable from "react-native-animatable";

const icons = {
  back: require("../../assets/icons8-cards-50.png"),
  dice: require("../../assets/icons8-dice-50.png"),
  chip: require("../../assets/casino-chip.png"),
};

const originalProjects = [
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

export default function HomeScreen() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [shuffledProjects, setShuffledProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardPress = (index) => {
    const updatedFlipped = [...flippedCards];
    updatedFlipped[index] = true;
    setFlippedCards(updatedFlipped);
    setSelectedProject(shuffledProjects[index]);
    setModalVisible(true);
  };

  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffleCards = () => {
    const newOrder = shuffleArray(originalProjects);
    setShuffledProjects(newOrder);
    setFlippedCards(Array(newOrder.length).fill(false));
    setSelectedProject(null);
    setModalVisible(false);
    setShuffleKey((prev) => prev + 1);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Themed Banner */}
      <View style={styles.banner}>
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
      </View>

      {/* Projects */}
      <Text style={styles.sectionTitle}>My Projects</Text>
      <View style={styles.cardGrid}>
        {shuffledProjects.map((project, index) => (
          <Pressable key={index} onPress={() => handleCardPress(index)}>
            <Animatable.View
              animation="bounceIn"
              delay={index * 100}
              duration={600}
              key={`${shuffleKey}-${index}`}
              style={styles.flipCard}
            >
              {flippedCards[index] ? (
                <Card style={styles.projectCard}>
                  <Card.Content>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                  </Card.Content>
                </Card>
              ) : (
                <View style={styles.cardBack}>
                  <Image source={icons.back} style={styles.cardBackImage} />
                </View>
              )}
            </Animatable.View>
          </Pressable>
        ))}
      </View>

      <Button
        mode="contained"
        buttonColor={Colors.yellow}
        textColor={Colors.black}
        onPress={shuffleCards}
        style={{ marginTop: 10, alignSelf: "center" }}
      >
        Shuffle Cards
      </Button>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          {selectedProject && (
            <>
              <Text style={styles.modalTitle}>{selectedProject.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedProject.description}
              </Text>
              <Button
                mode="contained"
                buttonColor={Colors.primary}
                textColor={Colors.white}
                onPress={() => setModalVisible(false)}
                style={{ marginTop: 20 }}
              >
                Close
              </Button>
            </>
          )}
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
    paddingVertical: 20,
    marginBottom: 20,
    width: "100%",
  },

  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // allow the row to stretch and center
  },

  bannerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1, // prevents text from being forced off screen
  },

  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginHorizontal: 12, // apply margin to both sides
  },
  neonText: {
    color: Colors.yellow,
    fontWeight: "bold",
    fontSize: 28,
    textShadowColor: "#FFB300",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primary,
    textAlign: "center",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  flipCard: {
    marginBottom: 20,
  },
  projectCard: {
    width: 120,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
  },
  cardBack: {
    width: 120,
    height: 160,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cardBackImage: {
    width: 60,
    height: 60,
    tintColor: Colors.lightGray,
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 24,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primary,
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.text,
  },
});
