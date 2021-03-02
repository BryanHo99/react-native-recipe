import React from "react";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppStackNavigator } from "./src/navigations";

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStackNavigator />
    </SafeAreaProvider>
  );
}
