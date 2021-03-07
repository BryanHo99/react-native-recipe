import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";

import AuthenticationStackNavigator from "./AuthenticationStackNavigator";
import HomeBottomTabNavigator from "./HomeBottomTabNavigator";

const AppStack = createSharedElementStackNavigator();
const AppStackNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{ gestureEnabled: false }}
      >
        <AppStack.Screen
          name="Authentication"
          component={AuthenticationStackNavigator}
        />
        <AppStack.Screen name="Home" component={HomeBottomTabNavigator} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;
