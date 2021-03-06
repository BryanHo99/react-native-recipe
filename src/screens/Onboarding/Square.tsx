import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  divide,
  interpolate,
  modulo,
  Value,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface SquareProps {
  scrollX: Animated.Node<number>;
}

const Square = ({ scrollX }: SquareProps) => {
  const square = modulo(divide(modulo(scrollX, width), new Value(width)), 1);

  const rotate = interpolate(square, {
    inputRange: [0, 0.5, 1],
    outputRange: ["-70deg", "-10deg", "-70deg"],
  });

  const translateX = interpolate(square, {
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
