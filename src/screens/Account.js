import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    display: "flex",
    marginTop: 50,
  },
  textStyle: {
    textAlign: "center",
  },
  buttonSignStyle: {
    margin: 0,
    padding: 0,
  },
});

export default () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Spacer>
        <Text h4 style={styles.textStyle}>
          Log out
        </Text>
      </Spacer>
      <Spacer>
        <Button
          title="Sign out"
          onPress={signout}
          style={styles.buttonSignStyle}
        ></Button>
      </Spacer>
    </SafeAreaView>
  );
};
