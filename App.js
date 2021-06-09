import "react-native-gesture-handler";
// import Constants from "expo-constants";
// import * as Notifications from "expo-notifications";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import Forms from "./forms/SelectForms";
import MyApp from "./GetLocation";
//import Charts from "./Charts/React_native_chart";
import UserList from "./UserQueueList";
import Chart from "./Charts/React_native_chart";
//import Splash from "./forms/splash";
import ComponentsHolder from "./ComponentsHolder";
import ModalInput from "./ModalInput";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
//import { Menu, ActivityIndicator, NavBar } from "antd-mobile";
import { Location, Permissions } from "expo";
import { getPreciseDistance } from "geolib";
// import { PermissionsAndroid, ACCESS_FINE_LOCATION } from "react-native";
import LoginPage from "./Login";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  //Button,
  SafeAreaView,
  Dimensions,
  Button,
  Platform,
} from "react-native";
import ModalInPut from "./ModalInput";

const Stack = createStackNavigator();

export default function App({ navigation }) {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FORM"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3fb5bf",
          },

          headerTitleAlign: {},
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
          },
        }}
      >
        <Stack.Screen name="LOGIN" component={LoginPage} />
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={() => ({
            title: "Hospitals Visit",
            headerLeft: () => {},
          })}
        />
        <Stack.Screen name="FORM" component={Forms} />

        <Stack.Screen name="HOSPITALS LIST" component={MyApp} />
        <Stack.Screen name="QUEUE" component={ComponentsHolder} />
        <Stack.Screen name="Chart" component={Chart} />
        <Stack.Screen name="Disease" component={ModalInPut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
