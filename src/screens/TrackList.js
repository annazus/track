import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Context as TrackContext } from "../context/TrackContext";
const styles = StyleSheet.create({
  container: {},
});

export default ({ navigation }) => {
  let unSubscribeFocus;

  const { state, get_tracks } = useContext(TrackContext);

  useEffect(() => {
    if (unSubscribeFocus) {
      console.log("unsubscribing");
      unSubscribeFocus();
    }

    unSubscribeFocus = navigation.addListener("focus", () => {
      console.log("Track Listen Screen focus");
      get_tracks();
    });

    return unSubscribeFocus;
  }, [navigation]);

  return (
    <>
      <Text h3>My Track List</Text>
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
      {state.tracks.length ? (
        <FlatList
          data={state.tracks}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("TrackDetail", item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text>You have no tracks</Text>
      )}
    </>
  );
};
