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
  const {
    hospital,
    user,
    people,
    defaulthours,
    destination,
    patientDisease,
    currentId,
    estimatedHour,
    estimatedmins,
    defaultTime,
  } = route.params;
  const collection = {};
  console.log("currentid", currentId);
  const [text, setText] = useState([
    { text2: "Would you like to Join the Virtual Queue" },
  ]);
  const [getId, setId] = useState("");
  const [getDeleteId, setDeleteId] = useState("");
  const [queueState, setQueueState] = useState("Waiting");
  const [nextState, setNextState] = useState("");
  const [lastState, setLastState] = useState("");
  const [complete, setComplete] = useState("");
  const [increment, setIncrement] = useState("1");
  const onConformed = () => {
    setNextState([
      ...nextState,
      {
        text: "people are ahead of you,your estimated time is",
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
    // alert("called");
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
    console.log("----queue response post= ", response.data);
    setId(response.data.message);
    //  setDeleteId(response.data.message);
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
    console.log("queue response put+++= ", response);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const onAddQueue = async () => {
    var currentdate = new Date();
    const startingTime =
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    const date = formatDate(currentdate);
    // currentdate.getDate() +
    // "-" +
    // (currentdate.getMonth() + 1) +
    // "-" +
    // currentdate.getFullYear();

    const notes = "yes i am in ";
    // const  = "30/3/2021";
    // collection.id = id;
    console.log("added t0 que", queueState);
    console.log("added t0 que", date);

    collection.hospital = hospital;
    collection.queueState = queueState;
    collection.notes = notes;
    collection.priority = patientDisease;
    collection.user = user;
    collection.startingTime = startingTime;
    collection.date = date;
    const firstid = collection.id;
    var postQueueApiUrl = "http://127.0.0.1:3000/queue";
    postQueueApiCall(postQueueApiUrl, collection);
  };
  const onUpdateQueue = async () => {
    console.log("updating que ");
    console.log("state id", getId);
    // const notes = "yes i am in ";
    // const priority = "Emergency";
    // collection.id = id;
    collection.hospital = hospital;
    collection.queueState = queueState;
    // collection.notes = notes;
    collection.priority = patientDisease;
    collection.user = user;

    var putApiUrl = `http://127.0.0.1:3000/queue/${getId}`;
    putQueueApiCall(putApiUrl, collection);
  };
  const removeQueue = async () => {
    console.log("delelte id", getId);
    var deleteApiUrl = `http://127.0.0.1:3000/queue/${getId}`;

    fetch(deleteApiUrl, { method: "DELETE" });
    // DeleteQueueApiCall(deleteApiUrl);
  };

  return (
    <SafeAreaView style={{ fontFamily: "Inter-Black" }} key={getId}>
      <View style={StyleSheetMethods.stagebg} key="0">
        <Text style={StyleSheetMethods.stage}>Stage: {increment}</Text>
      </View>
      <View>
        {text.length > 0
          ? text.map((item, index) => (
              <View key={index}>
                <IntialComponent
                  item={item.text2}
                  onConform={onConformed}
                  onDecline={onDecline}
                  onAddQueue={onAddQueue}
                  userId={getId}
                  id={index}
                  // user={currentUser}
                  // queueState={queueState}
                />
              </View>
            ))
          : null}
      </View>

      <View key="2">
        {lastState.length > 0
          ? lastState.map((item, index) => (
              <View key={index}>
                <DoctorsComp
                  item={item.lasttext}
                  onConformed={onLastStateConform}
                  onDeclined={onReset}
                  onAddQueues={onUpdateQueue}
                  id={index}
                />
              </View>
            ))
          : null}
        {nextState.length > 0
          ? nextState.map((item, index) => (
              <View key={index}>
                <CountDownTimer
                  onProceed={onProceed}
                  item={item.text}
                  img={item.img}
                  onDeclineLeave={onProceed}
                  onReset={onReset}
                  removeQueue={removeQueue}
                  people={people}
                  hospitalname={hospital}
                  destinationalert={destination}
                  userId={getId}
                  currentdata={currentId}
                  id={index}
                  estimatedHour={estimatedHour}
                  estimatedmins={estimatedmins}
                  defaultTime={defaultTime}
                  defaulthours={defaulthours}
                />
              </View>
            ))
          : null}
      </View>
      <View key="3">
        {complete.length > 0
          ? complete.map((item, index) => (
              <View key={index}>
                <Complete
                  item={item.completeText}
                  onReset={onDecline}
                  onAddQueues={onUpdateQueue}
                />
              </View>
            ))
          : null}
      </View>
    </SafeAreaView>
  );
};
export default ComponentsHolder;
