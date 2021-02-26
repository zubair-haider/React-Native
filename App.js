import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import MyApp from "./GetLocation";
import Counter from "./Counter";
import Topheader from "./TopHeader";
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
  Button,
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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyApp} />
        <Stack.Screen name="Chekup" component={Topheader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
