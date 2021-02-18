import React, { Component, useState, useEffect } from "react";
import "antd-mobile/dist/antd-mobile.css";
import { Button } from "antd-mobile";
import StyleSheetMethods from "./Styles/StyleSheet";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  //Button,
  SafeAreaView,
} from "react-native";
import logo from "./assets/boy.png";

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
          {/* <Button title="Proceed" onPress={() => onDeclineLeave()}></Button> */}
          <Button
            onClick={() => onDeclineLeave()}
            style={{
              backgroundColor: "green",
              color: "white",
              cursor: "pointer",
              width: 100,
            }}
          >
            PROCEED
          </Button>
        </View>
        <View
          style={{
            width: 80,
            marginBottom: 10,
          }}
        >
          <Button
            // title="Reset"
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
export default CountDownTimer;
