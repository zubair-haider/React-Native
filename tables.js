import React, { Component, useEffect, useState } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";
import axios from "axios";

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
const table = ({ item, img, onDeclineLeave, onReset }) => {
  function getDbData() {}
  useEffect(() => {
    // getDbData();
    // fetch("http://localhost:3000/detail/user")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // let url = "http://localhost:3000/detail";
    // let response = axios({
    //   method: "GET",
    //   url,
    //   // data: JSON.stringify(data),
    //   headers: { "content-type": "application/json" },
    //   // data: data,
    // });
    // console.log("response  post= ", response);
    fetch("http://localhost:3000/detail ")
      .then((response) => response.json())
      .then((data) => console.log("yourData:", data));
  });

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
        {/* <View style={{ width: 80, marginBottom: 10, marginTop: 20 }}>
          <Button title="Reset" onPress={() => onReset()} />
        </View> */}
        <View style={StyleSheetMethods.btndoc}>
          <TouchableOpacity onPress={onReset}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default table;
