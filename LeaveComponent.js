import React, { Component, useState, useEffect } from "react";

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

const CountDownTimer = ({ item, onDeclineLeave, onReset, setToIntial }) => {
  const [timer, setTimer] = useState(10);
  const [isActive, setisActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (timer === 0) {
      clearInterval(interval);
      setToIntial();
    } else if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  return (
    <SafeAreaView>
      <View style={StyleSheetMethods.text} key={timer}>
        <Text style={[StyleSheetMethods.viewsText]}>
          {timer} {item}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        key={item}
      >
        <Image
          source={logo}
          style={{
            width: 200,
            height: 200,
            justifyContent: "center",
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: 100,
            marginRight: 10,
          }}
        >
          <Button title="Proceed" onPress={() => onDeclineLeave()}></Button>
        </View>
        <View
          style={{
            width: 80,
            marginBottom: 10,
          }}
        >
          <Button title="Reset" onPress={() => onReset()}></Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CountDownTimer;
