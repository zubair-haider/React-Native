//import "react-native-gesture-handler";
//import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Counter from "./Counter";
import ComponentsHolder from "./ComponentsHolder";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Menu, ActivityIndicator, NavBar } from "antd-mobile";
import { Location, Permissions } from "expo";
import { getPreciseDistance } from "geolib";
import { PermissionsAndroid, ACCESS_FINE_LOCATION } from "react-native";
//import MapViewDirections from "react-native-maps-directions";
//import MapView, { AnimatedRegion, Marker } from "react-native-maps";
// import DrawerExample from "./drawer";
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
import { NavigationContainer } from "@react-navigation/native";

const TopHeader = ({
  key,
  name,
  distance,
  showAppointment,
  compState,
  navigation,
}) => {
  return (
    <View
      style={{
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.list}>{name}</Text>
      <Text style={styles.list}>{distance.toFixed(2)} KM</Text>
      <View style={{ width: 80 }}>
        <Button
          title="select"
          onPress={() => {
            compState(true);
            console.log("navigation", navigation);
          }}
        ></Button>
      </View>
    </View>
  );
};
export default TopHeader;
const styles = {
  list: {
    backgroundColor: "white",
    justifyContent: "center",
    width: 150,
    padding: 10,
    fontWeight: "bold",
  },
};
