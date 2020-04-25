import React, { useContext } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const styles = StyleSheet.create({ map: { height: 300 } });

export default ({ onLocationChangeCallback }) => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);
  if (!currentLocation)
    return (
      <ActivityIndicator
        size="large"
        style={{ marginTop: 200 }}
      ></ActivityIndicator>
    );
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      region={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      onUserLocationChange={onLocationChangeCallback}
    >
      <Circle
        center={currentLocation.coords}
        radius={120}
        strokeColor="rgba(158,158,255,1)"
        fillColor="rgba(158,158,255,0.3)"
      ></Circle>
      <Polyline
        coordinates={locations.map((location) => location.coords)}
        strokeColor="#FF0000"
        strokeOpacity={1.0}
        strokeWeigh={2}
      ></Polyline>
    </MapView>
  );
};
