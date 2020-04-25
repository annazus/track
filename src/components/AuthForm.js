import React, { useState, useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as AuthContext } from "../context/AuthContext";
const styles = StyleSheet.create({
  titleStyle: {},
  inputContainerStyle: {
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  inputStyle: {
    borderColor: "#3e3e3d",
    borderWidth: 1,
    borderRadius: 3,
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  labelStyle: {
    fontWeight: "400",
  },
  buttonStyle: {
    width: "100%",
    borderRadius: 3,
    marginBottom: 20,
  },
  buttonSignStyle: {
    margin: 0,
    padding: 0,
    alignSelf: "flex-start",
  },

  errorStyle: {
    color: "red",
  },
});

export default ({ formTitle, buttonLabel, onAuthenticate, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h4 style={styles.titleStyle}>
          {formTitle}
        </Text>
      </Spacer>
      <Spacer>
        <Input
          containerStyle={styles.inputContainerStyle}
          autoCapitalize="none"
          autoCompleteType="off"
          autoFocus={true}
          autoCorrect={false}
          label="Email"
          textContentType="username"
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          value={email}
          onChangeText={setEmail}
        ></Input>
      </Spacer>
      <Spacer>
        <Input
          containerStyle={styles.inputContainerStyle}
          autoCapitalize="none"
          secureTextEntry={true}
          label="Password"
          autoCorrect={false}
          autoCompleteType="off"
          textContentType="newPassword"
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          value={password}
          onChangeText={setPassword}
        ></Input>
      </Spacer>

      <Spacer>
        {errorMessage ? (
          <Text style={styles.errorStyle}>{errorMessage}</Text>
        ) : null}
        <Button
          title={buttonLabel}
          style={styles.buttonStyle}
          onPress={() => onAuthenticate(email, password)}
        ></Button>
      </Spacer>
    </>
  );
};
