//import "react-native-gesture-handler";
//import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import Counter from "./Counter";
import ComponentsHolder from "./ComponentsHolder";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Menu, ActivityIndicator, NavBar } from "antd-mobile";
import { Location, Permissions } from "expo";
import { getPreciseDistance } from "geolib";
import { PermissionsAndroid, ACCESS_FINE_LOCATION } from "react-native";
//import MapViewDirections from "react-native-maps-directions";
//import MapView, { AnimatedRegion, Marker } from "react-native-maps";
// import DrawerExample from "./drawer";
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
import { NavigationContainer } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//const Stack = createStackNavigator();

const MyApp = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  var [active, setActive] = useState(false);
  var [intialPosition, setIntialPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  var [hospitals, setHospital] = useState({
    item: [
      { latitude: 31.4797, longitude: 74.2804, userName: "Doctors Hospital" },
      { latitude: 31.5082, longitude: 74.3086, userName: "Sheikh Zaid" },
      { latitude: 31.4846, longitude: 74.2974, userName: "Jinnah Hospital" },
      {
        latitude: 31.4545,
        longitude: 74.351,
        userName: "General Hospital Lahore",
      },
    ],
  });
  // async function requestLocationPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         // title: "Example App",
  //         // message: "Example App access to your location ",
  //       }
  //     );
  //     console.log("granted", granted);
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the location");
  //       // alert("You can use the location");
  //     } else granted === !PermissionsAndroid.RESULTS.GRANTED;
  //     {
  //       console.log(
  //         "location permission denied",
  //         PermissionsAndroid.RESULTS.GRANTED
  //       );
  //       alert("Location permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  // function distance(
  //   lat1 = doctorsHospital.latitude,
  //   lng1 = doctorsHospital.longitude,
  //   lat2 = intialPosition.latitude,
  //   lng2 = intialPosition.longitude
  // ) {
  //   var radlat1 = (Math.PI * lat1) / 180;
  //   var radlat2 = (Math.PI * lat2) / 180;
  //   var radlon1 = (Math.PI * lng1) / 180;
  //   var radlon2 = (Math.PI * lng2) / 180;
  //   var theta = lng1 - lng2;
  //   var radtheta = (Math.PI * theta) / 180;
  //   var dist =
  //     Math.sin(radlat1) * Math.sin(radlat2) +
  //     Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  //   dist = Math.acos(dist);
  //   dist = (dist * 180) / Math.PI;
  //   dist = dist * 60 * 1.1515;

  //   //Get in in kilometers
  //   dist = dist * 1.609344;
  //   // console.log("dist", dist);

  //   return dist;
  // }
  const showAppointment = () => {
    alert("working");
  };
  useEffect(() => {
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
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: 1000,
        margin: "auto",
        marginBottom: 50,
        marginTop: 100,
      }}
    >
      <View
        style={{
          width: "50%",
          padding: 10,
          //   height: "100%",
          backgroundColor: "green",
          margin: "auto",
          marginBottom: 10,
        }}
      >
        <Titles />
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
            var radtheta = (Math.PI * theta) / 180;
            var dist =
              Math.sin(radlat1) * Math.sin(radlat2) +
              Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;

            //Get in in kilometers
            // dist = dist * 1.609344;
            // console.log("dist", dist);

            return (
              <TopHeader
                key={index}
                name={value.userName}
                distance={dist}
                showAppointment={showAppointment}
                compState={setActive}
              />
            );
          })}
        </View>
        {/* <Text style={{ color: "white", margin: "auto" }}>{distance()}</Text> */}
        {/* <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={intialPosition}
        >
         <MapViewDirections
            origin={intialPosition}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          /> 
        </MapView> */}
      </View>
      <View>{active && <HideShoW />}</View>
    </SafeAreaView>
  );
};
const HideShoW = () => {
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
        <ComponentsHolder />
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
      <Text style={styles.headings}>Nearest Hospitals</Text>
      <Text style={styles.headings}>Distance</Text>
      <Text style={styles.headings}>Selcet To visit</Text>
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
    height: 35,
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
    fontFamily: "Inter-Black",
    backgroundColor: "white",
    marginBottom: 30,

    width: "33%",
  },
  list: {
    backgroundColor: "white",
    justifyContent: "center",
    width: 150,
    padding: 10,
    fontWeight: "bold",
  },
};
export default MyApp;
