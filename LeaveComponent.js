import React, { Component, useState, useEffect } from "react";
//import Modal from "react-native-modal";
import ModalAlert from "./alert";
//import LinearGradient from "react-native-linear-gradient";
import StyleSheetMethods from "./Styles/StyleSheet";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
import ComponentsHolder from "./ComponentsHolder";
import { min } from "react-native-reanimated";

const CountDownTimer = ({
  item,
  id,
  onDeclineLeave,
  onReset,
  onProceed,
  removeQueue,
  userId,
  people,
  currentdata,
  destinationalert,
  estimatedHour,
  estimatedmins,
  defaultTime,
  hospitalname,
}) => {
  const [timers, setTimers] = useState(10);
  const [mins, setMins] = useState(58);
  const [secs, setSecs] = useState(0);
  const [hrs, setHrs] = useState(2);
  const [getval, setVal] = useState();
  const [isActive, setisActive] = useState(true);
  console.log("userid", userId);
  const timerHolder = timers * people;
  const hours = timerHolder / 60;
  const currentId = currentdata.filter((item) => {
    item.id === userId;
  });
  console.log("foundyourid", currentId);
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
            // removeQueue();
          },
          style: "cancel",
        },
        { text: "NO", onPress: () => console.log("yes") },
      ]
    );
  };

  const fetchData = async () => {
    const response = await fetch(`http://127.0.0.1:3000/queues`);
    const json = await response.json();

    const currentId = json.filter(
      (filterItems) => filterItems.queueState === "in-Process"
      // filterItems.hospital === "Doctors Hospital" &&
    );
    console.log("thisisdata", currentId);
    currentId.map((item) => {
      if (item.id === userId) {
        console.log("cut", item.id);
        setVal(item.id);
      }
    });
  };

  useEffect(() => {
    // setHrs(rhourse);
    // setMins(rminutes);

    if (destinationalert > 50) {
      alertcreated();
      // ModalAlert();
      // removeQueue();
    }

    // removeQueue();

    if (hrs === 0 && mins === 0 && secs === 0) {
      // clearInterval(interval);
      onProceed();
    }

    const timerId = setInterval(() => {
      console.log("timer", secs % 3);
      if (mins % 3 === 0) {
        console.log("runnded");
        fetchData();
      }

      if (secs <= 0) {
        if (mins <= 0 && hrs <= 0) console.log("called");
        else {
          setMins((m) => m - 1);
          setSecs(59);
          if (mins <= 0) {
            setHrs((h) => h - 1);
            setMins(59);
            setSecs(59);
          }
        }
      } else setSecs((s) => s - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [secs, mins, hrs]);

  return (
    <SafeAreaView
      key={id}
      style={{
        // backgroundColor: "#206E7",
        height: "80%",
        paddingBottom: 10,
        // backgroundColor: "green",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View style={StyleSheetMethods.text} key={people}>
        <Text style={StyleSheetMethods.viewsText}>
          {people} {item}
          {people > 0 && estimatedmins !== "" ? (
            <Text>
              ( {estimatedHour}:{estimatedmins} min )
            </Text>
          ) : (
            <Text style={StyleSheetMethods.timers}>
              ({estimatedHour}:{defaultTime} min)
            </Text>
          )}
        </Text>
      </View>
      <View>
        {getval === userId ? (
          <View>
            <ModalAlert onProceed={onProceed} />
          </View>
        ) : null}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 50,
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
