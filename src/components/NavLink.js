import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
const styles = StyleSheet.create({
  signinPromptStyle: { color: "#0000ff", marginBottom: 0 },
  linkStyle: {
    color: "#0000ff",
    margin: 0,
    padding: 0,
  },
});

export default ({ routeName, text }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.signinPromptStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
