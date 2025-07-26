import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { Text, Card, Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import PaperModal from "../components/PaperModal";
import { Colors } from "../styles/Colors";
import useScreenDimensions from "../hooks/useScreenDimensions";

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
  {
    title: "CITS Ticket System",
    description: "Ticket management system for IT company.",
  },
  {
    title: "Skillin",
    description: "CDN for Skillin",
  },
  {
    title: "Trading Bot",
    description: "Three trading bots for personal use",
  },
];

const SLOT_HEIGHT = 60;
const VISIBLE_ROWS = 3;
const slotsToScroll = 5;

export default function HomeScreen({ navigation }) {
  const {
    height: screenHeight,
    width: screenWidth,
    isLandscape,
  } = useScreenDimensions();

  const [flippedCards, setFlippedCards] = useState([]);
  const [shuffledProjects, setShuffledProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const skills = [
    "Automation",
    "Website Building",
    "App Development",
    "Cloud Computing",
    "Database Design",
    "AI Integration",
    "UI/UX Design",
    "DevOps",
    "Cybersecurity",
    "Cloud Services",
  ];

  const [reelGrid, setReelGrid] = useState([
    ["Automation", "Cloud Computing", "UI/UX Design"],
    ["Website Building", "Database Design", "DevOps"],
    ["App Development", "AI Integration", "Cybersecurity"],
  ]);
  const [spinning, setSpinning] = useState(false);
  const [showFinalGrid, setShowFinalGrid] = useState(false);
  const [reelAnimations, setReelAnimations] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]);

  const getLoopedSkillStack = () => {
    const totalSlots = slotsToScroll + VISIBLE_ROWS + 2;
    const stack = [];
    while (stack.length < totalSlots) {
      const shuffled = [...skills].sort(() => 0.5 - Math.random());
      stack.push(...shuffled);
    }
    return stack.slice(0, totalSlots);
  };

  const [rollingStacks, setRollingStacks] = useState([
    getLoopedSkillStack(),
    getLoopedSkillStack(),
    getLoopedSkillStack(),
  ]);

  const spinReels = () => {
    setSpinning(true);
    setShowFinalGrid(false);
    const newStacks = [
      getLoopedSkillStack(),
      getLoopedSkillStack(),
      getLoopedSkillStack(),
    ];
    setRollingStacks(newStacks);
    reelAnimations.forEach((anim) => anim.setValue(0));

    Animated.stagger(
      180,
      [0, 1, 2].map((colIdx) =>
        Animated.timing(reelAnimations[colIdx], {
          toValue: -slotsToScroll * SLOT_HEIGHT,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        })
      )
    ).start(() => {
      const newGrid = newStacks.map((stack) =>
        stack.slice(slotsToScroll, slotsToScroll + VISIBLE_ROWS)
      );
      setReelGrid(newGrid);
      setShowFinalGrid(true);
      setSpinning(false);
    });
  };

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
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Image source={icons.chip} style={styles.iconImage} />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.neonText}>ROLL THE DICE</Text>
            <Text style={styles.neonText}>HIRE ME</Text>
          </View>
          <Image source={icons.dice} style={styles.iconImage} />
        </View>
      </View>

      <View style={styles.cardGrid}>
        {[0, 1].map((row) => (
          <View style={styles.cardRow} key={row}>
            {shuffledProjects
              .slice(row * 3, row * 3 + 3)
              .map((project, index) => {
                const globalIndex = row * 3 + index;
                return (
                  <Pressable
                    key={globalIndex}
                    onPress={() => handleCardPress(globalIndex)}
                    style={styles.cardWrapper}
                  >
                    <Animatable.View
                      animation="bounceIn"
                      delay={globalIndex * 100}
                      duration={600}
                      key={`${shuffleKey}-${globalIndex}`}
                      style={styles.flipCard}
                    >
                      {flippedCards[globalIndex] ? (
                        <Card style={styles.projectCard}>
                          <Card.Content>
                            <Text style={styles.projectTitle}>
                              {project.title}
                            </Text>
                          </Card.Content>
                        </Card>
                      ) : (
                        <View style={styles.cardBack}>
                          <Image
                            source={icons.back}
                            style={styles.cardBackImage}
                          />
                        </View>
                      )}
                    </Animatable.View>
                  </Pressable>
                );
              })}
          </View>
        ))}
      </View>

      <Button
        mode="contained"
        buttonColor={Colors.primary}
        textColor={Colors.yellow}
        onPress={shuffleCards}
        style={{ marginTop: 30, alignSelf: "center" }}
      >
        Shuffle Cards
      </Button>

      <Card mode="outlined" style={styles.skillCard}>
        <Card.Title title="Skills Machine" titleStyle={styles.neonText} />
        <Card.Content>
          <View style={styles.reelGrid}>
            {[0, 1, 2].map((colIdx) => (
              <View key={colIdx} style={styles.reelColumn}>
                {showFinalGrid ? (
                  Array.from({ length: VISIBLE_ROWS }).map((_, rowIdx) => (
                    <View key={rowIdx} style={styles.reelTextWrapper}>
                      <Text style={styles.reelText}>
                        {reelGrid[colIdx]?.[rowIdx] ?? " "}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Animated.View
                    style={{
                      transform: [{ translateY: reelAnimations[colIdx] }],
                    }}
                  >
                    {rollingStacks[colIdx].map((skill, rowIdx) => (
                      <View
                        key={skill + rowIdx + spinning}
                        style={styles.reelTextWrapper}
                      >
                        <Text style={styles.reelText}>{skill}</Text>
                      </View>
                    ))}
                  </Animated.View>
                )}
              </View>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={spinReels}
            buttonColor={Colors.primary}
            textColor={Colors.yellow}
            disabled={spinning}
            style={{ marginTop: 20 }}
          >
            {spinning ? "Spinning..." : "Spin"}
          </Button>
        </Card.Content>
      </Card>

      <PaperModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        title={selectedProject?.title}
        height="60%"
        width="90%"
      >
        {selectedProject && (
          <>
            <Text style={styles.modalTitle}>{selectedProject.title}</Text>
            <Text style={styles.modalDescription}>
              {selectedProject.description}
            </Text>
            <Button
              mode="contained"
              buttonColor={Colors.neonBlue}
              textColor={Colors.black}
              onPress={() => {
                setModalVisible(false);
                const { title } = selectedProject;

                if (title === "Portfolio Website") {
                  navigation.navigate("ProjectDetailsPortfolioWebsite");
                } else if (title === "Expense Tracker") {
                  navigation.navigate("ExpenseTracker");
                } else if (title === "AI Alert System") {
                  navigation.navigate("AIAlertSystem");
                } else {
                  navigation.navigate("ProjectDetail", selectedProject);
                }
              }}
              style={{ marginTop: 12 }}
            >
              More Details
            </Button>
            <Button
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={[styles.closeButton, { backgroundColor: Colors.primary }]}
              labelStyle={{ color: Colors.white }}
            >
              Close
            </Button>
          </>
        )}
      </PaperModal>
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
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginHorizontal: 12,
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
  cardGrid: {
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  cardWrapper: {
    width: 120,
    alignItems: "center",
  },
  flipCard: {
    width: 120,
    height: 160,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primary,
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.black,
  },
  skillCard: {
    marginHorizontal: 20,
    marginTop: 40,
    paddingBottom: 20,
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.yellow,
    borderWidth: 2,
    shadowColor: Colors.yellow,
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  reelGrid: {
    marginTop: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  reelColumn: {
    width: 200,
    height: 180,
    overflow: "hidden",
    marginHorizontal: 6,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  reelTextWrapper: {
    height: SLOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  reelText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.yellow,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    minWidth: 200,
    textAlign: "center",
    padding: 12,
    borderWidth: 2,
    textShadowColor: Colors.yellow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    overflow: "hidden",
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
  },
});
