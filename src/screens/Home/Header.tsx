import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  diffClamp,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";

export const HEADER_HEIGHT = 150;
const data = [
  { category: "All", key: 1 },
  { category: "Food", key: 2 },
  { category: "Drink", key: 3 },
  { category: "Breakfast", key: 4 },
  { category: "Lunch", key: 5 },
  { category: "Dinner", key: 6 },
  { category: "Supper", key: 7 },
  { category: "Appetizer", key: 8 },
  { category: "Main", key: 9 },
  { category: "Dessert", key: 10 },
];

interface HeaderProps {
  scrollY: Animated.Node<number>;
}

const Header = ({ scrollY }: HeaderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const clampScrollY = diffClamp(scrollY, 0, HEADER_HEIGHT);

  const translateY = interpolate(clampScrollY, {
    inputRange: [0, 90],
    outputRange: [0, -90],
    extrapolate: Extrapolate.CLAMP,
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: { category: string; key: number };
    index: number;
  }) => {
    return (
      <TouchableOpacity
        disabled={index === activeIndex}
        onPress={() => setActiveIndex(index)}
      >
        <View
          style={[
            styles.category,
            {
              backgroundColor: index === activeIndex ? "#1FCC79" : "#DBDBDB",
            },
          ]}
        >
          <Text>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.searchHeader}>
        <Text style={styles.title}>Recipe</Text>

        <TouchableOpacity>
          <View style={styles.searchIcon}>
            <FontAwesome name="search" size={25} color="#686a75" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryHeader}>
        <Text style={styles.categoryText}>Category</Text>

        <FlatList
          {...{ data, renderItem }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          keyExtractor={(item) => item.key.toString()}
          horizontal
          removeClippedSubviews={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: Constants.statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  searchHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#686a75",
  },
  searchIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    paddingBottom: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DBDBDB",
  },
  categoryHeader: {
    marginTop: 15,
  },
  category: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E5481",
    paddingHorizontal: 20,
  },
});

export default Header;
