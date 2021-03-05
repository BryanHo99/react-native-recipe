import React, { useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Animated, {
  event,
  Extrapolate,
  interpolate,
  Value,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { FadeInView } from "../../components";

import Greeting from "./Greeting";
import SearchBar from "./SearchBar";

const HEADER_MIN_HEIGHT = 30;
const HEADER_MAX_HEIGHT = 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
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

  const height = interpolate(scrollY, {
    inputRange: [0, HEADER_MAX_HEIGHT * 1.35],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = interpolate(scrollY, {
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 1.35],
    outputRange: [1, -100],
    extrapolate: Extrapolate.CLAMP,
  });

  const renderItem = ({ item }: { item: { name: string; key: number } }) => {
    return (
      <View style={{ borderWidth: 1, marginVertical: 10, padding: 20 }}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <FadeInView>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[styles.header, { height, transform: [{ translateY }] }]}
        >
          <Animated.View style={{ opacity }}>
            <Greeting containerStyle={{ marginBottom: 20 }} />
          </Animated.View>
          <SearchBar />
        </Animated.View>

        <AnimatedFlatList
          {...{ data, renderItem }}
          keyExtractor={(item: { key: { toString: () => string } }) =>
            item.key.toString()
          }
          removeClippedSubviews={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={32}
          contentInsetAdjustmentBehavior="automatic"
          onScroll={event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginVertical: 20,
  },
});

export default Home;
