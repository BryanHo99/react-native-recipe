import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";

export type AuthenticationStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Home: undefined;
};

const AuthenticationStack = createStackNavigator();
const AuthenticationStackNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Login" component={Login} />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationStackNavigator;
