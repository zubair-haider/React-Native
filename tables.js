import React, { Component, useEffect, useState } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";
import axios from "axios";

// import { StyleSheet, View } from "react-native";
// import { Table, Row, Rows } from "react-native-table-component";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";
import logo from "./assets/boy.png";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { log } from "react-native-reanimated";
const table = ({ item, img, onDeclineLeave, onReset }) => {
  const [dataHolder, setData] = useState("");
  const [tableHead, setTableHead] = useState([
    "Head",
    "Head2",
    "Head3",
    "Head4",
  ]);
  // const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/detail ")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        data.map((item) => {
          setData({ dataHolder: item });
        });

        // setData({ dataHolder: data });
      });
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={StyleSheetMethods.text} key={item}>
        <Text>
          {Object.values(dataHolder).map((item) => {
            console.log(item);
            return (
              <View
                style={{ flex: 1, flexDirection: "row", marginBottom: 3 }}
                key={item.id}
              >
                <Text style={{ marginRight: 10 }}>{item.name}</Text>
                <Text style={{ marginRight: 10 }}>{item.phone}</Text>
                <Text style={{ marginRight: 10 }}>{item.disease}</Text>
                <Text style={{ marginRight: 10 }}>{item.age}</Text>
                <Text style={{ marginRight: 10 }}>{item.gender}</Text>
              </View>
            );
          })}
        </Text>
        {/* <Text style={StyleSheetMethods.viewsText}>
          {Object.values(dataHolder).map((item) => {})}
        </Text> */}
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
const showData = ({ receiveItems }) => {};
export default table;
