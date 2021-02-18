import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Counter from "./Counter";
import ComponentsHolder from "./ComponentsHolder";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Menu, ActivityIndicator, NavBar } from "antd-mobile";
// import DrawerExample from "./drawer";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
import logo from "./assets/boy.png";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  return (
    <SafeAreaView
      style={{ flex: 1, width: 1000, margin: "auto", marginBottom: 50 }}
    >
      <View>{/* <DrawerExample /> */}</View>
      <View
        style={{
          margin: "auto",
          width: 400,
          backgroundColor: "red",
          borderColor: "red",
          shadowColor: "gray",
          shadowRadius: 15,
          borderWidth: 5,
          padding: 5,
          marginBottom: 10,
        }}
      >
        <TitleHodler />
      </View>
      <View
        style={{
          backgroundColor: "rgb(255,255,255)",
          borderColor: "green",
          shadowColor: "gray",
          shadowRadius: 5,
          borderWidth: 5,
          padding: 5,
          borderRadius: 5,
        }}
      >
        <ComponentsHolder />
      </View>
    </SafeAreaView>
  );
}
const TitleHodler = () => {
  return (
    <View>
      <Text
        style={{
          height: 30,
          fontSize: 30,
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "bold",
          color: "white",
          fontFamily: "Inter-Black",
        }}
      >
        Doctor's Appointment
      </Text>
    </View>
  );
};
const TopHeader = () => {
  return (
    <View>
      <Text>My Name Is Naeem Khalid</Text>
    </View>
  );
};
