import "react-native-gesture-handler";
import React, { Component, useEffect, useState, useCallback } from "react";

import StyleSheetMethods from "./Styles/StyleSheet";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ModalInPut from "./ModalInput";
import { useIsFocused } from "@react-navigation/native";
import { Card, ThemeConsumer, Tooltip } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const UserList = ({ navigation, route }) => {
  const {
    userName,
    patientDisease,
    user,
    hospital,
    userQueueState,
    id,
    phone,
    // getthis,
  } = route.params;
  //const {} = user
  // console.log("getthis", getthis);

  let UserhospitalList = "";
  let GetQueueState = "";
  let OnStateComplete = "";

  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(true);
  const [getPatient, setPatitent] = useState("");
  const [getHospital, setHospital] = useState("");
  const [Enable, SetEnable] = useState(false);
  const isFocused = useIsFocused();
  const [UserHospitalList, SetUserHospitalList] = useState("");
  const fetchData = async () => {
    try {
      const result = await axios("http://192.168.1.110:3000/detail");
      console.log("queuesdata+++++", result.data);
      setPatitent(result.data);
      const response = await fetch("http://192.168.1.110:3000/queues");
      const json = await response.json();
      setHospital(json);

      console.log("data+++++", json);
    } catch (error) {
      console.log("errrrrr0:", error);
    }
  };
  // if (getthis !== "" && getthis !== undefined && loading == true) {
  //   fetchData();
  //   console.log("ridfdfdf");
  // }
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("done");
    });
    console.log("this is", interval);
    return () => {
      clearTimeout(interval);
      unsubscribe;
    };
  }, [navigation]);
  // if (getPatient !== "") {
  //   Data();
  // }
  if (getPatient !== "" && getHospital !== "") {
    getPatient.map((value, index) => {
      let obj = {};
      if (value.phone === phone) {
        const GetUserHospital = getHospital.filter((item, index) =>
          //   value.name === item.user
          // );
          {
            if (value.name === item.user) {
              GetQueueState = item.queueState;
              obj.user = value.name;
              obj.patientDisease = value.disease;
              obj.hospital = item.hospital;
              obj.userQueueState = item.queueState;
              obj.id = item.id;
              obj.phone = value.phone;
              return obj;
            }
          }
        );
        UserhospitalList = [obj];
      }
    });

    // return UserHospitals;
  }

  if (UserhospitalList.length > 0 && Enable == false) {
    console.log("length");
    UserhospitalList.map((value, index) => {
      if (value.userQueueState === "Completed") {
        console.log("runnnnnned", value.userQueueState);
        SetEnable(true);
        OnStateComplete = value.userQueueState;
      }
    });
  }

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          //flex: 1,
          alignItems: "flex-end",
          marginVertical: 10,
          paddingRight: 16,
          // //position: "absolute",
          // zIndex: -1,
        }}
      >
        <TouchableOpacity
          // disabled={true}
          onPress={() => {
            if (Enable) {
              navigation.navigate("Disease", {
                userName: user,
                userNameReg: userName,
                patientDisease: patientDisease,
                GetQueueState: GetQueueState,
              });
            } else {
              navigation.navigate("HOSPITALS LIST", {
                userName: user,
                userNameReg: userName,
                patientDisease: patientDisease,
                GetQueueState: GetQueueState,
              });
            }
          }}
          style={{
            backgroundColor: "#3fb5bf",
            display: "flex",
            flexDirection: "row",
            padding: 10,
            width: "20%",
            borderRadius: 10,
            // borderTopRightRadius: 200,
            // borderBottomRightRadius: 200,
          }}
        >
          <Icon size={44} color="white" name="add" />
          {/* <Text
            style={{
              //opacity: 0.5,
              fontWeight: "bold",
              fontSize: 20,
              color: "#FFFEFC",
            }}
          ></Text> */}
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={{ borderRadius: 50 }}>
            {UserhospitalList.length > 0
              ? UserhospitalList.map((value, index) => {
                  // if (value.userQueueState === "Completed") {
                  //   SetEnable(true);
                  // }
                  return (
                    <View key={index}>
                      <Card>
                        <Card.Title>{value.hospital}</Card.Title>
                        <Card.Divider />
                        <Card.Image
                          source={require("./assets/hospital.png")}
                          style={
                            {
                              //   maxWidth: "30%",
                              //   //justifyContent: "center",
                              //   alignSelf: "center",
                              //   alignItems: "center",
                              //   alignContent: "center",
                            }
                          }
                        ></Card.Image>
                        <Card.Divider />

                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <Text style={{ paddingTop: 5 }}>
                            Queue State: {value.userQueueState}
                          </Text>

                          <TouchableOpacity
                            disabled={Enable}
                            onPress={() => {
                              navigation.navigate("QUEUE", {
                                user: value.user,
                                patientDisease: value.patientDisease,
                                hospital: value.hospital,
                                userQueueState: value.userQueueState,
                                id: value.id,
                                phone: value.phone,
                              });
                            }}
                            style={{
                              backgroundColor: "#D64B59",
                              display: "flex",
                              flexDirection: "row",
                              padding: 5,
                              width: "30%",
                              borderRadius: 5,
                              justifyContent: "center",
                            }}
                          >
                            <Tooltip
                              popover={
                                Enable == true ? (
                                  <Text
                                    style={{
                                      //   padding: 5,
                                      //   backgroundColor: "green",
                                      color: "white",
                                      //   borderRadius: 5,
                                    }}
                                  >
                                    visit is completed
                                  </Text>
                                ) : null
                              }
                            >
                              <Text
                                style={{
                                  opacity: 0.5,
                                  fontWeight: "bold",
                                  fontSize: 15,
                                  color: "white",
                                }}
                              >
                                Go
                              </Text>
                            </Tooltip>
                            {/* <Icon size={24} color="white" name="arro" /> */}
                          </TouchableOpacity>
                        </View>
                      </Card>
                    </View>
                  );
                })
              : null}
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default UserList;
