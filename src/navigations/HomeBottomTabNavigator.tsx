import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import Home from "../screens/Home";
import Favourites from "../screens/Favourites";
import Settings from "../screens/Settings";
import { TabBar } from "../components";

export type HomeBottomTabParamList = {
  Home: undefined;
  Favourites: undefined;
};

const tabIcons: (keyof typeof FontAwesome.glyphMap)[] = [
  "home",
  "heart",
  "gear",
];

const HomeBottomTab = createBottomTabNavigator();
const HomeBottomTabNavigator = () => {
  return (
    <HomeBottomTab.Navigator
      tabBar={({ navigation, state }) => (
        <TabBar {...{ navigation, state, tabIcons }} />
      )}
    >
      <HomeBottomTab.Screen name="Home" component={Home} />
      <HomeBottomTab.Screen name="Favourites" component={Favourites} />
      <HomeBottomTab.Screen name="Settings" component={Settings} />
    </HomeBottomTab.Navigator>
  );
};

export default HomeBottomTabNavigator;
