import { VideoExportPreset } from "expo-image-picker";
import React, { Component, useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import IntialComponent from "./Counter";
import StyleSheetMethods from "./Styles/StyleSheet";
import DoctorsComp from "./DoctorsComponent";
import CountDownTimer from "./LeaveComponent";
import Complete from "./Complete";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

const ComponentsHolder = ({ navigation }) => {
  const [text, setText] = useState([
    { text2: "Would you like to Join the Virtual Queue" },
  ]);
  const [nextState, setNextState] = useState("");
  const [lastState, setLastState] = useState("");
  const [complete, setComplete] = useState("");
  const [increment, setIncrement] = useState("1");
  const onConformed = () => {
    setNextState([
      ...nextState,
      {
        text: "people are ahead of you,your estimated time is 4-0 hours",
      },
    ]);
    setText("");
    setIncrement("2");
  };
  const onDecline = () => {
    navigation.navigate("REGISTERATION FORM");
    setTimeout(function () {
      alert("you are at intial state");
    }, 2000);
  };
  const onProceed = () => {
    setLastState([...lastState, { lasttext: "Have You Seen By the Doctor?" }]);
    setNextState("");
    setIncrement("3");
  };
  const onReset = () => {
    navigation.navigate("REGISTERATION FORM ");
  };
  const onLastStateConform = () => {
    setComplete([
      ...complete,
      {
        completeText: "THANKS FOR BEING HERE.YOUR VISIT IS COMPLETED!",
      },
    ]);
    setLastState("");
    setIncrement("4");
  };

  return (
    <SafeAreaView style={{ fontFamily: "Inter-Black" }}>
      <View style={StyleSheetMethods.stagebg}>
        <Text style={StyleSheetMethods.stage}>Stage: {increment}</Text>
      </View>
      <View>
        {text.length > 0
          ? text.map((item) => (
              <IntialComponent
                item={item.text2}
                onConform={onConformed}
                onDecline={onDecline}
              />
            ))
          : null}
      </View>

      <View>
        {lastState.length > 0
          ? lastState.map((item) => (
              <DoctorsComp
                item={item.lasttext}
                onConformed={onLastStateConform}
                onDeclined={onReset}
              />
            ))
          : null}
        {nextState.length > 0
          ? nextState.map((item) => (
              <CountDownTimer
                setToIntial={onProceed}
                item={item.text}
                img={item.img}
                onDeclineLeave={onProceed}
                onReset={onReset}
              />
            ))
          : null}
      </View>
      <View>
        {complete.length > 0
          ? complete.map((item) => (
              <Complete item={item.completeText} onReset={onReset} />
            ))
          : null}
      </View>
    </SafeAreaView>
  );
};
export default ComponentsHolder;
