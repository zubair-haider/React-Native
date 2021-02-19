import { VideoExportPreset } from "expo-image-picker";
import React, { Component, useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import IntialComponent from "./Counter";

import DoctorsComp from "./DoctorsComponent";
import CountDownTimer from "./LeaveComponent";
import Complete from "./Complete";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

const ComponentsHolder = () => {
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
    alert("you are at intial state");
  };
  const onProceed = () => {
    setLastState([...lastState, { lasttext: "Have You Seen By the Doctor?" }]);
    setNextState("");
    setIncrement("3");
  };
  const onReset = () => {
    setText([
      ...text,
      {
        text2: "Would you like to Join the Virtual Queue",
      },
    ]);
    setNextState("");
    setLastState("");
    setComplete("");
    setIncrement("1");
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
      <View
        style={{
          height: 50,
          width: 150,
          backgroundColor: "green",
          flex: 1,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        <Text
          style={{
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Inter_900Black",
            fontSize: 20,
            padding: 10,
          }}
        >
          Stage: {increment}
        </Text>
      </View>
      <View>
        {console.log("length", text.length)}
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
