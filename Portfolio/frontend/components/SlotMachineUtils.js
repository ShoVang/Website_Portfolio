// components/SlotMachineUtils.js
import { Animated, Easing } from "react-native";

export const SLOT_HEIGHT = 60;
export const VISIBLE_ROWS = 3;
export const slotsToScroll = 5;

export const getLoopedSkillStack = (skills) => {
  const totalSlots = slotsToScroll + VISIBLE_ROWS + 2;
  const stack = [];
  while (stack.length < totalSlots) {
    const shuffled = [...skills].sort(() => 0.5 - Math.random());
    stack.push(...shuffled);
  }
  return stack.slice(0, totalSlots);
};

export const spinReels = ({
  skills,
  setRollingStacks,
  reelAnimations,
  setReelGrid,
  setShowFinalGrid,
  setSpinning,
}) => {
  setSpinning(true);
  setShowFinalGrid(false);

  const newStacks = [
    getLoopedSkillStack(skills),
    getLoopedSkillStack(skills),
    getLoopedSkillStack(skills),
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
