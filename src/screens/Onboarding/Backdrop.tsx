import React from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";

const backgrounds = ["#F7EDFA", "#FFEBCD", "#E0EEEE"];
const { width } = Dimensions.get("window");

interface BackdropProps {
  scrollX: Animated.Value;
}

const Backdrop = ({ scrollX }: BackdropProps) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: backgrounds.map((_, index) => index * width),
    outputRange: backgrounds.map((background) => background),
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

export default Backdrop;
