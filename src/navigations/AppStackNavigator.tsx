import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";

import AuthenticationStackNavigator from "./AuthenticationStackNavigator";

const AppStack = createSharedElementStackNavigator();
const AppStackNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen
          name="Authentication"
          component={AuthenticationStackNavigator}
        />
        <AppStack.Screen name="Home" component={Home} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;
