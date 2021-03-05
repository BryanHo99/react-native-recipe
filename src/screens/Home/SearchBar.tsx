import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={20} color="#686a75" />
      <Text style={styles.text}>Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    backgroundColor: "#DBDBDB",
    alignItems: "center",
  },
  text: {
    color: "#686a75",
    fontSize: 15,
    marginLeft: 10,
  },
});

export default SearchBar;
