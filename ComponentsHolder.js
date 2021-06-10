import { VideoExportPreset } from "expo-image-picker";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { Component, useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, View, Platform } from "react-native";
import IntialComponent from "./Counter";
import StyleSheetMethods from "./Styles/StyleSheet";
import {
  PermissionsAndroid,
  ACCESS_FINE_LOCATION,
  Dimensions,
} from "react-native";
import DoctorsComp from "./DoctorsComponent";
import LeaveComponent from "./LeaveComponent";
import UsersTable from "./tables";
import axios from "axios";
//import requestLocationPermission from "./helperFunctions";
import Complete from "./Complete";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ComponentsHolder = ({ route, navigation, currentH }) => {
  const { prevRoute } = route.params;
  if (prevRoute === "login") {
    //api call
  }
  const {
    hospital,
    userNameReg,
    user,
    people, //
    // defaulthours,
    destination, //
    patientDisease,
    currentId, //
    estimatedHour, //
    estimatedmins, //
    // defaultTime, //
    userQueueState,
    id,
    phone,
  } = route.params;
  const collection = {};
  console.log("hospital", hospital);
  console.log("user", user);
  console.log("userName Reg", userNameReg);
  console.log("patientDisease", patientDisease);
  console.log("userQueue", userQueueState);
  console.log("id", id);
  console.log("phone", phone);
  console.log("people", people);
  console.log("defaulthours", defaulthours);
  console.log("defaultTime", defaultTime);
  console.log("estimatedHout", estimatedHour);
  console.log("mins", estimatedmins);
  console.log("phone", phone);
  const [text, setText] = useState([
    { text2: "Would you like to Join the Virtual Queue" },
  ]);
  var [intialPosition, setIntialPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [userName, setUserName] = useState("");
  const [usernameEnable, setuserNameEnable] = useState(false);
  const [hospitals, setHospital] = useState([]);
  const [getPatient, setPatitent] = useState([]);
  const [getPeople, setPeople] = useState("");
  const [defaultTime, setDefaultMins] = useState(15);
  const [defaulthours, setDefaultHrs] = useState(0);
  const [estimatedHours, setEstimatedHours] = useState("");
  const [estimatedMins, setEstimatedMins] = useState("");
  const [distance, setDistance] = useState("");
  const [tempLoading, SetTempLoading] = useState(true);
  const [getId, setId] = useState("");
  const [getIdLoading, setIdLoading] = useState(true);
  const [getDeleteId, setDeleteId] = useState("");
  const [queueState, setQueueState] = useState("Waiting");
  const [nextState, setNextState] = useState("");
  const [lastState, setLastState] = useState("");
  const [complete, setComplete] = useState("");
  const [increment, setIncrement] = useState("1");
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          // title: "Hospital Management",
          // message: "App access to your location ",
        }
      );
      console.log("hrfgfg", granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("You can use the location");
        // alert(" location is turned On");
      } else {
        console.log(
          "location permission denied"
          // PermissionsAndroid.RESULTS.GRANTED
        );
        alert("Location permission denied please Turn on Location");
      }
    } catch (err) {
      console.warn(err);
      console.log("hrfgfg", err);
    }
  }
  if (user !== undefined && usernameEnable == false) {
    console.log("userruneed++++++");
    setUserName(user);
    setuserNameEnable(true);
  }
  if (usernameEnable == false && userNameReg !== undefined) {
    console.log("userREgruneed++++++");
    setUserName(userNameReg);
    setuserNameEnable(true);
  }
  if (
    id !== undefined &&
    userQueueState === "Waiting" &&
    getIdLoading === true
  ) {
    console.log("waiting runnnnnnnnned");
    setId(id);
    setIdLoading(false);
    setQueueState("in-Process");
  }
  if (
    id !== undefined &&
    userQueueState === "in-Process" &&
    getIdLoading === true
  ) {
    console.log("inprocess runnnnnnnnned");
    setId(id);
    setIdLoading(false);
    setQueueState("in-Process");
  }

  useEffect(() => {
    fetchData();
    requestLocationPermission();
    const location = navigator.geolocation.getCurrentPosition(
      (position) => {
        var lat = parseFloat(position.coords.latitude);
        var lng = parseFloat(position.coords.longitude);
        var initialRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setIntialPosition(initialRegion);
        console.log("location of user++", initialRegion);
      },

      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  // const currentId = getPatient.filter(
  //   (filterItems) => filterItems.queueState === "Waiting"
  //   // filterItems.hospital === "Doctors Hospital" &&
  // );

  function formatDate(tDate) {
    var d = new Date(tDate),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  function formatdbDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function getTimeCalc(hospitalname) {
    const array1 = [];
    var hoursHolder = "";
    var minHolder = "";
    var counter = 0;

    function getSum(total, num) {
      return total + Math.round(num);
    }
    getPatient.map((value, index) => {
      var dbDate = value.date;
      var TodayDate = new Date();
      const currentDate = formatDate(TodayDate);
      const preDate = formatdbDate(dbDate);
      // setCurrentDate(currentDate);
      if (
        value.hospital === hospitalname &&
        preDate === currentDate &&
        value.queueState === "Waiting"
      ) {
        counter++;
      }
      if (
        value.queueState === "in-Process" &&
        value.hospital === hospitalname &&
        preDate === currentDate
      ) {
        if (
          value.processTime !== "" &&
          value.startingTime !== "" &&
          value.processTime !== null &&
          value.startingTime !== null
        ) {
          const timevalue = estimatedTime(
            value.processTime,
            value.startingTime
          );
          array1.push(timevalue);
          const numbers = array1.reduce(getSum, 0);
          const division = numbers / array1.length;
          const result = division.toFixed(0);
          console.log("result++++", result);
          if (result > 59) {
            const hours = result / 60;
            var rhourse = Math.floor(hours);
            var minutes = (hours - rhourse) * 60;
            var rminutes = Math.round(minutes);
            hoursHolder = rhourse;
            minHolder = rminutes;
          } else {
            minHolder = result;
          }
        }
      }
    });

    return [hoursHolder, minHolder, counter];
  }
  function sorting() {
    let array = [];
    hospitals.map((value, index) => {
      let collection = {};
      var lat1 = value.latitude;
      var lng1 = value.longitude;
      var lat2 = intialPosition.latitude;
      var lng2 = intialPosition.longitude;
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var radlon1 = (Math.PI * lng1) / 180;
      var radlon2 = (Math.PI * lng2) / 180;
      var theta = lng1 - lng2;

      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      let time = getTimeCalc(value.hospital);
      const hours1 = time[0];
      const mins1 = time[1];
      const counter = time[2];
      var hoursvalue = "";
      var minsValue = "";
      if (hours1 === "" && mins1 === "") {
        hoursvalue = 0;
        minsValue = 15;
      } else {
        hoursvalue = hours1;
        minsValue = mins1;
      }

      //Get in in kilometers
      dist = dist * 1.609344;
      let dist1 = dist.toFixed(2);
      collection.dist1 = dist1;
      collection.hoursvalue = hoursvalue;
      collection.minsValue = minsValue;
      collection.counter = counter;
      collection.hospital = value.hospital;
      collection.hours1 = hours1;
      collection.mins1 = mins1;
      array.push(collection);
    });
    array.sort((a, b) => (a.dist1 > b.dist1 ? 1 : -1));
    return array;
  }
  let temp = sorting();
  if (temp !== "" && tempLoading === true) {
    temp.filter((value, index) => {
      if (value.hospital === hospital) {
        setPeople(value.counter);
        // setDefaultMins(value.minsValue);
        // setDefaultHrs(value.hoursvalue);
        setEstimatedHours(value.hours1);
        setEstimatedMins(value.mins1);

        setDistance(value.dist1);
        SetTempLoading(false);
      }
    });
  }

  function estimatedTime(first, second) {
    var hms = first;
    var hms2 = second;
    var a = hms.split(":");
    var a1 = hms2.split(":");
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    var seconds1 = +a1[0] * 60 * 60 + +a1[1] * 60 + +a1[2];
    var minutes = seconds / 60;
    var minutes1 = seconds1 / 60;
    var difference = minutes - minutes1;

    return difference;
  }

  const fetchData = async () => {
    try {
      const result = await axios("http://192.168.2.71:3000/queues");
      setPatitent(result.data);
      const response = await axios("http://192.168.2.71:3000/allhospital");
      const json = await response.data;
      setHospital(json);

      console.log("data+++++", json);
    } catch (error) {
      console.log("errrrrr0:", error);
    }
  };
  const [getState, setState] = useState(true);
  if (userQueueState === "Waiting" && getState === true) {
    console.log("onconfromed run");
    onConformed();
    setState(false);
  }

  function onConformed() {
    setNextState([
      ...nextState,
      {
        text: "people are ahead of you,your estimated time is",
      },
    ]);
    setText("");
    setIncrement("2");
  }
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
    // console.log("pushToken", expoPushToken);

    const notes = "yes i am in ";
    // const  = "30/3/2021";
    // collection.id = id;
    const priority = "high";
    console.log("added t0 que", queueState);
    console.log("added t0 que", date);

    collection.hospital = hospital;
    collection.queueState = queueState;
    collection.notes = notes;
    collection.priority = patientDisease;
    collection.user = userName;
    collection.startingTime = startingTime;
    collection.date = date;
    const firstid = collection.id;
    var postQueueApiUrl = "http://192.168.2.71:3000/queue";
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
    collection.user = userName;

    var putApiUrl = `http://192.168.2.71:3000/queue/${getId}`;
    putQueueApiCall(putApiUrl, collection);
  };
  const removeQueue = async () => {
    console.log("delelte id", getId);
    var deleteApiUrl = `http://192.168.2.71:3000/queue/${getId}`;

    fetch(deleteApiUrl, { method: "DELETE" });
  };

  console.log("++++++++++++++++++++++++");
  console.log("defaulthourse", defaulthours);
  console.log("estimatedHOurs", estimatedHours);
  console.log("estimatedMins", estimatedMins);
  console.log("distance", distance);
  console.log("people", getPeople);
  console.log("getlaoding", getIdLoading);
  console.log("userNameReg__________________________", userName);

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
                <LeaveComponent
                  onProceed={onProceed}
                  item={item.text}
                  img={item.img}
                  updateQueue={onUpdateQueue}
                  onReset={onReset}
                  removeQueue={removeQueue}
                  people={getPeople}
                  hospitalname={hospital}
                  destinationalert={destination}
                  userId={getId}
                  currentdata={currentId}
                  id={index}
                  estimatedHour={estimatedHours}
                  estimatedmins={estimatedMins}
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
