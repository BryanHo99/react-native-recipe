import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

interface SquareProps {
  scrollX: Animated.Value;
}

const Square = ({ scrollX }: SquareProps) => {
  const square = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = square.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["-70deg", "-10deg", "-70deg"],
  });

  const translateX = square.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.View
      style={[styles.square, { transform: [{ rotate }, { translateX }] }]}
    />
  );
};

const styles = StyleSheet.create({
  square: {
    width: height * 2,
    height,
    backgroundColor: "#FFF",
    borderRadius: 86,
    position: "absolute",
    top: -height,
    left: -height * 0.75,
  },
});

export default Square;
