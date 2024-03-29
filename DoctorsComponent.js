import React, { Component } from "react";
// import StyleSheetMethods from "./Styles/StyleSheet";
// import "antd-mobile/dist/antd-mobile.css";
//import { Button } from "antd-mobile";
import StyleSheetMethods from "./Styles/StyleSheet";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
const DoctorsComp = ({ item, id, onConformed, onDeclined, onAddQueues }) => {
  return (
    <SafeAreaView
      key={id}
      style={{
        height: "80%",
        paddingBottom: 10,
        // backgroundColor: "green",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",

        backgroundColor: "",
        paddingTop: 10,
      }}
    >
      <View style={StyleSheetMethods.text} key={item}>
        <Text style={StyleSheetMethods.viewsText}> {item}?</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        {/* <View style={{ width: 80, marginBottom: 10 }}>
          <Button title="Yes" onPress={() => onConformed()}></Button>
        </View> */}
        {/* <View style={{ width: 100, paddingLeft: 20 }}>
          <Button title="No" onPress={() => onDeclined()} />
        </View> */}
        <View style={StyleSheetMethods.btndoc}>
          <TouchableOpacity
            onPress={() => {
              onConformed();
              onAddQueues();
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              Yes
            </Text>
          </TouchableOpacity>
        </View>
        <View style={StyleSheetMethods.btndoc}>
          <TouchableOpacity onPress={onDeclined}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DoctorsComp;
