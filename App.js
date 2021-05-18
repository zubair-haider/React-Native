import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Forms from "./forms/SelectForms";
import MyApp from "./GetLocation";
import Charts from "./Charts/React_native_chart";
import SearchLocation from "./Charts/location";
//import Splash from "./forms/splash";
import ComponentsHolder from "./ComponentsHolder";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Menu, ActivityIndicator, NavBar } from "antd-mobile";
import { Location, Permissions } from "expo";
import { getPreciseDistance } from "geolib";
import { PermissionsAndroid, ACCESS_FINE_LOCATION } from "react-native";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  //Button,
  SafeAreaView,
  Dimensions,
} from "react-native";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FORM">
        <Stack.Screen name="FORM" component={Forms} />

        <Stack.Screen name="HOSPITALS LIST" component={MyApp} />
        <Stack.Screen name="QUEUE" component={ComponentsHolder} />
        <Stack.Screen name="Chart" component={SearchLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
