import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Greeting = () => {
  return (
    <View>
      <Text style={styles.greeting}>Good Morning</Text>
      <Text style={styles.description}>
        What would you like to make to start your day?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    color: "grey",
  },
});

export default Greeting;
