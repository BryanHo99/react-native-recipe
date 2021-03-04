import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

import TabItem from "./TabItem";

interface TabBarProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
  tabIcons: (keyof typeof FontAwesome.glyphMap)[];
}

const TabBar = ({ navigation, state, tabIcons }: TabBarProps) => {
  const { routes, index } = state;

  return (
    <View style={styles.bar}>
      {routes.map((route, i) => (
        <TabItem
          key={i}
          iconName={tabIcons[i]}
          label={route.name}
          active={index === i}
          onPress={() => navigation.navigate(route.name)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    overflow: "hidden",
  },
});

export default TabBar;
