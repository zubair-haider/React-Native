import { StatusBar } from "expo-status-bar";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import ComponentsHolder from "./ComponentsHolder";
import { useFonts, Inter_900Black } from "expo-font";
import { PermissionsAndroid, ACCESS_FINE_LOCATION } from "react-native";
import BackButtonDemo from "./Login";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import estimatedTime from "./helperFunctions";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Dimensions,
  BackHandler,
  ToastAndroid,
} from "react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MyApp = ({ navigation, route }) => {
  const { userName, patientDisease, GetQueueState, userNameReg } = route.params;
  console.log("username", userName);
  console.log("disease", patientDisease);
  console.log("userREg", userNameReg);
  var hoursHolder = "";
  var minHolder = "";

  let [fontsLoaded] = useFonts({
    "Oswald-Bold": require("./assets/Fonts/Oswald-Bold.ttf"),
  });
  const [isEnabled, setEnableDisbale] = useState(false);
  const [defaultTime, setDefault] = useState(15);
  const [getPatient, setPatitent] = useState([]);
  const [estTimeDoctorH, setEstTimeDoctorH] = useState("00");
  const [sort, setSort] = useState(true);
  const [hospitals, setHospital] = useState([]);
  var [active, setActive] = useState(false);
  var [intialPosition, setIntialPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  if (
    (GetQueueState === "Waiting" || GetQueueState === "in-Process") &&
    sort === true
  ) {
    console.log("runnnnnnnned");
    setEnableDisbale(true);
    setSort(false);
  }

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

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  // let response = estimatedTime(first, second);
  const fetchData = async () => {
    try {
      const result = await axios("http://192.168.1.110:3000/queues");
      setPatitent(result.data);
      const response = await axios("http://192.168.1.110:3000/allhospital");
      const json = await response.data;
      setHospital(json);

      console.log("data+++++", json);
    } catch (error) {
      console.log("errrrrr0:", error);
    }
  };

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

  const currentId = getPatient.filter(
    (filterItems) => filterItems.queueState === "Waiting"
    // filterItems.hospital === "Doctors Hospital" &&
  );

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
        console.log("counter", counter);
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
  // console.log("temo", temp);
  function EnableDisabel() {
    setEnableDisbale(true);
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
  console.log("hospitql", hospitals);
  return (
    <KeyboardAwareScrollView
      shouldRasterizeIOS={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <SafeAreaView>
        <View
          style={{
            width: "100%",

            paddingBottom: 10,

            margin: "auto",
            padding: 5,
          }}
        >
          <Titles />
          {/* <BackButtonDemo /> */}
          <View>
            {temp.map((value, index) => {
              // console.log("counter", value);

              return (
                <View key={index}>
                  <View>
                    {value.dist1 < 8500 ? (
                      <View style={StyleSheetMethods.hospitalViewsGr}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <View style={styles.img}>
                            <Image
                              source={require("./assets/hospital.png")}
                              style={{
                                width: 100,
                                height: 100,
                                justifyContent: "center",
                              }}
                            />
                          </View>
                          <View style={styles.names}>
                            <Text style={styles.listextra3}>
                              {value.hospital.toUpperCase()}
                            </Text>
                            <Text style={styles.listextra2}>
                              Current Patients:{value.counter}
                            </Text>
                            <Text></Text>
                            {value.hours1 !== "" || value.mins1 !== "" ? (
                              <Text style={styles.listextra2}>
                                Estimated Waiting Time
                                <Text style={{ paddingLeft: 5 }}>
                                  {value.hours1}:{value.mins1}
                                </Text>
                                min
                              </Text>
                            ) : (
                              <Text style={styles.listextra2}>
                                Estimated Waiting Time:{estTimeDoctorH}:
                                {defaultTime} min
                              </Text>
                            )}

                            <Text style={styles.list2}>{value.dist1} KM</Text>
                          </View>
                          <View style={{ width: 90 }}>
                            <Button
                              title="Select"
                              disabled={isEnabled}
                              onPress={() => {
                                EnableDisabel();

                                navigation.navigate("QUEUE", {
                                  hospital: value.hospital,
                                  user: userName,
                                  userNameReg: userNameReg,
                                  people: value.counter,
                                  destination: value.dist1,
                                  patientDisease: patientDisease,
                                  currentId: currentId,
                                  estimatedHour: value.hours1,
                                  estimatedmins: value.mins1,
                                  defaultTime: defaultTime,
                                  defaulthours: estTimeDoctorH,
                                });
                              }}
                            ></Button>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                  <View>
                    {value.dist1 >= 8501 ? (
                      <View>
                        <View style={StyleSheetMethods.hospitalViews}>
                          <View
                            style={{
                              display: "flex",
                              // flex: 1,
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <View style={styles.img}>
                              <Image
                                source={require("./assets/hospital.png")}
                                style={{
                                  width: 120,
                                  height: 100,
                                  justifyContent: "center",
                                }}
                              />
                            </View>
                            <View style={styles.names}>
                              <Text style={styles.listextra}>
                                {value.hospital.toUpperCase()}
                              </Text>
                              <Text style={styles.listextra2}>
                                Current Patients:{value.counter}
                              </Text>
                              {value.hours1 > 0 && value.mins1 !== "" ? (
                                <Text style={styles.listextra2}>
                                  Estimated Waiting Time:{value.hours1}:
                                  {value.mins1} min
                                </Text>
                              ) : (
                                <Text style={styles.listextra2}>
                                  Estimated Waiting Time:{estTimeDoctorH}:
                                  {defaultTime} min
                                </Text>
                              )}

                              <Text style={styles.list}>{value.dist1} KM</Text>
                            </View>
                            <View style={{ width: 90 }}>
                              <Button
                                title="Select"
                                disabled={true}
                                onPress={() => {
                                  navigation.navigate("QUEUE", {
                                    hospital: value.hospital,
                                    user: userName,
                                    people: value.counter,
                                    destination: value.dist1,
                                    patientDisease: patientDisease,
                                    currentId: currentId,
                                    estimatedHour: value.hours1,
                                    estimatedmins: value.mins1,
                                    defaultTime: defaultTime,
                                    defaulthours: estTimeDoctorH,
                                  });
                                }}
                              ></Button>
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View>{active && <HideShoW />}</View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
const HideShoW = (props) => {
  return (
    <View>
      <View
        style={{
          margin: "auto",
          width: 400,
          backgroundColor: "red",
          borderColor: "red",
          shadowColor: "gray",
          shadowRadius: 15,
          borderWidth: 5,
          padding: 5,
          marginBottom: 10,
        }}
      >
        <TitleHodler />
      </View>
      <View
        style={{
          backgroundColor: "rgb(255,255,255)",
          borderColor: "green",
          shadowColor: "gray",
          shadowRadius: 5,
          borderWidth: 5,
          padding: 5,
          borderRadius: 5,
        }}
      >
        <ComponentsHolder currentH={this.props.getHospitalName} />
      </View>
    </View>
  );
};
const TitleHodler = () => {
  return (
    <View>
      <Text
        style={{
          height: 30,
          fontSize: 30,
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "bold",
          color: "white",
          fontFamily: "Inter-Black",
        }}
      >
        Doctor's Appointment
      </Text>
    </View>
  );
};

const Titles = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
      }}
    >
      <Text style={styles.headings}>Hospitals Near You</Text>
    </View>
  );
};
const styles = {
  map: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    width: "80%",
    height: "80%",
  },
  headings: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    fontSize: 22,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: "#de1256",

    backgroundColor: "white",
    marginBottom: 30,

    width: "100%",
    borderRadius: 5,
  },
  list2: {
    backgroundColor: "#98FB98",
    justifyContent: "center",

    padding: 5,
    fontWeight: "bold",
    fontSize: 10,
    color: "white",
  },
  list: {
    backgroundColor: "white",
    justifyContent: "center",

    padding: 5,
    fontWeight: "bold",
    fontSize: 11,
    color: "green",
  },
  list2: {
    backgroundColor: "#98FB98",
    justifyContent: "center",

    padding: 5,
    fontWeight: "bold",
    fontSize: 11,
    color: "black",
  },
  listextra2: {
    // backgroundColor: "#98FB98",
    justifyContent: "center",

    padding: 5,
    fontWeight: "bold",
    fontSize: 10,
    color: "black",
  },
  img: {
    // width: "40%",
  },
  names: {
    width: "30%",
  },
  listextra3: {
    backgroundColor: "#98FB98",
    justifyContent: "center",
    padding: 5,
    fontWeight: "bold",
    // width: "min-content",
    fontSize: 15,
    color: "rgb(32, 110, 121)",
  },
  listextra: {
    backgroundColor: "white",
    justifyContent: "center",
    padding: 5,
    fontWeight: "bold",
    // width: "min-content",
    fontSize: 15,
    color: "rgb(32, 110, 121)",
  },
};
export default MyApp;
