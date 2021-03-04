import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FadeInView } from "../../components";

import Greeting from "./Greeting";

const Home = () => {
  return (
    <FadeInView>
      <SafeAreaView style={styles.container}>
        <Greeting />
      </SafeAreaView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
