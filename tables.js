import React, { Component, useEffect, useState } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";
import axios from "axios";

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
  const [dataHolder, setData] = useState([]);

  // const ShowData = async () => {
  //   const result = await axios("http://localhost:3000/detail");

  //   return setData(result.data);
  // };

  const [isLoading, setLoading] = useState(true);
  useEffect(async () => {
    const result = await axios("http://localhost:3000/detail");
    return setData(result.data);
  }, []);

  console.log(dataHolder);
  // if (dataHolder.length === 0) ShowData();
  return (
    <View>
      {dataHolder.map((item, i) => {
        return (
          <View
            style={{ flex: 1, flexDirection: "row", marginBottom: 3 }}
            key={i}
          >
            <Text style={{ marginRight: 10 }}>{item.id}</Text>
            <Text style={{ marginRight: 10 }}>{item.name}</Text>
            <Text style={{ marginRight: 10 }}>{item.phone}</Text>
            <Text style={{ marginRight: 10 }}>{item.disease}</Text>
            <Text style={{ marginRight: 10 }}>{item.age}</Text>
            <Text style={{ marginRight: 10 }}>{item.gender}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default table;
