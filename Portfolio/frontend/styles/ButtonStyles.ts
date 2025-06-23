import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { SPACINGS } from "./SPACINGS";
import { TYPOGRAPHY } from "./TYPOGRAPHY";

export const ButtonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: SPACINGS.medium,
    paddingHorizontal: SPACINGS.large,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: TYPOGRAPHY.fontSize.medium,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  secondaryButton: {
    backgroundColor: Colors.lightGray,
    paddingVertical: SPACINGS.medium,
    paddingHorizontal: SPACINGS.large,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.text,
    fontSize: TYPOGRAPHY.fontSize.medium,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
});
