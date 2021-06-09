import React, { Component, useState, useEffect, useRef } from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import Modal from "react-native-modal";
import ModalAlert from "./alert";
//import LinearGradient from "react-native-linear-gradient";
import StyleSheetMethods from "./Styles/StyleSheet";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  //Modal,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Platform,
} from "react-native";
//import ComponentsHolder from "./ComponentsHolder";
import { min } from "react-native-reanimated";
import { controllers } from "chart.js";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const CountDownTimer = ({
  item,
  id,
  updateQueue,
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
  defaulthours,
  hospitalname,
}) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [timers, setTimers] = useState(false);
  const [mins, setMins] = useState();
  const [secs, setSecs] = useState(0);
  const [hrs, setHrs] = useState();
  const [getval, setVal] = useState();
  const [isActive, setisActive] = useState(true);
  const [pushNotificaton, setPushNotificatoin] = useState(false);
  console.log("userid", userId);

  const timeSetting = () => {
    if (estimatedHour === "" && estimatedmins === "") {
      setMins(defaultTime);
    } else {
      setHrs(estimatedHour);
      setMins(estimatedmins);
    }
  };

  console.log("idddddddddddd", getval);
  // console.log("hrs", hrs);
  // console.log("mins", mins);
  // console.log("secs", secs);

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
    );

    currentId.map((item) => {
      if (item.id === userId) {
        setVal(item.id);
      }
    });
  };
  if (isActive === true) {
    timeSetting();
    setisActive(false);
  }

  useEffect(() => {
    //registerForPushNotificationsAsync();
    let isMounted = true;
    if (getval === userId && pushNotificaton === false) {
      schedulePushNotification();
      setPushNotificatoin(true);
    }

    if (isMounted) {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    if (destinationalert > 50 && mins % 10 === 0) {
      alertcreated();
    }

    if (mins === 0 && secs === 1) {
      onProceed();
      updateQueue();
    }
    if (hrs === 0 && mins === 0 && secs === 0) {
      onProceed();
      updateQueue();
    }

    const timerId = setInterval(() => {
      console.log("timer", secs % 3);
      if (secs % 10 === 0) {
        console.log("runnded");
        fetchData();
      }

      if (secs <= 0) {
        if (mins <= 0 && hrs <= 0) {
          onProceed();
          console.log("called");
        } else {
          setMins((m) => m - 1);
          setSecs(59);
          if (mins <= 0) {
            if (hrs > 0) {
              setHrs((h) => h - 1);
            }

            setMins(59);
            setSecs(59);
          }
        }
      } else setSecs((s) => s - 1);
    }, 1000);
    return () => {
      clearInterval(timerId);
      isMounted = false;
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
          <Text style={StyleSheetMethods.timerss}>{people}</Text>
          {item}
          {mins !== "" ? (
            mins !== "" && hrs !== "" ? (
              <Text style={StyleSheetMethods.timers}>
                {hrs}:{mins}:{secs} min
              </Text>
            ) : (
              <Text style={StyleSheetMethods.timers}>
                {mins}:{secs} min
              </Text>
            )
          ) : (
            <Text style={StyleSheetMethods.timers}>
              {mins}:{secs} min
            </Text>
          )}
        </Text>
      </View>
      <View>
        {getval === userId ? (
          <View>
            {console.log("yyyyyyyyyy")}
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
              updateQueue();
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
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
