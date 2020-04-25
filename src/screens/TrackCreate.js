import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import useLocation from "../hooks/useLocation";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import { Context as LocationContext } from "../context/LocationContext";
const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column" },
  errorStyle: {
    color: "red",
  },
});

export default ({ navigation }) => {
  // const [error, setError] = useState("");

  const { state, add_location } = useContext(LocationContext);

  const [recording, setRecording] = useState(true);
  const [error] = useLocation(recording || state.isRecording, add_location);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setRecording(true);
    });
    const unsubscribeBlur = navigation.addListener("blur", () => {
      setRecording(false);
    });
    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text h2>Create Track</Text>

      <Map></Map>
      {error ? (
        <Text style={styles.errorStyle}>Please enable Location Services</Text>
      ) : null}
      <TrackForm></TrackForm>
    </SafeAreaView>
  );
};
