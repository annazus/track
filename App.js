import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Account from "./src/screens/Account";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import TrackCreate from "./src/screens/TrackCreate";
import TrackDetail from "./src/screens/TrackDetail";
import TrackList from "./src/screens/TrackList";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";

const LoginStack = createStackNavigator();
const LoggedInBottomTab = createBottomTabNavigator();

const TrackDetailStack = createStackNavigator();

const AppWithNavigation = () => {
  const { state, try_local_signin } = useContext(AuthContext);

  useEffect(() => {
    try_local_signin();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {state.token ? (
          <LoggedInBottomTab.Navigator initialRouteName="TrackCreate">
            <LoggedInBottomTab.Screen name="TrackList">
              {() => {
                return (
                  <TrackDetailStack.Navigator>
                    <TrackDetailStack.Screen
                      name="TrackList"
                      component={TrackList}
                    ></TrackDetailStack.Screen>
                    <TrackDetailStack.Screen
                      name="TrackDetail"
                      component={TrackDetail}
                    ></TrackDetailStack.Screen>
                  </TrackDetailStack.Navigator>
                );
              }}
            </LoggedInBottomTab.Screen>

            <LoggedInBottomTab.Screen
              name="TrackCreate"
              component={TrackCreate}
              options={{ title: "Create track" }}
            ></LoggedInBottomTab.Screen>
            <LoggedInBottomTab.Screen
              name="Account"
              component={Account}
              options={{ title: "Account" }}
            ></LoggedInBottomTab.Screen>
          </LoggedInBottomTab.Navigator>
        ) : (
          <>
            <LoginStack.Navigator initialRouteName="Signup">
              <LoginStack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
              ></LoginStack.Screen>
              <LoginStack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              ></LoginStack.Screen>
            </LoginStack.Navigator>
          </>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default () => (
  <LocationProvider>
    <AuthProvider>
      <TrackProvider>
        <AppWithNavigation></AppWithNavigation>
      </TrackProvider>
    </AuthProvider>
  </LocationProvider>
);
