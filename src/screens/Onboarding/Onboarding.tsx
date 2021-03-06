import React, { createRef, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  ImageRequireSource,
} from "react-native";
import Animated, {
  event,
  Extrapolate,
  interpolate,
  Value,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

import { AuthenticationStackParamList } from "../../navigations";
import { Button } from "../../components";

import Backdrop from "./Backdrop";
import Square from "./Square";

const { width } = Dimensions.get("window");
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const COLOUR = "#000";
const IMAGE_SIZE = width / 1.4;

const DATA = [
  {
    key: 1,
    title: "Collect Your Recipes",
    description:
      "Record your personal recipes and tailored creations all in one place",
    image: require("../../assets/onboarding/onboarding_1.png"),
  },
  {
    key: 2,
    title: "Customise Your Steps",
    description:
      "Organise recipes and modify their procedures according to your own needs",
    image: require("../../assets/onboarding/onboarding_2.png"),
  },
  {
    key: 3,
    title: "Filter Your Collections",
    description:
      "Search your recipes easily with simplified categorisations and tags",
    image: require("../../assets/onboarding/onboarding_3.png"),
  },
];

interface OnboardingProps {
  navigation: StackNavigationProp<AuthenticationStackParamList, "Onboarding">;
}

interface ItemProps {
  item: {
    key: number;
    title: string;
    description: string;
    image: ImageRequireSource;
  };
  index: number;
}

interface PaginationProps {
  scrollX: Animated.Node<number>;
}

const Pagination = ({ scrollX }: PaginationProps) => {
  return (
    <View style={styles.pagination}>
      {DATA.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const scale = interpolate(scrollX, {
          inputRange,
          outputRange: [0.8, 1.6, 0.8],
          extrapolate: Extrapolate.CLAMP,
        });

        const opacity = interpolate(scrollX, {
          inputRange,
          outputRange: [0.3, 0.9, 0.3],
          extrapolate: Extrapolate.CLAMP,
        });

        return (
          <Animated.View
            key={index}
            style={[styles.dot, { opacity, transform: [{ scale }] }]}
          />
        );
      })}
    </View>
  );
};

const Onboarding = ({ navigation }: OnboardingProps) => {
  const scrollX = useRef(new Value(0)).current;
  const carouselRef = createRef<typeof AnimatedFlatList>();

  const renderItem = ({ item, index }: ItemProps) => {
    const last = index === DATA.length - 1;
    const label = last ? "Get started" : "Next";
    const color = last ? "#FFF" : "#000";
    const backgroundColor = last ? "#2CB9B0" : "#FFF";

    const navigateOnboarding = () => {
      if (last) {
        navigation.navigate("Home");
      } else {
        carouselRef?.current?.getNode()?.scrollToOffset({
          offset: width * (index + 1),
          animated: true,
        });
      }
    };

    return (
      <View style={styles.contentContainer}>
        <View style={{ flex: 1, paddingTop: 10 }}>
          <Image source={item.image} style={styles.image} />
        </View>

        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={navigateOnboarding}
              {...{ label, color, backgroundColor }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Backdrop {...{ scrollX }} />
      <Square {...{ scrollX }} />
      <Pagination {...{ scrollX }} />

      <AnimatedFlatList
        {...{ renderItem }}
        data={DATA}
        ref={carouselRef}
        keyExtractor={(item: { key: { toString: () => string } }) =>
          item.key.toString()
        }
        horizontal
        removeClippedSubviews={false}
        bounces={false}
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 40,
  },
  title: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 24,
    marginBottom: 10,
    color: COLOUR,
  },
  description: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 15,
    color: COLOUR,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    position: "absolute",
    bottom: 270,
    flexDirection: "row",
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    backgroundColor: COLOUR,
    margin: 10,
  },
});

export default Onboarding;
