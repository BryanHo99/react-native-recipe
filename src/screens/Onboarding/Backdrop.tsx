import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, { interpolateColors } from "react-native-reanimated";

const backgrounds = ["#F7EDFA", "#FFEBCD", "#E0EEEE"];
const { width } = Dimensions.get("window");

interface BackdropProps {
  scrollX: Animated.Node<number>;
}

const Backdrop = ({ scrollX }: BackdropProps) => {
  const backgroundColor = interpolateColors(scrollX, {
    inputRange: backgrounds.map((_, index) => index * width),
    outputColorRange: backgrounds.map((background) => background),
  }) as never;

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

export default Backdrop;
