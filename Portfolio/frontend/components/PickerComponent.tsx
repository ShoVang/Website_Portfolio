import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: string[];
};

export default function PickerComponent({
  selectedValue,
  onValueChange,
  options,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select an option:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {options.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { marginBottom: 8 },
  picker: { borderWidth: 1, borderColor: "#ccc", backgroundColor: "#f0f0f0" },
});
