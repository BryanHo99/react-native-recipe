import React, { ReactNode } from "react";
import { View, Animated, StyleSheet, StyleProp, ViewStyle } from "react-native";

export interface DiagonalTransitionProps {
  style?: StyleProp<ViewStyle>;
  visibility: Animated.AnimatedInterpolation;
  coverColor?: string;
  children: ReactNode;
}

const DiagonalTransition = ({
  style,
  visibility,
  coverColor = "white",
  children,
}: DiagonalTransitionProps) => {
  const translateY = visibility.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 0],
  });

  return (
    <View style={[styles.container, style]}>
      {children}
      <Animated.View
        style={[styles.coverContainer, { transform: [{ translateY }] }]}
      >
        <View style={[styles.cover, { backgroundColor: coverColor }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  coverContainer: {
    position: "absolute",
    top: "120%",
    width: "100%",
  },
  cover: {
    height: 40,
    transform: [{ skewY: "10deg" }],
  },
});

export default DiagonalTransition;
