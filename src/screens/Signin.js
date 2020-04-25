import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";
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
  const { state, signin, clear_error } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      clear_error();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.containerStyle}>
      <AuthForm
        formTitle="Sign in for Tracker"
        buttonLabel="Sign in"
        errorMessage={state.errorMessage}
        onAuthenticate={signin}
      ></AuthForm>
      <NavLink routeName="Signup" text="Need an account? Sign up instead." />
    </View>
  );
};
