import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";

const styles = StyleSheet.create({
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
    borderRadius: 3,
    marginBottom: 20,
    marginHorizontal: 15,
  },
});
export default () => {
  const { state, change_name, start_recording, stop_recording } = useContext(
    LocationContext
  );
  const { state: trackState, save_track } = useContext(TrackContext);

  const saveTrack = () => {
    save_track(state.trackName, state.locations);
  };
  return (
    <>
      <Spacer>
        <Input
          autoCapitalize="none"
          autoCompleteType="off"
          autoFocus={true}
          autoCorrect={false}
          label="Track Name"
          containerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          value={state.trackName}
          onChangeText={change_name}
        ></Input>
      </Spacer>

      {state.isRecording ? (
        <Button
          title="Stop"
          style={styles.buttonStyle}
          onPress={stop_recording}
        ></Button>
      ) : (
        <Button
          title="Start Recording"
          style={styles.buttonStyle}
          onPress={start_recording}
        ></Button>
      )}

      {state.trackName && !state.isRecording && state.locations.length ? (
        <Button
          title="Save Recording"
          style={styles.buttonStyle}
          onPress={saveTrack}
        ></Button>
      ) : null}
    </>
  );
};
