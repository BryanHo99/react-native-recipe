import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps {
  onPress: () => void;
  label: string;
  color: string;
  backgroundColor: string;
}

const Button = ({ onPress, label, color, backgroundColor }: ButtonProps) => {
  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text style={{ color }}>{label}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
