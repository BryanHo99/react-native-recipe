import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import DiagonalTransition from "./DiagonalTransition";

const ACTIVE_COLOUR = "rgb(30, 30, 110)";
const INACTIVE_COLOUR = "rgba(30, 30, 110, 0.4)";

interface TabItemProps {
  style?: StyleProp<ViewStyle>;
  iconName: keyof typeof FontAwesome.glyphMap;
  label: string;
  active: boolean;
  onPress: () => void;
}

interface SpringAnimationConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

const useSpring = (
  value: { to: number },
  config?: SpringAnimationConfig
): Animated.Value => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animatedValue = useMemo(() => new Animated.Value(value.to), []);

  useEffect(() => {
    const animation = Animated.spring(animatedValue, {
      ...config,
      toValue: value.to,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [animatedValue, config, value.to]);

  return animatedValue;
};

const TabItem = ({ iconName, label, active, onPress }: TabItemProps) => {
  const animation = useSpring({ to: active ? 1 : 0 }, { stiffness: 50 });
  const dotScale = animation;
  const iconTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });
  const labelTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });
  const iconVisibility = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const labelVisibility = animation;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.centered,
            { transform: [{ translateY: labelTranslate }] },
          ]}
        >
          <DiagonalTransition visibility={labelVisibility}>
            <Text style={styles.label}>{label}</Text>
          </DiagonalTransition>
        </Animated.View>

        <Animated.View
          style={[
            styles.centered,
            { transform: [{ translateY: iconTranslate }] },
          ]}
        >
          <DiagonalTransition visibility={iconVisibility}>
            <FontAwesome name={iconName} size={26} color={INACTIVE_COLOUR} />
          </DiagonalTransition>
        </Animated.View>

        <Animated.View
          style={[styles.dot, { transform: [{ scale: dotScale }] }]}
        />
      </View>
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
    bottom: 8,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: ACTIVE_COLOUR,
  },
});

export default TabItem;
