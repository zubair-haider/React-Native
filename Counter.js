import React, { Component } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
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
import { cloneElement } from "react";

const IntialComponent = ({
  item,
  onConform,
  onDecline,
  onAddQueue,
  user,
  queueState,
}) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#206E79",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={StyleSheetMethods.questions}>
        <Text style={StyleSheetMethods.viewsText}>{item}?</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 50,
        }}
        key={item}
      >
        <View
          style={{
            padding: 10,
            width: 100,
            backgroundColor: "#34baeb",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onConform();
              onAddQueue();
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              Yes
            </Text>
          </TouchableOpacity>
          {/* <Button
            title="No"
            onPress={() => onDecline()}
            style={{
              width: 100,

              color: "white",
              backgroundColor: "green",
            }}
          ></Button> */}
        </View>
        <View
          style={{
            marginLeft: 10,
            width: 100,
            backgroundColor: "#34baeb",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <TouchableOpacity onPress={onDecline}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              No
            </Text>
          </TouchableOpacity>
          {/* <Button
            title="No"
            onPress={() => onDecline()}
            style={{
              width: 100,

              color: "white",
              backgroundColor: "green",
            }}
          ></Button> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default IntialComponent;
