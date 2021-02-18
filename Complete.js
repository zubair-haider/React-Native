import React, { Component } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";
import "antd-mobile/dist/antd-mobile.css";
import { Button } from "antd-mobile";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  // Button,
  SafeAreaView,
} from "react-native";
import logo from "./assets/boy.png";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
const Complete = ({ item, img, onDeclineLeave, onReset }) => {
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={StyleSheetMethods.text} key={item}>
        <Text style={StyleSheetMethods.viewsText}>{item}</Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          // marginTop: 10,
        }}
      >
        <View style={{ width: 80, marginBottom: 10, marginTop: 20 }}>
          <Button //title="Reset"
            onClick={() => onReset()}
            style={{
              width: 100,
              // marginTop: 30,
              color: "white",
              backgroundColor: "green",
              cursor: "pointer",
            }}
          >
            RESET
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Complete;
