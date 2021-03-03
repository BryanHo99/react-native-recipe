import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

import TabItem from "./TabItem";

const TAB_ICONS: (keyof typeof FontAwesome.glyphMap)[] = ["home", "heart"];

const TabBar = ({
  navigation,
  state,
}: BottomTabBarProps<BottomTabBarOptions>) => {
  const { routes, index } = state;

  const handlePress = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.bar}>
      {routes.map((route, i) => (
        <TabItem
          key={i}
          iconName={TAB_ICONS[i]}
          label={route.name}
          active={index === i}
          onPress={() => handlePress(route.name)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "white",
    overflow: "hidden",
  },
});

export default TabBar;
