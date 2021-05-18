//import "react-native-gesture-handler";
//import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
// import { createStackNavigator } from "@react-navigation/stack";
// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import StyleSheetMethods from "./Styles/StyleSheet";
import axios from "axios";
import ComponentsHolder from "./ComponentsHolder";
import { useFonts, Inter_900Black } from "expo-font";
import { PermissionsAndroid, ACCESS_FINE_LOCATION } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { set } from "react-native-reanimated";
import { counter } from "@fortawesome/fontawesome-svg-core";
const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//const Stack = createStackNavigator();

const MyApp = ({ navigation, route }) => {
  const { userName, patientDisease } = route.params;
  var hoursHolder = "";
  var minHolder = "";

  let [fontsLoaded] = useFonts({
    "Oswald-Bold": require("./assets/Fonts/Oswald-Bold.ttf"),
  });
  var [active, setActive] = useState(false);
  var [intialPosition, setIntialPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [hospitalsname, sethospitalsName] = useState();
  const [getstateh, setStateh] = useState(true);
  const [currentdate, setCurrentDate] = useState();
  const [defaultTime, setDefault] = useState(15);
  const [minsG, setMinsG] = useState("");
  const [minsJ, setMinsJ] = useState("");
  const [minsD, setMinsD] = useState("");
  const [minsS, setMinsS] = useState("");
  const [loading, setLoading] = useState(true);
  const [getPatient, setPatitent] = useState([]);
  // const [estTimeGeneralH, setEstTimeGeneralH] = useState("00");
  // const [estTimeSheikhH, setEstTimeSheikhH] = useState("00");
  const [estTimeDoctorH, setEstTimeDoctorH] = useState("00");
  // const [estTimejinnah, setEstTimeJinnah] = useState("00");
  // const [getGeneralH, setGeneralH] = useState("");
  // const [getSheikhH, setSheikhH] = useState("");
  // const [getDoctorH, setDoctorH] = useState("");
  const [hospitals, setHospital] = useState([
    // {
    //   id: 1,
    //   latitude: 31.4797,
    //   longitude: 74.2804,
    //   userName: "Doctors Hospital",
    //   img: require("./assets/7.jpg"),
    // },
    // {
    //   id: 2,
    //   latitude: 31.5082,
    //   longitude: 74.3086,
    //   userName: "Sheikh Zaid",
    //   img: require("./assets/download.jpeg"),
    // },
    // {
    //   id: 3,
    //   latitude: 31.4846,
    //   longitude: 74.2974,
    //   userName: "Jinnah Hospital",
    //   img: require("./assets/jinnah.jpg"),
    // },
    // {
    //   id: 4,
    //   latitude: 31.4545,
    //   longitude: 74.351,
    //   userName: "General Hospital Lahore",
    //   img: require("./assets/general.jpg"),
    // },
  ]);
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          // title: "Finder",
          // message: "Finder App access to your location ",
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
        // alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
      console.log("hrfgfg", err);
    }
  }
  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:3000/queues");
      setPatitent(result.data);
      const response = await fetch("http://192.168.1.110:3000/allhospital");
      const json = await response.json();
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
  }, [location]);
  // if (hospitalsname !== undefined && getstateh === true) {
  //   hospitalsname.filter((filterhospital) => {
  //     console.log("hospitals", filterhospital.hospital);
  //     setHospital([
  //       ...hospitals,
  //       {
  //         id: filterhospital.id,
  //         latitude: filterhospital.latitude,
  //         longitude: filterhospital.longitude,
  //         userName: filterhospital.hospital,
  //       },
  //     ]);
  //   });
  //   setStateh(false);
  // }

  // const currentItems = getPatient.filter(
  //   (filterItems) =>
  //     filterItems.hospital === "Doctors Hospital" &&
  //     filterItems.queueState !== "Completed" &&
  //     currentdate === formatdbDate(filterItems.date)
  // );
  const currentId = getPatient.filter(
    (filterItems) => filterItems.queueState === "Waiting"
    // filterItems.hospital === "Doctors Hospital" &&
  );
  // const currentItemsJinnah = getPatient.filter(
  //   (filterItems) =>
  //     filterItems.hospital === "Jinnah Hospital" &&
  //     filterItems.queueState !== "Completed" &&
  //     currentdate === formatdbDate(filterItems.date)
  // );
  // const currentItemsShiekh = getPatient.filter(
  //   (filterItems) =>
  //     filterItems.hospital === "Sheikh Zaid" &&
  //     filterItems.queueState !== "Completed" &&
  //     currentdate === formatdbDate(filterItems.date)
  // );
  // const currentItemsGeneral = getPatient.filter(
  //   (filterItems) =>
  //     filterItems.hospital === "General Hospital Lahore" &&
  //     filterItems.queueState !== "Completed" &&
  //     currentdate === formatdbDate(filterItems.date)
  // );
  // if (getPatient.length > 0 && loading === true) {
  //   getTimeCalc(getPatient);
  //   setLoading(false);
  // }
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
    // const arrayjinnah = [];
    // const arrayGeneral = [];
    // const arraySheikh = [];

    function getSum(total, num) {
      return total + Math.round(num);
    }
    getPatient.map((value, index) => {
      var dbDate = value.date;
      var TodayDate = new Date();
      const currentDate = formatDate(TodayDate);
      const preDate = formatdbDate(dbDate);
      // setCurrentDate(currentDate);
      if (value.hospital === hospitalname && preDate === currentDate) {
        counter++;
      }
      if (
        value.queueState === "in-Process" &&
        value.hospital === hospitalname &&
        preDate === currentDate
      ) {
        if (value.processTime !== "" && value.startingTime !== "") {
          const timevalue = estimatedTime(
            value.processTime,
            value.startingTime
          );
          array1.push(timevalue);
          const numbers = array1.reduce(getSum, 0);
          const division = numbers / array1.length;
          const result = division.toFixed(0);
          // console.log("result++++", result);
          if (result > 59) {
            const hours = result / 60;
            var rhourse = Math.floor(hours);
            var minutes = (hours - rhourse) * 60;
            var rminutes = Math.round(minutes);
            hoursHolder = rhourse;
            minHolder = rminutes;
            // setEstTimeDoctorH(rhourse);
            // setMinsD(rminutes);
          } else {
            // setEstTimeDoctorH("00");
            // setMinsD(result);
            minHolder = result;
          }
        }
      }
      // console.log("estTime", estTime);
      // if (
      //   value.queueState === "in-Process" &&
      //   value.hospital === "Jinnah Hospital" &&
      //   preDate === currentDate
      // ) {
      //   if (value.processTime !== "" && value.startingTime !== "") {
      //     var estTime = estimatedTime(value.processTime, value.startingTime);
      //     arrayjinnah.push(estTime);
      //     const numbers = arrayjinnah.reduce(getSum, 0);
      //     const division = numbers / arrayjinnah.length;
      //     const result = division.toFixed(0);
      //     if (result > 59) {
      //       const hours = result / 60;
      //       var rhourse = Math.floor(hours);
      //       var minutes = (hours - rhourse) * 60;
      //       var rminutes = Math.round(minutes);
      //       setEstTimeJinnah(rhourse);
      //       setMinsJ(rminutes);
      //     } else {
      //       setEstTimeJinnah("00");
      //       setMinsJ(result);
      //     }
      //   }
      // }
      // if (
      //   value.queueState === "in-Process" &&
      //   value.hospital === "Sheikh Zaid" &&
      //   preDate === currentDate
      // ) {
      //   if (value.processTime !== "" && value.startingTime !== "") {
      //     var estTime = estimatedTime(value.processTime, value.startingTime);
      //     arraySheikh.push(estTime);
      //     const numbers = arraySheikh.reduce(getSum, 0);
      //     const division = numbers / arraySheikh.length;
      //     const result = division.toFixed(0);
      //     if (result > 59) {
      //       const hours = result / 60;
      //       var rhourse = Math.floor(hours);
      //       var minutes = (hours - rhourse) * 60;
      //       var rminutes = Math.round(minutes);
      //       setEstTimeSheikhH(rhourse);
      //       setMinsS(rminutes);
      //     } else {
      //       setEstTimeSheikhH("00");
      //       setMinsS(result);
      //     }
      //     // return setEstTimeSheikhH(estTime);
      //   }
      // }
      // if (
      //   value.queueState === "in-Process" &&
      //   value.hospital === "General Hospital Lahore" &&
      //   preDate === currentDate
      // ) {
      //   if (value.processTime !== "" && value.startingTime !== "") {
      //     var estTime = estimatedTime(value.processTime, value.startingTime);
      //     console.log("generalhospital,", estTime);
      //     arrayGeneral.push(estTime);
      //     const numbers = arrayGeneral.reduce(getSum, 0);
      //     const division = numbers / arrayGeneral.length;
      //     const result = division.toFixed(0);
      //     console.log("generalhospital result==", result);
      //     console.log("generalhospital result==");
      //     if (result > 59) {
      //       const hours = result / 60;
      //       var rhourse = Math.floor(hours);
      //       var minutes = (hours - rhourse) * 60;
      //       var rminutes = Math.round(minutes);
      //       setEstTimeGeneralH(rhourse);
      //       setMinsG(rminutes);
      //     } else {
      //       setEstTimeGeneralH("00");
      //       setMinsG(result);
      //     }
      //     // return setEstTimeGeneralH(estTime);
      //   }
      // }
    });

    return [hoursHolder, minHolder, counter];
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

    console.log("difference", hospitals.item);
    return difference;
  }

  // const DoctorHospital = currentItems.length;
  // const jinnahHPatient = currentItemsJinnah.length;
  // const sheikhHPatient = currentItemsShiekh.length;
  // const generalHPatient = currentItemsGeneral.length;

  // console.log("min***", minHolder);

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
            // backgroundColor: "rgb(199,9,9)",
            margin: "auto",
            padding: 5,
            // marginBottom: 50,
            // flex: 7,
          }}
        >
          <Titles />
          {/* <View>{showHospitals()}</View> */}
          <View>
            {hospitals.map((value, index) => {
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

              //Get in in kilometers
              dist = dist * 1.609344;
              const container = dist.toFixed(2);
              // object.userName = value.userName;
              // object.dist = dist;

              // array.push(object);
              // array.sort();

              return (
                <View key={index}>
                  <View>
                    {dist < 42 ? (
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
                              source={value.img}
                              style={{
                                width: 120,
                                height: 100,
                                justifyContent: "center",
                              }}
                            />
                          </View>
                          <View style={styles.names}>
                            <Text style={styles.listextra3}>
                              {value.hospital}
                            </Text>
                            <Text style={styles.listextra2}>
                              Current Patients:{counter}
                            </Text>
                            {hours1 !== "" || mins1 !== "" ? (
                              <Text style={styles.listextra2}>
                                Estimated Waiting Time:{hours1}:{mins1} min
                              </Text>
                            ) : (
                              <Text style={styles.listextra2}>
                                Estimated Waiting Time:{estTimeDoctorH}:
                                {defaultTime} min
                              </Text>
                            )}

                            <Text style={styles.list2}>
                              {dist.toFixed(2)} KM
                            </Text>
                          </View>
                          <View style={{ width: 90 }}>
                            <Button
                              title="Select"
                              onPress={() => {
                                navigation.navigate("QUEUE", {
                                  hospital: value.hospital,
                                  user: userName,
                                  people: counter,
                                  destination: dist,
                                  patientDisease: patientDisease,
                                  currentId: currentId,
                                  estimatedHour: hours1,
                                  estimatedmins: mins1,
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
                    {dist >= 42.1 ? (
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
                                source={value.img}
                                style={{
                                  width: 120,
                                  height: 100,
                                  justifyContent: "center",
                                }}
                              />
                            </View>
                            <View style={styles.names}>
                              <Text style={styles.listextra}>
                                {value.hospital}
                              </Text>
                              <Text style={styles.listextra2}>
                                Current Patients:{counter}
                              </Text>
                              {hours1 > 0 && mins1 !== "" ? (
                                <Text style={styles.listextra2}>
                                  Estimated Waiting Time:{hours1}:{mins1} min
                                </Text>
                              ) : (
                                <Text style={styles.listextra2}>
                                  Estimated Waiting Time:{estTimeDoctorH}:
                                  {defaultTime} min
                                </Text>
                              )}

                              <Text style={styles.list}>
                                {dist.toFixed(2)} KM
                              </Text>
                            </View>
                            <View style={{ width: 90 }}>
                              <Button
                                title="Select"
                                disabled={true}
                                onPress={() => {
                                  navigation.navigate("QUEUE", {
                                    hospital: value.hospital,
                                    user: userName,
                                    people: counter,
                                    destination: dist,
                                    patientDisease: patientDisease,
                                    currentId: currentId,
                                    estimatedHour: hours1,
                                    estimatedmins: mins1,
                                    defaultTime: defaultTime,
                                  });
                                }}
                              ></Button>
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                  {/* <View>
                    {dist < 42 ? (
                      <View>
                        {value.userName === "Doctors Hospital" ? (
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
                                  source={value.img}
                                  style={{
                                    width: 120,
                                    height: 100,
                                    justifyContent: "center",
                                  }}
                                />
                              </View>
                              <View style={styles.names}>
                                <Text style={styles.listextra3}>
                                  {value.userName}
                                </Text>
                                <Text style={styles.listextra2}>
                                  Current Patients:{DoctorHospital}
                                </Text>
                                {DoctorHospital > 0 && minsD !== "" ? (
                                  <Text style={styles.listextra2}>
                                    Estimated Waiting Time:{estTimeDoctorH}:
                                    {minsD} min
                                  </Text>
                                ) : (
                                  <Text style={styles.listextra2}>
                                    Estimated Waiting Time:{estTimeDoctorH}:
                                    {defaultTime} min
                                  </Text>
                                )}

                                <Text style={styles.list2}>
                                  {dist.toFixed(2)} KM
                                </Text>
                              </View>
                              <View style={{ width: 90 }}>
                                <Button
                                  title="Select"
                                  onPress={() => {
                                    navigation.navigate("QUEUE", {
                                      hospital: value.userName,
                                      user: userName,
                                      people: DoctorHospital,
                                      destination: dist,
                                      patientDisease: patientDisease,
                                      currentId: currentId,
                                      estimatedHour: estTimeDoctorH,
                                      estimatedmins: minsD,
                                      defaultTime: defaultTime,
                                    });
                                  }}
                                ></Button>
                              </View>
                            </View>
                          </View>
                        ) : null}
                        {value.userName === "General Hospital Lahore" ? (
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
                                  source={value.img}
                                  style={{
                                    width: 120,
                                    height: 100,
                                    justifyContent: "center",
                                  }}
                                />
                              </View>
                              <View style={styles.names}>
                                <Text style={styles.listextra3}>
                                  {value.userName}
                                </Text>
                                <Text style={styles.listextra2}>
                                  Current Patients:{generalHPatient}
                                </Text>
                                {generalHPatient > 0 && minsG !== "" ? (
                                  <Text style={styles.listextra2}>
                                    Estimated Waiting Time:{estTimeGeneralH}:
                                    {minsG} min
                                  </Text>
                                ) : (
                                  <Text style={styles.listextra2}>
                                    Estimated Waiting Time:{estTimeGeneralH}:
                                    {defaultTime} min
                                  </Text>
                                )}

                                <Text style={styles.list2}>
                                  {dist.toFixed(2)} KM
                                </Text>
                              </View>
                              <View style={{ width: 90 }}>
                                <Button
                                  title="Select"
                                  onPress={() => {
                                    navigation.navigate("QUEUE", {
                                      hospital: value.userName,
                                      user: userName,
                                      people: generalHPatient,
                                      destination: dist,
                                      patientDisease: patientDisease,
                                      currentId: currentId,
                                      estimatedHour: estTimeGeneralH,
                                      estimatedmins: minsG,
                                      defaultTime: defaultTime,
                                    });
                                  }}
                                ></Button>
                              </View>
                            </View>
                          </View>
                        ) : null}
                        {value.userName === "Jinnah Hospital" ? (
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
                                  source={value.img}
                                  style={{
                                    width: 120,
                                    height: 100,
                                    justifyContent: "center",
                                  }}
                                />
                              </View>
                              <View style={styles.names}>
                                <Text style={styles.listextra3}>
                                  {value.userName}
                                </Text>
                                <Text style={styles.listextra2}>
                                  Current Patients:{jinnahHPatient}
                                </Text>
                                {jinnahHPatient > 0 && minsJ !== "" ? (
                                  <Text style={styles.listextra2}>
                                    Estimated Waiting Time:{estTimejinnah}:
                                    {defaultTime}
                                    min
                                  </Text>
                                ) : (
                                  <Text style={styles.listextra2}>
                                    Estimated Waiting Time:{estTimejinnah}:
                                    {minsJ}
                                    min
                                  </Text>
                                )}

                                <Text style={styles.list2}>
                                  {dist.toFixed(2)} KM
                                </Text>
                              </View>
                              <View style={{ width: 90 }}>
                                <Button
                                  title="Select"
                                  onPress={() => {
                                    navigation.navigate("QUEUE", {
                                      hospital: value.userName,
                                      user: userName,
                                      people: jinnahHPatient,
                                      destination: dist,
                                      patientDisease: patientDisease,
                                      currentId: currentId,
                                      estimatedHour: estTimejinnah,
                                      estimatedmins: minsJ,
                                      defaultTime: defaultTime,
                                    });
                                  }}
                                ></Button>
                              </View>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    ) : // }:null

                    null}
                  </View> */}
                  {/* <View>
                    {dist >= 42.1 ? (
                      // {value.userName==="Doctors Hospital"?
                      <View>
                        {value.userName === "Doctors Hospital" ? (
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
                                  source={value.img}
                                  style={{
                                    width: 120,
                                    height: 100,
                                    justifyContent: "center",
                                  }}
                                />
                              </View>
                              <View style={styles.names}>
                                <Text style={styles.listextra}>
                                  {value.userName}
                                </Text>
                                <Text style={styles.listextra2}>
                                  Current Patients:{DoctorHospital}
                                </Text>
                                {DoctorHospital > 0 && minsD !== "" ? (
                                  <Text style={styles.listextra2}>
                                    Estimated Waiting Time:{estTimeDoctorH}:
                                    {minsD} min
                                  </Text>
                                ) : (
                                  <Text style={styles.listextra2}>
                                    Estimated Waiting Time:{estTimeDoctorH}:
                                    {defaultTime} min
                                  </Text>
                                )}

                                <Text style={styles.list}>
                                  {dist.toFixed(2)} KM
                                </Text>
                              </View>
                              <View style={{ width: 90 }}>
                                <Button
                                  title="Select"
                                  disabled={true}
                                  onPress={() => {
                                    navigation.navigate("QUEUE", {
                                      hospital: value.userName,
                                      user: userName,
                                      people: DoctorHospital,
                                      destination: dist,
                                      patientDisease: patientDisease,
                                      currentId: currentId,
                                      estimatedHour: estTimeDoctorH,
                                      estimatedmins: minsD,
                                      defaultTime: defaultTime,
                                    });
                                  }}
                                ></Button>
                              </View>
                            </View>
                          </View>
                        ) : null}
                        {value.userName === "General Hospital Lahore" ? (
                          <View style={StyleSheetMethods.hospitalViews}>
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
                                  source={value.img}
                                  style={{
                                    width: 120,
                                    height: 100,
                                    justifyContent: "center",
                                  }}
                                />
                              </View>
                              <View style={styles.names}>
                                <Text style={styles.listextra}>
                                  {value.userName}
                                </Text>
                                <Text style={styles.listextra2}>
                                  Current Patients:{generalHPatient}
                                </Text>
                                {generalHPatient > 0 && minsG !== "" ? (
                                  <Text style={styles.listextra2}>
                                    Estimated Wating Time:{estTimeGeneralH}:
                                    {minsG} min
                                  </Text>
                                ) : (
                                  <Text style={styles.listextra2}>
                                    Estimated Wating Time:{estTimeGeneralH}:
                                    {defaultTime} min
                                  </Text>
                                )}

                                <Text style={styles.list}>
                                  {dist.toFixed(2)} KM
                                </Text>
                              </View>
                              <View style={{ width: 90 }}>
                                <Button
                                  title="Select"
                                  disabled={true}
                                  onPress={() => {
                                    navigation.navigate("QUEUE", {
                                      hospital: value.userName,
                                      user: userName,
                                      people: generalHPatient,
                                      destination: dist,
                                      patientDisease: patientDisease,
                                      currentId: currentId,
                                      estimatedHour: estTimeGeneralH,
                                      estimatedmins: minsG,
                                      defaultTime: defaultTime,
                                    });
                                  }}
                                ></Button>
                              </View>
                            </View>
                          </View>
                        ) : null}
                        {value.userName === "Sheikh Zaid" ? (
                          <View style={StyleSheetMethods.hospitalViews}>
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
                                  source={value.img}
                                  style={{
                                    width: 120,
                                    height: 100,
                                    justifyContent: "center",
                                  }}
                                />
                              </View>
                              <View style={styles.names}>
                                <Text style={styles.listextra}>
                                  {value.userName}
                                </Text>
                                <Text style={styles.listextra2}>
                                  Current Patients:{sheikhHPatient}
                                </Text>
                                {sheikhHPatient > 0 && minsS !== "" ? (
                                  <Text style={styles.listextra2}>
                                    Estimated Wating Time:{estTimeSheikhH}:
                                    {minsS} min
                                  </Text>
                                ) : (
                                  <Text style={styles.listextra2}>
                                    Estimated Wating Time:{estTimeSheikhH}:
                                    {defaultTime}min
                                  </Text>
                                )}

                                <Text style={styles.list}>
                                  {dist.toFixed(2)} KM
                                </Text>
                              </View>
                              <View style={{ width: 90 }}>
                                <Button
                                  title="Select"
                                  disabled={true}
                                  onPress={() => {
                                    navigation.navigate("QUEUE", {
                                      hospital: value.userName,
                                      user: userName,
                                      people: sheikhHPatient,
                                      destination: dist,
                                      patientDisease: patientDisease,
                                      currentId: currentId,
                                      estimatedHour: estTimeSheikhH,
                                      estimatedmins: minsS,
                                      defaultTime: defaultTime,
                                    });
                                  }}
                                ></Button>
                              </View>
                            </View>
                          </View>
                        ) : null}
                        {value.userName === "Jinnah Hospital" ? (
                          <View style={StyleSheetMethods.hospitalViews}>
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
                                  source={value.img}
                                  style={{
                                    width: 120,
                                    height: 100,
                                    justifyContent: "center",
                                  }}
                                />
                              </View>
                              <View style={styles.names}>
                                <Text style={styles.listextra}>
                                  {value.userName}
                                </Text>
                                <Text style={styles.listextra2}>
                                  Current Patients:{jinnahHPatient}
                                </Text>
                                {jinnahHPatient > 0 && minsJ !== "" ? (
                                  <Text style={styles.listextra2}>
                                    Estimated Wating Time:{estTimejinnah}:
                                    {minsJ} min
                                  </Text>
                                ) : (
                                  <Text style={styles.listextra2}>
                                    Estimated Wating Time:{estTimejinnah}:
                                    {defaultTime} min
                                  </Text>
                                )}

                                <Text style={styles.list}>
                                  {dist.toFixed(2)} KM
                                </Text>
                              </View>
                              <View style={{ width: 90 }}>
                                <Button
                                  title="Select"
                                  disabled={true}
                                  onPress={() => {
                                    navigation.navigate("QUEUE", {
                                      hospital: value.userName,
                                      user: userName,
                                      people: jinnahHPatient,
                                      destination: dist,
                                      patientDisease: patientDisease,
                                      currentId: currentId,
                                      estimatedHour: estTimejinnah,
                                      estimatedmins: minsJ,
                                      defaultTime: defaultTime,
                                    });
                                  }}
                                ></Button>
                              </View>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    ) : // }:null

                    null}
                  </View> */}
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
    width: "40%",
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
