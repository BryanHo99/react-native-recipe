import React from "react";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AppStackNavigator } from "./src/navigations";

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="white" />
      <AppStackNavigator />
    </SafeAreaProvider>
  );
}
