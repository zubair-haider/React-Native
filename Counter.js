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
  // Button,
  SafeAreaView,
} from "react-native";

const IntialComponent = ({ item, onConform, onDecline }) => {
  return (
    <SafeAreaView
      style={{
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "rgb(160,235,239)",
          padding: 10,
          borderLeftWidth: 5,
          marginTop: 50,
          borderLeftColor: "rgb(58,150,243)",
        }}
        key={item}
      >
        <Text style={StyleSheetMethods.viewsText}>{item}?</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <Button
            // title="Yes"
            onClick={() => onConform()}
            style={{
              width: 100,
              // marginTop: 30,
              color: "white",
              backgroundColor: "green",
              cursor: "pointer",
              fontFamily: "Inter_900Black",
            }}
          >
            YES
          </Button>
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Button //title="No"
            onClick={() => onDecline()}
            style={{
              width: 100,
              // marginTop: 30,
              color: "white",
              backgroundColor: "green",
              cursor: "pointer",
              fontFamily: "Inter_900Black",
            }}
          >
            NO
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default IntialComponent;
