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
  id,
  onConform,
  onDecline,
  onAddQueue,
  userId,
  user,
  queueState,
}) => {
  return (
    <SafeAreaView
      style={{
        // backgroundColor: "#206E79",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
      }}
      key={id}
    >
      <View style={{ height: "50%" }} key={{ item }}>
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
        >
          <View
            style={{
              padding: 10,
              width: 100,
              backgroundColor: "rgb(199,9,9)",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                onConform();
                onAddQueue();
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
              >
                Yes
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: 10,
              width: 100,
              backgroundColor: "rgb(199,9,9)b",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24,
            }}
          >
            <TouchableOpacity onPress={onDecline}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default IntialComponent;
