import { VideoExportPreset } from "expo-image-picker";
import React, { Component, useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import IntialComponent from "./Counter";
import StyleSheetMethods from "./Styles/StyleSheet";
import DoctorsComp from "./DoctorsComponent";
import CountDownTimer from "./LeaveComponent";
import UsersTable from "./tables";
import axios from "axios";
import Complete from "./Complete";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

const ComponentsHolder = ({ route, navigation, currentH }) => {
  const { hospital, user } = route.params;
  const collection = {};
  const [text, setText] = useState([
    { text2: "Would you like to Join the Virtual Queue" },
  ]);
  const [getId, setId] = useState("");
  const [queueState, setQueueState] = useState("Waiting");
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
    navigation.navigate("FORM");
    setTimeout(function () {
      alert("you are at intial state");
    }, 2000);
  };
  const onProceed = () => {
    setLastState([...lastState, { lasttext: "Have You Seen By the Doctor?" }]);
    setQueueState("in-Process");
    setNextState("");
    setIncrement("3");
  };
  const onReset = () => {
    navigation.navigate("FORM");
  };
  const onLastStateConform = () => {
    setComplete([
      ...complete,
      {
        completeText: "THANKS FOR BEING HERE.YOUR VISIT IS COMPLETED!",
      },
    ]);
    setQueueState("Completed");
    setLastState("");
    setIncrement("4");
  };

  const postQueueApiCall = async (url, data) => {
    console.log("postqueue data: ", data);
    let headers = { "content-type": "application/json" };
    let response = await axios({
      method: "POST",
      url,
      data: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    console.log("queue response post= ", response.data.message);
    setId(response.data.message);
  };
  const putQueueApiCall = async (url, data) => {
    console.log("postqueue data: ", data);
    let headers = { "content-type": "application/json" };
    let response = await axios({
      method: "PUT",
      url,
      data: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    console.log("queue response put= ", response);
  };
  const onAddQueue = async () => {
    // const queueState = "intial state";
    // const id = getId;
    const notes = "yes i am in ";
    const priority = "Emergency";
    // collection.id = id;
    collection.hospital = hospital;
    collection.queueState = queueState;
    collection.notes = notes;
    collection.priority = priority;
    collection.user = user;
    const firstid = collection.id;
    var postQueueApiUrl = "http://localhost:3000/queue";
    postQueueApiCall(postQueueApiUrl, collection);
  };
  const onUpdateQueue = async () => {
    console.log("state id", getId);
    // const notes = "yes i am in ";
    const priority = "Emergency";
    // collection.id = id;
    collection.hospital = hospital;
    collection.queueState = queueState;
    // collection.notes = notes;
    collection.priority = priority;
    collection.user = user;

    var putApiUrl = `http://localhost:3000/queue/${getId}`;
    putQueueApiCall(putApiUrl, collection);
  };
  return (
    <SafeAreaView style={{ fontFamily: "Inter-Black" }}>
      <View style={StyleSheetMethods.stagebg}>
        <Text style={StyleSheetMethods.stage}>Stage: {increment}</Text>
      </View>
      <View>
        {console.log("checking QueuState", queueState)}
        {text.length > 0
          ? text.map((item) => (
              <IntialComponent
                item={item.text2}
                onConform={onConformed}
                onDecline={onDecline}
                onAddQueue={onAddQueue}
                // user={currentUser}
                // queueState={queueState}
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
                onAddQueues={onUpdateQueue}
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
              <Complete
                item={item.completeText}
                onReset={onDecline}
                onAddQueues={onUpdateQueue}
              />
            ))
          : null}
      </View>
    </SafeAreaView>
  );
};
export default ComponentsHolder;
