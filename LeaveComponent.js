import React, { Component, useState, useEffect } from "react";
// import Alert from "./alert";
//import LinearGradient from "react-native-linear-gradient";
import StyleSheetMethods from "./Styles/StyleSheet";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";

const CountDownTimer = ({
  item,
  onDeclineLeave,
  onReset,
  onProceed,
  removeQueue,

  people,
  destinationalert,
  hospitalname,
}) => {
  let time = 15;
  // const { hospital, user, people } = route.params;
  const [timer, setTimer] = useState(10);
  const [timers, setTimers] = useState(15);

  const [isActive, setisActive] = useState(true);
  const timerHolder = timers * people;
  const hours = timerHolder / 60;
  console.log("hourse", hours);

  var rhourse = Math.floor(hours);

  var minutes = (hours - rhourse) * 60;
  var rminutes = Math.round(minutes);

  const alertcreated = () => {
    Alert.alert(
      "Conformation",
      "You are not In Hospital premesis would you like to leave queue?",
      [
        {
          text: "YES",
          onPress: () => {
            removeQueue();
          },
          style: "cancel",
        },
        { text: "NO", onPress: () => console.log("OK Pressed") },
      ]
    );
  };

  useEffect(() => {
    if (destinationalert > 2) {
      alertcreated();
      // removeQueue();
    }

    // removeQueue();

    if (rhourse === 0 && rminutes === 0) {
      // clearInterval(interval);
      onProceed();
    }
    // else if (isActive) {
    //   interval = setInterval(() => {
    //     setTimer((timer) => timer - 1);
    //   }, 100000);
    // }
    // return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#206E7", height: "80%", paddingBottom: 10 }}
    >
      <View style={StyleSheetMethods.text} key={timer}>
        <Text style={StyleSheetMethods.viewsText}>
          {people} {item} ({rhourse}:{rminutes}:00 sec)
        </Text>
      </View>
      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        key={item}
      >
       
      </View> */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <View style={StyleSheetMethods.btndoc}>
          <TouchableOpacity
            disabled={true}
            onPress={() => {
              onDeclineLeave();
              // removeQueue();
            }}
          >
            <Text
              style={{
                opacity: 0.5,
                fontWeight: "bold",
                fontSize: 20,
                color: "white",
              }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>

        <View style={StyleSheetMethods.btndoc}>
          <TouchableOpacity
            onPress={() => {
              onReset();
              removeQueue();
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CountDownTimer;
