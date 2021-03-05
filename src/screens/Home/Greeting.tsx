import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface GreetingProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const Greeting = ({ containerStyle }: GreetingProps) => {
  const [greeting, setGreeting] = useState("");
  const [description, setDescription] = useState("");

  const getHour = useCallback(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      setGreeting("Good Morning");
      setDescription("What would you make to start your day?");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
      setDescription("Let's cook something delicrious for lunch today!");
    } else {
      setGreeting("Good Evening");
      setDescription("Ready to cook for dinner?");
    }
  }, []);

  useEffect(() => {
    getHour();
  }, [getHour]);

  return (
    <View style={containerStyle}>
      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#212121",
  },
  description: {
    color: "grey",
  },
});

export default Greeting;
