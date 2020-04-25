import { useState, useEffect } from "react";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

export default (shouldWatch, add_location) => {
  const [error, setError] = useState("");
  const [subscribeWatch, setSubscribeWatch] = useState(null);
  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      const subscribe = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        add_location
      );
      setSubscribeWatch(subscribe);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  useEffect(() => {
    if (shouldWatch) startWatching();
    else if (subscribeWatch) {
      subscribeWatch.remove(add_location);
      setSubscribeWatch(null);
    }
  }, [shouldWatch]);
  return [error];
};
