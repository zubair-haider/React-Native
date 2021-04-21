import React, { Component } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";

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
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
const Complete = ({ item, img, onDeclineLeave, onReset, onAddQueues }) => {
  return (
    <SafeAreaView
      style={{
        height: "80%",
        paddingBottom: 10,
        // backgroundColor: "green",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 20,
      }}
    >
      <View style={StyleSheetMethods.text} key={item}>
        <Text style={StyleSheetMethods.viewsText}>{item}</Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        {/* <View style={{ width: 80, marginBottom: 10, marginTop: 20 }}>
          <Button title="Reset" onPress={() => onReset()} />
        </View> */}
        <View style={StyleSheetMethods.btndoc}>
          <TouchableOpacity
            onPress={() => {
              onReset();
              onAddQueues();
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Complete;
