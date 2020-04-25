import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,

    display: "flex",
    justifyContent: "center",
    marginBottom: 100,
  },
});

export default ({ navigation }) => {
  const { state, signup, clear_error } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      clear_error();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.containerStyle}>
      <AuthForm
        formTitle="Sign Up to Tracker"
        buttonLabel="SignUp"
        errorMessage={state.errorMessage}
        onAuthenticate={signup}
      ></AuthForm>
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead."
      />
    </View>
  );
};
