import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Favourites from "../screens/Favourites";
import { TabBar } from "../components";

export type HomeBottomTabParamList = {
  Home: undefined;
  Favourites: undefined;
};

const HomeBottomTab = createBottomTabNavigator();
const HomeBottomTabNavigator = () => {
  return (
    <HomeBottomTab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <HomeBottomTab.Screen name="Home" component={Home} />
      <HomeBottomTab.Screen name="Favourites" component={Favourites} />
    </HomeBottomTab.Navigator>
  );
};

export default HomeBottomTabNavigator;
