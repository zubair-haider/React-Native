import React, { Component, useEffect, useState } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
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
  } = route.params;
  let UserhospitalList = "";
  const [getPatient, setPatitent] = useState("");
  const [getHospital, setHospital] = useState("");
  const [UserHospitalList, SetUserHospitalList] = useState("");
  const fetchData = async () => {
    try {
      const result = await axios("http://192.168.2.71:3000/detail");
      console.log("queuesdata+++++", result.data);
      setPatitent(result.data);
      const response = await fetch("http://192.168.2.71:3000/queues");
      const json = await response.json();
      setHospital(json);

      console.log("data+++++", json);
    } catch (error) {
      console.log("errrrrr0:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
        console.log("get", GetUserHospital);
        console.log("yyyyyyyyy", obj);
      }
    });

    // return UserHospitals;
  }
  console.log("useros", UserhospitalList);
  return (
    <View>
      <View
        style={{
          alignItems: "flex-end",
          marginVertical: 10,
          paddingRight: 16,
        }}
      >
        <TouchableOpacity
          // disabled={true}
          onPress={() => {
            navigation.navigate("HOSPITALS LIST", {
              userName: userName,
              patientDisease: patientDisease,
            });
          }}
          style={{
            backgroundColor: "#3fb5bf",
            display: "flex",
            flexDirection: "row",
            padding: 20,
            width: "60%",
            borderRadius: 5,
          }}
        >
          <Icon size={24} color="white" name="add" />
          <Text
            style={{
              opacity: 0.5,
              fontWeight: "bold",
              fontSize: 20,
              color: "#FFFEFC",
            }}
          >
            VISIT
          </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={{ borderRadius: 50 }}>
            {UserhospitalList.length > 0
              ? UserhospitalList.map((value, index) => {
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
                        {/* <Text style={{ marginBottom: 10 }}>
                      The idea with React Native Elements is more about
                      component structure than actual design.
                    </Text> */}
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
                            // disabled={true}
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
                              backgroundColor: "#3fb5bf",
                              display: "flex",
                              flexDirection: "row",
                              padding: 5,
                              width: "30%",
                              borderRadius: 5,
                              justifyContent: "center",
                            }}
                          >
                            <Icon size={24} color="white" name="add" />
                            <Text
                              style={{
                                opacity: 0.5,
                                fontWeight: "bold",
                                fontSize: 15,
                                color: "#FFFEFC",
                              }}
                            >
                              VISIT
                            </Text>
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
