import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Animated, { Value, spring, interpolate } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

const ACTIVE_COLOUR = "rgb(30, 30, 110)";
const INACTIVE_COLOUR = "rgba(30, 30, 110, 0.4)";

interface TabItemProps {
  iconName: keyof typeof FontAwesome.glyphMap;
  label: string;
  active: boolean;
  onPress: () => void;
}

const useSpring = (value: number): Value<number> => {
  const [animatedValue] = useState(new Value(value));

  const animate = useCallback(() => {
    spring(animatedValue, {
      toValue: value,
      mass: 1,
      damping: 18,
      stiffness: 300,
      overshootClamping: false,
      restSpeedThreshold: 0.1,
      restDisplacementThreshold: 0.1,
    }).start();
  }, [animatedValue, value]);

  useEffect(() => {
    animate();
  }, [animate]);

  return animatedValue;
};

const TabItem = ({ iconName, label, active, onPress }: TabItemProps) => {
  const [animatedPressValue] = useState(new Value(1));
  const animation = useSpring(active ? 1 : 0);

  const dotScale = animation;
  const labelOpacity = animation;

  const iconOpacity = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const labelTranslate = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  const iconTranslate = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const onPressIn = () => {
    spring(animatedPressValue, {
      toValue: 0.8,
      mass: 1,
      damping: 15,
      stiffness: 200,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    }).start();
  };

  const onPressOut = () => {
    spring(animatedPressValue, {
      toValue: 1,
      mass: 1,
      damping: 10,
      stiffness: 200,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: animatedPressValue }] },
        ]}
      >
        <Animated.View
          style={[
            styles.centered,
            {
              opacity: labelOpacity,
              transform: [{ translateY: labelTranslate }],
            },
          ]}
        >
          <Text style={styles.label}>{label}</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.centered,
            {
              opacity: iconOpacity,
              transform: [{ translateY: iconTranslate }],
            },
          ]}
        >
          <FontAwesome name={iconName} size={30} color={INACTIVE_COLOUR} />
        </Animated.View>

        <Animated.View
          style={[styles.dot, { transform: [{ scale: dotScale }] }]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    position: "absolute",
  },
  label: {
    color: ACTIVE_COLOUR,
    fontWeight: "600",
  },
  dot: {
    position: "absolute",
    bottom: 4,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: ACTIVE_COLOUR,
  },
});

export default TabItem;
