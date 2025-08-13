import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Platform,
  Animated,
  Easing,
  PanResponder,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import { Text, Card, Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import PaperModal from "../components/PaperModal";
import { Colors } from "../styles/Colors";
import { TYPOGRAPHY } from "../styles/TYPOGRAPHY";
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
  { title: "Skillin", description: "CDN for Skillin" },
  { title: "Trading Bot", description: "Three trading bots for personal use" },
];

const SLOT_HEIGHT = 60;
const VISIBLE_ROWS = 3;
const slotsToScroll = 5;
const CARD_W = 120;
const CARD_H = 160;

export default function HomeScreen({ navigation }) {
  const { height: screenHeight, width: screenWidth } = useScreenDimensions();

  // Load your custom fonts with error handling
  // On web, we'll use a more lenient approach since expo-font can be problematic
  const [fontsLoaded, fontError] = useFonts({
    [TYPOGRAPHY.fontFamily
      .arcade]: require("../../assets/Fonts/Press_Start_2P/PressStart2P-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modern]: require("../../assets/Fonts/Orbitron/static/Orbitron-Regular.ttf"),
    [TYPOGRAPHY.fontFamily
      .modernBold]: require("../../assets/Fonts/Orbitron/static/Orbitron-Bold.ttf"),
  });

  // For web, we'll consider fonts "loaded" after a short delay to prevent blocking
  const [webFontsReady, setWebFontsReady] = useState(false);
  useEffect(() => {
    if (Platform.OS === "web") {
      // Try to load fonts via CSS on web as a fallback
      try {
        const style = document.createElement("style");
        style.textContent = `
          @font-face {
            font-family: 'PressStart2P';
            src: url('${require("../../assets/Fonts/Press_Start_2P/PressStart2P-Regular.ttf")}') format('truetype');
          }
          @font-face {
            font-family: 'Orbitron';
            src: url('${require("../../assets/Fonts/Orbitron/static/Orbitron-Regular.ttf")}') format('truetype');
          }
          @font-face {
            font-family: 'Orbitron-Bold';
            src: url('${require("../../assets/Fonts/Orbitron/static/Orbitron-Bold.ttf")}') format('truetype');
          }
        `;
        document.head.appendChild(style);
        console.log("Web: CSS font loading attempted");
      } catch (error) {
        console.warn("Web: CSS font loading failed:", error);
      }

      const timer = setTimeout(() => {
        setWebFontsReady(true);
      }, 1000); // Give fonts 1 second to load on web
      return () => clearTimeout(timer);
    }
  }, []);

  // Debug font loading
  useEffect(() => {
    if (fontError) {
      console.warn("Font loading error:", fontError);
    }
    if (fontsLoaded) {
      console.log("Fonts loaded successfully");
    }
    console.log("Font loading state:", { fontsLoaded, fontError });
  }, [fontsLoaded, fontError]);

  // If fonts fail to load, use system fonts as fallback
  const fontFamily = {
    arcade: fontsLoaded
      ? TYPOGRAPHY.fontFamily.arcade
      : Platform.OS === "ios"
      ? "Courier"
      : Platform.OS === "web"
      ? "monospace"
      : "monospace",
    modern: fontsLoaded
      ? TYPOGRAPHY.fontFamily.modern
      : Platform.OS === "ios"
      ? "Arial"
      : Platform.OS === "web"
      ? "sans-serif"
      : "sans-serif",
    modernBold: fontsLoaded
      ? TYPOGRAPHY.fontFamily.modernBold
      : Platform.OS === "ios"
      ? "Arial-Bold"
      : Platform.OS === "web"
      ? "sans-serif"
      : "sans-serif-medium",
  };

  // For web platform, always render the component even if fonts aren't loaded
  // Web fonts can take longer to load and we don't want to block rendering
  if (Platform.OS === "web") {
    // On web, just continue with fallback fonts if custom fonts aren't loaded yet
    console.log(
      "Web platform detected - rendering with fallback fonts if needed"
    );
    // On web, we'll consider fonts ready after the timeout or when they actually load
    if (!webFontsReady && !fontsLoaded) {
      console.log("Web: Waiting for fonts to be ready...");
    }
    // On web, always continue rendering - don't block for fonts
  } else {
    // On mobile, show loading indicator while fonts are loading
    if (!fontsLoaded && !fontError) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.yellow} />
          <Text
            style={[styles.loadingText, { fontFamily: fontFamily.modernBold }]}
          >
            Loading...
          </Text>
        </View>
      );
    }

    // Show error state if fonts fail to load
    if (fontError) {
      return (
        <View style={styles.loadingContainer}>
          <Text
            style={[
              styles.loadingText,
              { fontFamily: fontFamily.modernBold, color: Colors.primary },
            ]}
          >
            Font loading failed. Using system fonts.
          </Text>
          <Text
            style={[
              styles.loadingText,
              { fontFamily: fontFamily.modern, fontSize: 14, marginTop: 10 },
            ]}
          >
            The app will continue with limited styling.
          </Text>
        </View>
      );
    }
  }

  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [shuffledProjects, setShuffledProjects] = useState<
    typeof originalProjects
  >([]);
  const [selectedProject, setSelectedProject] = useState<
    (typeof originalProjects)[number] | null
  >(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const [didMount, setDidMount] = useState(false);
  useEffect(() => setDidMount(true), []);

  // ====== MEASUREMENT for true center gather ======
  const [gridWidth, setGridWidth] = useState(0);
  const rowYsRef = useRef<number[]>([0, 0]);
  const onRowLayout = (rowIdx: number) => (e: any) => {
    rowYsRef.current[rowIdx] = e.nativeEvent.layout.y;
  };
  // =================================================

  // ====== SHUFFLE ANIMATION STATE ======
  const cardAnims = useRef(
    Array.from({ length: 6 }, () => new Animated.Value(0))
  ).current;
  const [isShuffling, setIsShuffling] = useState(false);

  const [gatherOffsets, setGatherOffsets] = useState(
    Array.from({ length: 6 }, () => ({ dx: 0, dy: 0 }))
  );

  const getCardAnimStyle = (slotIndex: number) => {
    const v = cardAnims[slotIndex];
    const { dx, dy } = gatherOffsets[slotIndex] ?? { dx: 0, dy: 0 };

    const tx = v.interpolate({ inputRange: [0, 1], outputRange: [0, dx] });
    const ty = v.interpolate({ inputRange: [0, 1], outputRange: [0, dy] });
    const scale = v.interpolate({ inputRange: [0, 1], outputRange: [1, 0.95] });
    const rot = v.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "2deg"],
    });

    return {
      transform: [
        { translateX: tx },
        { translateY: ty },
        { scale },
        { rotate: rot },
      ],
    };
  };

  const computeGatherOffsets = () => {
    if (!gridWidth || rowYsRef.current[1] === undefined) {
      const approx = Array.from({ length: 6 }, (_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const dx = col === 0 ? 90 : col === 2 ? -90 : 0;
        const dy = row === 0 ? 80 : -80;
        return { dx, dy };
      });
      setGatherOffsets(approx);
      return;
    }

    const gapX = Math.max(0, (gridWidth - 3 * CARD_W) / 4);
    const colCenterX = (col: number) => gapX * (col + 1) + CARD_W * (col + 0.5);
    const targetCenterX = gridWidth / 2;

    const rowCenterY = (row: number) => rowYsRef.current[row] + CARD_H / 2;
    const targetCenterY = (rowCenterY(0) + rowCenterY(1)) / 2;

    const offsets = Array.from({ length: 6 }, (_, i) => {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const dx = targetCenterX - colCenterX(col);
      const dy = targetCenterY - rowCenterY(row);
      return { dx, dy };
    });

    setGatherOffsets(offsets);
  };

  const shuffleArray = <T,>(arr: T[]) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffleWithAnimation = () => {
    if (isShuffling) return;
    setIsShuffling(true);

    computeGatherOffsets();

    Animated.stagger(
      50,
      cardAnims.map((v) =>
        Animated.timing(v, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        })
      )
    ).start(() => {
      const newOrder = shuffleArray(originalProjects);
      setShuffledProjects(newOrder);
      setFlippedCards(Array(newOrder.length).fill(false));
      setSelectedProject(null);

      Animated.stagger(
        60,
        cardAnims
          .map((v) =>
            Animated.timing(v, {
              toValue: 0,
              duration: 340,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            })
          )
          .sort(() => 0.5 - Math.random())
      ).start(() => setIsShuffling(false));
    });
  };
  // =====================================

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

  const [reelGrid, setReelGrid] = useState<string[][]>([
    ["Automation", "Cloud Computing", "UI/UX Design"],
    ["Website Building", "Database Design", "DevOps"],
    ["App Development", "AI Integration", "Cybersecurity"],
  ]);
  const [spinning, setSpinning] = useState(false);
  const [showFinalGrid, setShowFinalGrid] = useState(false);
  const [reelAnimations] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]);

  const getLoopedSkillStack = () => {
    const totalSlots = slotsToScroll + VISIBLE_ROWS + 2;
    const stack: string[] = [];
    while (stack.length < totalSlots) {
      const shuffled = [...skills].sort(() => 0.5 - Math.random());
      stack.push(...shuffled);
    }
    return stack.slice(0, totalSlots);
  };

  const [rollingStacks, setRollingStacks] = useState<string[][]>([
    getLoopedSkillStack(),
    getLoopedSkillStack(),
    getLoopedSkillStack(),
  ]);

  const spinReels = () => {
    if (spinning) return;
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

  // ---------- Lever (Pull-to-Spin) ----------
  const MAX_PULL = 110;
  const TRIGGER_PULL = 70;
  const leverY = useRef(new Animated.Value(0)).current;
  const [dragging, setDragging] = useState(false);

  const leverKnobRotate = leverY.interpolate({
    inputRange: [0, MAX_PULL],
    outputRange: ["0deg", "25deg"],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !spinning,
      onMoveShouldSetPanResponder: (_, g) =>
        !spinning && Math.abs(g.dy) > Math.abs(g.dx) && Math.abs(g.dy) > 4,
      onPanResponderGrant: () => setDragging(true),
      onPanResponderMove: (_, gesture) => {
        if (spinning) return;
        const pull = Math.max(0, Math.min(MAX_PULL, gesture.dy));
        leverY.setValue(pull);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_, gesture) => {
        setDragging(false);
        const pulledEnough = gesture.dy >= TRIGGER_PULL;
        if (pulledEnough && !spinning) {
          Animated.sequence([
            Animated.timing(leverY, {
              toValue: MAX_PULL,
              duration: 80,
              useNativeDriver: true,
            }),
            Animated.spring(leverY, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 10,
            }),
          ]).start();
          spinReels();
        } else {
          Animated.spring(leverY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 8,
          }).start();
        }
      },
    })
  ).current;
  // -----------------------------------------

  useEffect(() => {
    // initial populate
    shuffleCards();
  }, []);

  const handleCardPress = (index: number) => {
    if (isShuffling) return;
    const updatedFlipped = [...flippedCards];
    updatedFlipped[index] = true;
    setFlippedCards(updatedFlipped);
    setSelectedProject(shuffledProjects[index]);
    setModalVisible(true);
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
    <ScrollView style={styles.container} scrollEnabled={!dragging}>
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Image source={icons.chip} style={styles.iconImage} />
          <View style={styles.bannerTextContainer}>
            <Text style={[styles.neonText, { fontFamily: fontFamily.arcade }]}>
              ROLL THE DICE
            </Text>

            <Text style={[styles.neonText, { fontFamily: fontFamily.arcade }]}>
              HIRE ME
            </Text>
          </View>
          <Image source={icons.dice} style={styles.iconImage} />
        </View>
      </View>

      <View style={styles.tapHint}>
        <Text
          style={[styles.tapHintText, { fontFamily: fontFamily.modernBold }]}
        >
          Tap a card to reveal
        </Text>
      </View>

      <View
        style={styles.cardGrid}
        onLayout={(e) => setGridWidth(e.nativeEvent.layout.width)}
      >
        {[0, 1].map((row) => (
          <View style={styles.cardRow} key={row} onLayout={onRowLayout(row)}>
            {shuffledProjects
              .slice(row * 3, row * 3 + 3)
              .map((project, index) => {
                const globalIndex = row * 3 + index;
                return (
                  <Pressable
                    key={globalIndex}
                    onPress={
                      !isShuffling
                        ? () => handleCardPress(globalIndex)
                        : undefined
                    }
                    style={styles.cardWrapper}
                  >
                    <Animated.View
                      style={[styles.flipCard, getCardAnimStyle(globalIndex)]}
                    >
                      <Animatable.View
                        animation={!didMount ? "bounceIn" : undefined}
                        delay={!didMount ? globalIndex * 100 : 0}
                        duration={600}
                      >
                        {flippedCards[globalIndex] ? (
                          <Card style={styles.projectCard}>
                            <Card.Content>
                              <Text
                                style={[
                                  styles.projectTitle,
                                  { fontFamily: fontFamily.modernBold },
                                ]}
                              >
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
                    </Animated.View>
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
        onPress={shuffleWithAnimation}
        disabled={isShuffling}
        labelStyle={{ fontFamily: fontFamily.modernBold }}
        style={{ marginTop: 10, marginBottom: 10, alignSelf: "center" }}
      >
        {isShuffling ? "Shuffling..." : "Shuffle Cards"}
      </Button>

      <Card mode="outlined" style={styles.skillCard}>
        <Card.Title
          title="Skills Slot Machine"
          titleStyle={[styles.neonText, { fontFamily: fontFamily.arcade }]}
        />
        <Card.Content>
          <View style={styles.slotRow}>
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
                          key={skill + rowIdx + String(spinning)}
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

            <Animated.View
              style={styles.leverContainer}
              {...panResponder.panHandlers}
            >
              <View style={styles.leverTrack} />
              <Animated.View
                style={[
                  styles.leverHandle,
                  { transform: [{ translateY: leverY }] },
                ]}
              >
                <Animated.View
                  style={[
                    styles.leverKnob,
                    { transform: [{ rotate: leverKnobRotate }] },
                  ]}
                />
                <Text
                  style={[
                    styles.leverLabel,
                    Platform.OS === "web" ? { userSelect: "none" } : null,
                  ]}
                  selectable={false}
                  pointerEvents="none"
                >
                  PULL
                </Text>
              </Animated.View>
            </Animated.View>
          </View>
        </Card.Content>
      </Card>

      <PaperModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        title={selectedProject?.title}
        height="50%"
        width="50%"
      >
        {selectedProject && (
          <>
            <Text
              style={[styles.modalTitle, { fontFamily: fontFamily.arcade }]}
            >
              {selectedProject.title}
            </Text>
            <Text
              style={[
                styles.modalDescription,
                { fontFamily: fontFamily.modern },
              ]}
            >
              {selectedProject.description}
            </Text>
            <Button
              mode="contained"
              style={[
                styles.closeButton,
                { backgroundColor: Colors.secondary },
                { marginTop: 12 },
              ]}
              textColor={Colors.black}
              labelStyle={{ fontFamily: fontFamily.modernBold }}
              onPress={() => {
                setModalVisible(false);
                const { title } = selectedProject;
                if (title === "Portfolio Website") {
                  navigation.navigate("ProjectDetailsPortfolioWebsite");
                } else if (title === "Expense Tracker") {
                  navigation.navigate("ExpenseTracker");
                } else if (title === "AI Alert System") {
                  navigation.navigate("AIAlertSystem");
                } else if (title === "CITS Ticket System") {
                  navigation.navigate("CITSTicketSystem");
                } else if (title === "Skillin") {
                  navigation.navigate("Skillin");
                } else if (title === "Trading Bot") {
                  navigation.navigate("TradingBots");
                } else {
                  navigation.navigate("ProjectDetail", selectedProject);
                }
              }}
            >
              More Details
            </Button>
            <Button
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={[styles.closeButton, { backgroundColor: Colors.primary }]}
              labelStyle={{
                color: Colors.white,
                fontFamily: fontFamily.modernBold,
              }}
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
  bannerTextContainer: { justifyContent: "center", alignItems: "center" },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginHorizontal: 12,
  },
  neonText: {
    color: Colors.yellow,
    fontSize: 28,
    textShadowColor: Colors.neonBlue,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    letterSpacing: 2,
    fontFamily: TYPOGRAPHY.fontFamily.arcade, // Press Start 2P
    textAlign: "center",
  },
  tapHint: { alignItems: "center", marginBottom: 8 },
  tapHintText: {
    fontSize: 14,
    fontFamily: TYPOGRAPHY.fontFamily.modernBold, // Orbitron Bold
    color: Colors.yellow,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  cardGrid: { marginBottom: 20 },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  cardWrapper: { width: CARD_W, alignItems: "center" },
  flipCard: { width: CARD_W, height: CARD_H },
  projectCard: {
    width: CARD_W,
    height: CARD_H,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  projectTitle: {
    fontSize: 16,
    fontFamily: TYPOGRAPHY.fontFamily.modernBold, // Orbitron Bold
    textAlign: "center",
    color: Colors.white,
  },
  cardBack: {
    width: CARD_W,
    height: CARD_H,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cardBackImage: { width: 60, height: 60, tintColor: Colors.lightGray },

  modalTitle: {
    fontSize: 40,
    fontFamily: TYPOGRAPHY.fontFamily.arcade, // Press Start 2P
    marginBottom: 10,
    color: Colors.primary,
  },
  modalDescription: {
    fontSize: 20,
    fontFamily: TYPOGRAPHY.fontFamily.modern, // Orbitron Regular
    color: Colors.black,
  },

  skillCard: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.yellow,
    borderWidth: 2,
    shadowColor: Colors.yellow,
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  // Slot machine layout row (reels + lever)
  slotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
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
    fontFamily: TYPOGRAPHY.fontFamily.modernBold, // Orbitron Bold
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

  // Lever styles
  leverContainer: {
    width: 70,
    height: 220,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    paddingTop: 6,
  },
  leverTrack: {
    position: "absolute",
    top: 16,
    bottom: 16,
    width: 6,
    borderRadius: 3,
    backgroundColor: Colors.yellow,
  },
  leverHandle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.yellow,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  leverKnob: {
    width: 24,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.yellow,
    marginBottom: 4,
  },
  leverLabel: {
    fontSize: 10,
    fontFamily: TYPOGRAPHY.fontFamily.modernBold, // Orbitron Bold
    color: Colors.yellow,
    letterSpacing: 1,
  },

  closeButton: { marginTop: 20, alignSelf: "center" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.yellow,
  },
  debugInfo: {
    backgroundColor: Colors.black,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
