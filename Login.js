import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import UserList from "./UserQueueList";
//import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Login = ({ navigation, route }) => {
  const [number, setNumber] = useState("");
  const [errorNumber, SetErrorNumber] = useState("");
  const [errorMsg, SetErrorMsg] = useState("");
  const [getPatient, setPatitent] = useState([]);
  const [getHospital, setHospital] = useState("");

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
  useEffect(() => {
    fetchData();
  }, []);

  function findUser() {
    let numbercheck = /^[0-9()-]+$/;
    let numberValid = numbercheck.test(number);

    getPatient.map((value, index) => {
      console.log("patient++++", value);
      if (value.phone !== number) {
        SetErrorMsg("Number Not Registered");
      }

      if (value.phone === number) {
        const currentUser = getHospital.filter(
          (item, index) => value.name === item.user
        );
        if (currentUser.length === 0) {
          console.log("runned");
          navigation.navigate("UserList", {
            user: value.name,
            patientDisease: value.disease,
          });
        }

        console.log("******0000", currentUser);
        currentUser.map((item, index) => {
          navigation.navigate("UserList", {
            user: item.user,
            patientDisease: value.disease,
            hospital: item.hospital,
            userQueueState: item.queueState,
            id: item.id,
            phone: value.phone,
          });
        });
      }
    });
    if (!numberValid || number === "") {
      SetErrorMsg("Enter Valid Number");

      return false;
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/lll.png")} />
      <View>
        <Text
          style={{
            padding: 5,
            color: "red",
            fontWeight: "bold",
            // backgroundColor: "red",
          }}
        >
          {errorMsg}
        </Text>
      </View>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          keyboardType={"numeric"}
          maxLength={11}
          style={styles.TextInput}
          placeholder="Enter Registered Phone Number."
          placeholderTextColor="white"
          onChangeText={(number) => setNumber(number)}
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          findUser();
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={styles.forgot_button}>Not Registered?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FORM");
          }}
        >
          <Text style={styles.forgot_button_reg}>Register Here </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF1F2",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 20,
    borderRadius: 100,

    height: 200,
    width: 200,
  },

  inputView: {
    backgroundColor: "#3fb5bf",
    borderRadius: 10,
    width: "90%",
    height: 60,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    width: 500,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#6e6464",
    fontWeight: "bold",
  },
  forgot_button_reg: {
    height: 30,
    marginBottom: 30,
    paddingLeft: 5,
    fontWeight: "bold",
    color: "red",
  },

  loginBtn: {
    width: "30%",
    borderRadius: 5,
    height: 50,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#fb5b5a",
  },
});
