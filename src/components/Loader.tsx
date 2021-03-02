import React from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import LottieLoader from "../assets/lottie/loader.json";

const Loader = () => {
  return (
    <LottieView
      source={LottieLoader}
      speed={1.5}
      autoPlay
      style={styles.loader}
      loop
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 150,
  },
});

export default Loader;
