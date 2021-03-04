import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FadeInView } from "../../components";

const Settings = () => {
  return (
    <FadeInView>
      <SafeAreaView style={styles.container}>
        <Text>Settings</Text>
      </SafeAreaView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;
