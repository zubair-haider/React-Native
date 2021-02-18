import React, { Component } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";
import "antd-mobile/dist/antd-mobile.css";
import { Button } from "antd-mobile";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  //Button,
  SafeAreaView,
} from "react-native";
const DoctorsComp = ({ item, onConformed, onDeclined }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "", paddingTop: 10 }}>
      <View style={StyleSheetMethods.text} key={item}>
        <Text style={StyleSheetMethods.viewsText}> {item}?</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <View style={{ width: 80, marginBottom: 10 }}>
          <Button
            onClick={() => onConformed()}
            style={{
              backgroundColor: "green",
              color: "white",
              cursor: "pointer",
              width: 100,
            }}
          >
            YES
          </Button>
        </View>
        <View style={{ width: 100, paddingLeft: 20 }}>
          <Button
            style={{
              backgroundColor: "green",
              color: "white",
              cursor: "pointer",
              width: 100,
            }}
            onClick={() => onDeclined()}
          >
            NO
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DoctorsComp;
