import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import Animated, {
  event,
  interpolate,
  spring,
  Value,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScrollToTop } from "@react-navigation/native";

import { FadeInView } from "../../components";

import Header, { HEADER_HEIGHT } from "./Header";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const data = [
  { name: "Hello", key: 1 },
  { name: "Testing", key: 2 },
  { name: "World", key: 3 },
  { name: "Bryan", key: 4 },
  { name: "React Native", key: 5 },
  { name: "Programming", key: 6 },
  { name: "Algorithms", key: 7 },
  { name: "Animations", key: 8 },
  { name: "Scrolling", key: 9 },
  { name: "Testing", key: 10 },
  { name: "Hey", key: 11 },
  { name: "TypeScript", key: 12 },
  { name: "Okay", key: 13 },
  { name: "Testing", key: 14 },
  { name: "Hello", key: 15 },
  { name: "Welcome", key: 16 },
  { name: "Home Screen", key: 17 },
  { name: "Navigation", key: 18 },
  { name: "React", key: 19 },
  { name: "Reanimated", key: 20 },
  { name: "Hello", key: 21 },
  { name: "World", key: 22 },
];

const Home = () => {
  const scrollY = useRef(new Value(0)).current;
  const ref = useRef(null);
  useScrollToTop(ref);

  const delay = 500;
  const itemAnimation = useMemo(() => new Value(0), []);

  const fadeInItems = useCallback(() => {
    spring(itemAnimation, {
      toValue: 1,
      mass: 3,
      damping: 1000,
      stiffness: 100,
      overshootClamping: true,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    }).start();
  }, [itemAnimation]);

  useEffect(() => {
    fadeInItems();
  }, [fadeInItems]);

  const renderItem = ({
    item,
    index,
  }: {
    item: { name: string; key: number };
    index: number;
  }) => {
    const translateY = interpolate(itemAnimation, {
      inputRange: [0, 1],
      outputRange: [delay * (index + 1), 1],
    });

    const opacity = interpolate(itemAnimation, {
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 20,
          opacity,
          transform: [{ translateY }],
        }}
      >
        <Text>{item.name}</Text>
      </Animated.View>
    );
  };

  return (
    <FadeInView>
      <SafeAreaView style={styles.container}>
        <Header {...{ scrollY }} />

        <View style={{ paddingHorizontal: 20 }}>
          <AnimatedFlatList
            {...{ ref, data, renderItem }}
            keyExtractor={(item: { key: { toString: () => string } }) =>
              item.key.toString()
            }
            contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
            removeClippedSubviews={false}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            contentInsetAdjustmentBehavior="automatic"
            onScroll={event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
          />
        </View>
      </SafeAreaView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
