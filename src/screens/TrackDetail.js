import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column" },
  map: { height: 300 },
});

export default ({ route, navigation }) => {
  const { name, locations } = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          ...locations[0].coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={locations.map((location) => location.coords)}
          strokeColor="#FF0000"
          strokeOpacity={1.0}
          strokeWeigh={2}
        ></Polyline>
      </MapView>

      <Text>{name}</Text>
    </View>
  );
};
