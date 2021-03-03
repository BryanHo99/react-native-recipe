import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ACTIVE_COLOUR = "rgb(30, 30, 110)";
const INACTIVE_COLOUR = "rgba(30, 30, 110, 0.4)";

interface TabItemProps {
  iconName: keyof typeof FontAwesome.glyphMap;
  label: string;
  active: boolean;
  onPress: () => void;
}

const useSpring = (value: number): Animated.Value => {
  const [animatedValue] = useState(new Animated.Value(value));

  const animate = useCallback(() => {
    Animated.spring(animatedValue, {
      toValue: value,
      bounciness: 14,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, value]);

  useEffect(() => {
    animate();
  }, [animate]);

  return animatedValue;
};

const TabItem = ({ iconName, label, active, onPress }: TabItemProps) => {
  const [animatedPressValue] = useState(new Animated.Value(1));
  const animation = useSpring(active ? 1 : 0);

  const dotScale = animation;
  const labelOpacity = animation;

  const iconOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const labelTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  const iconTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const onPressIn = () => {
    Animated.spring(animatedPressValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedPressValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
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
    fontSize: 15,
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
