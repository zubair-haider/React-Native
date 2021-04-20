"use strict";
import axios from "axios";
import React, { Component, useState, useEffect, useRef } from "react";
import { Form, Input, Button, Checkbox } from "antd-mobile";
import ValidationComponent from "react-native-form-validator";
import Chart from "../Charts/React_native_chart";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { text } from "@fortawesome/fontawesome-svg-core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Forms = ({ navigation }) => {
  // const inputRef = useRef(null);
  const [checkdisease, setdisease] = useState({
    disease: "",
    errordisease: "",
  });
  const [checkAge, setAge] = useState({ age: "", errorage: "" });
  const [checkGender, setGender] = useState({
    gender: "",
    errorgender: "",
  });
  const [checkContact, setContact] = useState({
    contact: "",
    errorcontact: "",
  });
  const [checkName, setcheckName] = useState({
    name: "",
    errorMsg: "",
  });

  // const getApiCall = async (url, data) => {
  //   console.log("data: ", data);
  //   let headers = { "content-type": "application/json" };
  //   let response = await axios({
  //     method: "GET",
  //     url,
  //     data: JSON.stringify(data),
  //     headers: { "content-type": "application/json" },
  //     // data: data,
  //   });
  //   console.log("response get = ", response);
  //   // alert("called");
  // };
  const postApiCall = async (url, data) => {
    console.log("post data: ", data);
    let headers = { "content-type": "application/json" };
    let response = await axios({
      method: "POST",
      url,
      data: JSON.stringify(data),
      headers: { "content-type": "application/json" },
      // data: data,
    });
    console.log("response  post= ", response);
    // alert("called");
  };
  const onSubmit = async () => {
    let collection = {};
    let namecheck = /^[a-zA-Z]+$/;
    let numbercheck = /^[0-9()-]+$/;
    let diseaseCheck = /[^A-Za-z]+$/;
    let gender = /^(?!\s*$)(?:MALE|Male|male|FEMALE|Female|female|other)+$/;

    let isValid = namecheck.test(checkName.name);
    let numberValid = numbercheck.test(checkContact.contact);
    let diseaseValid = diseaseCheck.test(checkdisease.disease);
    let genderValid = gender.test(checkGender.gender);

    if (!isValid || checkName.name == "") {
      setcheckName({ errorMsg: "* Name required" });
      return false;
    }
    if (!numberValid || checkContact.contact == "") {
      setContact({ errorcontact: "* Phone# required" });
      return false;
    }
    if (!diseaseValid || checkdisease.disease == "") {
      setdisease({ errordisease: "* required" });
    }
    if (checkAge.age < 0 || checkAge.age > 120 || checkAge.age == "") {
      setAge({ errorage: "*Age required" });
      return false;
    }
    if (!genderValid || checkGender.gender == "") {
      setGender({ errorgender: "* Gender required" });
      return false;
    } else {
      navigation.navigate("HOSPITALS LIST", {
        userName: checkName.name,
        patientDisease: checkdisease.disease,
      });
    }
    collection.name = checkName.name;
    collection.phone = checkContact.contact;
    collection.disease = checkdisease.disease;
    collection.age = checkAge.age;
    collection.gender = checkGender.gender;

    var postApiUrl = "http://192.168.1.108:3000/detail"; //192.168.1.107
    postApiCall(postApiUrl, collection);
    // getApiCall(getUrl, collection);
    // console.log("collection", collection);
  };
  const onBtnClick = () => {
    navigation.navigate("Chart");
  };
  return (
    <KeyboardAwareScrollView
      shouldRasterizeIOS={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.heading}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: "#D64B59",
            paddingTop: 30,
          }}
        >
          Welcome!
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#206E79" }}>
          Please Fill this Form to Register!
        </Text>
      </View>
      <View style={styles.formsFileds}>
        <View>
          <Text style={styles.text}>Patient Name:</Text>
          <View style={styles.views}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              autoFocus={true}
              style={{ paddingLeft: 10, color: "black", outline: "none" }}
              placeholder="Enter Patient Name"
              placeholderTextColor="#6e6464"
              onChangeText={(text) => {
                setcheckName({ name: text });
              }}
              defaultValue={text}
              value={checkName.name}
            />
            <Text style={{ color: "red", paddingLeft: 10 }}>
              {checkName.errorMsg}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.text}>Contact Number:</Text>
          <View style={styles.views}>
            <FontAwesome name="address-book" color="#05375a" size={20} />
            <TextInput
              keyboardType={"numeric"}
              maxLength={11}
              placeholderTextColor="#6e6464"
              onChangeText={(text) => {
                setContact({ contact: text });
              }}
              defaultValue={text}
              value={checkContact.contact}
              style={{
                paddingLeft: 10,
                color: "black",
                outline: "none",
                placeholder: "white",
              }}
              placeholder="Enter Contact number"
            />
            <Text style={{ color: "red", paddingLeft: 10 }}>
              {checkContact.errorcontact}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.text}>Disease:</Text>
          <View style={styles.views}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="#6e6464"
              onChangeText={(text) => {
                setdisease({ disease: text });
              }}
              defaultValue={text}
              value={checkdisease.disease}
              style={{ paddingLeft: 10, color: "black", outline: "none" }}
              placeholder="Enter Patient Disease"
            />
            <Text style={{ color: "red", paddingLeft: 10 }}>
              {checkdisease.errordisease}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.text}>Age:</Text>
          <View style={styles.views}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="#6e6464"
              keyboardType="numeric"
              onChangeText={(text) => {
                setAge({ age: text });
              }}
              defaultValue={text}
              value={checkAge.age}
              style={{ paddingLeft: 10, color: "black", outline: "none" }}
              placeholder="Enter Age"
            />
            <Text style={{ color: "red", paddingLeft: 10 }}>
              {checkAge.errorage}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.text}>Gender:</Text>
          <View style={styles.views}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              onChangeText={(text) => {
                setGender({ gender: text });
              }}
              placeholderTextColor="#6e6464"
              defaultValue={text}
              value={checkGender.gender}
              style={{
                paddingLeft: 10,
                color: "black",
                outline: "none",
              }}
              placeholder="Enter Gender"
            />
            <Text
              style={{
                color: "red",
                paddingLeft: 10,
              }}
            >
              {checkGender.errorgender}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{ marginTop: 50, alignItems: "center", paddingRight: 10 }}
          >
            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
              <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <TouchableOpacity style={styles.submitButton} onPress={onBtnClick}>
              <Text style={styles.submitButtonText}> View Chart </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Forms;
const styles = StyleSheet.create({
  text: {
    paddingBottom: 10,
    fontWeight: "bold",
    color: "#FAFAFA",
  },
  views: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#EAF1F2",
    justifyContent: "flex-start",
    textAlignVertical: "center",
  },
  formsFileds: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#206E79",

    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  submitButton: {
    backgroundColor: "#EAF1F2",
    padding: 10,
    margin: "auto",
    height: 40,
    width: 100,

    alignItems: "center",
    borderRadius: 20,
  },
  submitButtonText: {
    color: "#D64B59",
    fontWeight: "bold",
  },
  heading: {
    flex: 1,
    backgroundColor: "rgb(242, 242, 242)",
    fontWeight: "bold",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingBottom: 25,
    // paddingTop: 20,
    alignItems: "center",
  },
});
