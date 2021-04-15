//import "react-native-gesture-handler";
//import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import axios from "axios";
import Counter from "./Counter";
import ComponentsHolder from "./ComponentsHolder";
import { useFonts, Inter_900Black } from "expo-font";
import { Menu, ActivityIndicator, NavBar } from "antd-mobile";
import { Location, Permissions } from "expo";
import { getPreciseDistance } from "geolib";
import { PermissionsAndroid, ACCESS_FINE_LOCATION } from "react-native";
//import MapViewDirections from "react-native-maps-directions";
//import MapView, { AnimatedRegion, Marker } from "react-native-maps";
// import DrawerExample from "./drawer";
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
import logo from "./assets/boy.png";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//const Stack = createStackNavigator();

const MyApp = ({ navigation, route }) => {
  const { userName } = route.params;
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
  const [getPatient, setPatitent] = useState([]);
  const [getGeneralH, setGeneralH] = useState("");
  const [getSheikhH, setSheikhH] = useState("");
  const [getDoctorH, setDoctorH] = useState("");
  const [hospitals, setHospital] = useState({
    item: [
      {
        id: 1,
        latitude: 31.4797,
        longitude: 74.2804,
        userName: "Doctors Hospital",
      },
      { id: 2, latitude: 31.5082, longitude: 74.3086, userName: "Sheikh Zaid" },
      {
        id: 3,
        latitude: 31.4846,
        longitude: 74.2974,
        userName: "Jinnah Hospital",
      },
      {
        id: 4,
        latitude: 31.4545,
        longitude: 74.351,
        userName: "General Hospital Lahore",
      },
      {
        id: 4,
        latitude: 31.4545,
        longitude: 74.351,
        userName: "General Hospital Lahore",
      },
      {
        id: 4,
        latitude: 31.4545,
        longitude: 74.351,
        userName: "General Hospital Lahore",
      },
    ],
  });
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          //   title: "Finder",
          //   message: "Finder App access to your location ",
        }
      );

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
    }
  }
  const fetchData = async () => {
    try {
      const result = await axios("http://localhost:3000/detail");

      console.log("=data=", result.data);
    } catch (error) {
      console.log("-=-=-=-=erroro-=-=-==", error);
    }
  };

  useEffect(() => {
    fetchData();
    requestLocationPermission();
    // showHospitals();
    navigator.geolocation.getCurrentPosition(
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
      },

      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);
  console.log("-=-=-=getPatient-=-=-=-=", getPatient);

  const patientsDoctorHospital = getPatient.map((filterHospital) => {
    var counter = 0;
    filterHospital.hospital === "Doctors Hospital";
    {
      counter++;
    }
    return counter;
  });

  const geval = patientsDoctorHospital.map((item) => {
    const counter = 0;
    if (item.hospital === "Doctors Hospital") {
      // return counter++;
    }
    return counter;
  });
  // for (var i = 0; i <= patientsDoctorHospital.length; i++) {
  //   if (patientsDoctorHospital[i].hospital === "Doctors Hospital") {
  //     counter++;
  //   }
  // }
  // alert("data", patientsDoctorHospital);
  // const showHospitals = () => {

  //   console.log("in showHospital:", getPatient);
  //   // const currentItems = await getPatient.filter(
  //   //   (filterItems) => filterItems.hospital === "Doctors Hospital"
  //   // );
  //   // setDoctorH(currentItems);
  //   // console.log("dotorHospital:", currentItems);
  //   // const currentShowItems = this.state.showState.filter(
  //   //   (filterItems) => filterItems.id !== id
  //   // );
  //   // this.setState({ showState: currentShowItems });
  // };
  // console.log("patient:", getDoctorH);

  return (
    <KeyboardAwareScrollView
      shouldRasterizeIOS={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <SafeAreaView
        style={{
          flex: 7,

          //marginTop: 100,
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#206E79",
            margin: "auto",
            marginBottom: 10,
            flex: 7,
          }}
        >
          <Titles />
          {/* <View>{showHospitals()}</View> */}
          <View>
            {hospitals.item.map((value, index) => {
              var lat1 = value.latitude;
              var lng1 = value.longitude;
              var lat2 = intialPosition.latitude;
              var lng2 = intialPosition.longitude;
              var radlat1 = (Math.PI * lat1) / 180;
              var radlat2 = (Math.PI * lat2) / 180;
              var radlon1 = (Math.PI * lng1) / 180;
              var radlon2 = (Math.PI * lng2) / 180;
              var theta = lng1 - lng2;
              var tempnumber = [];
              var radtheta = (Math.PI * theta) / 180;
              var dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
              dist = Math.acos(dist);
              dist = (dist * 180) / Math.PI;
              dist = dist * 60 * 1.1515;
              console.log("distance:", dist);

              //Get in in kilometers
              dist = dist * 1.609344;

              // console.log("dist", dist);
              var tempvar = tempnumber.push[dist];
              for (var i = 0; i <= dist.length; i++) {
                var tempvar = tempnumber.push[i];
                console.log(tempvar);
              }

              return (
                <View>
                  <View>
                    {dist <= 5 ? (
                      <View
                        style={{
                          marginTop: 5,
                          paddingBottom: 10,
                          borderRadius: 5,
                          backgroundColor: "#98FB98",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={index}
                      >
                        <Text style={styles.listextra2}>{value.userName}</Text>
                        <Text style={styles.listextra2}>
                          Current Patients:{patientsDoctorHospital}
                        </Text>
                        <Text style={styles.list2}>{dist.toFixed(2)} KM</Text>
                        <View style={{ width: 80 }}>
                          <Button
                            title="select"
                            onPress={() => {
                              navigation.navigate("QUEUE", {
                                hospital: value.userName,
                                user: userName,
                              });
                            }}
                          ></Button>
                        </View>
                      </View>
                    ) : null}
                  </View>
                  <View>
                    {dist >= 5.1 ? (
                      <View
                        style={{
                          marginTop: 5,
                          paddingBottom: 10,
                          borderRadius: 5,
                          backgroundColor: "gray",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={index}
                      >
                        <Text style={styles.listextra}>{value.userName}</Text>
                        <Text style={styles.list}>{dist.toFixed(2)} KM</Text>
                        <View style={{ width: 80 }}>
                          <Button
                            title="select"
                            onPress={() => {
                              navigation.navigate("QUEUE", {
                                hospital: value.userName,
                                user: userName,
                              });
                            }}
                          ></Button>
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
    fontsize: 50,
    color: "white",
  },
  list: {
    backgroundColor: "white",
    justifyContent: "center",

    padding: 5,
    fontWeight: "bold",
    fontsize: 50,
    color: "green",
  },
  listextra2: {
    // backgroundColor: "#98FB98",
    justifyContent: "center",

    padding: 5,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  listextra: {
    backgroundColor: "white",
    justifyContent: "center",

    padding: 5,
    fontWeight: "bold",
    fontSize: 20,
    color: "#6e6464",
  },
};
export default MyApp;
