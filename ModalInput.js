import e from "cors";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { useEffect } from "react/cjs/react.development";

const ModalInPut = ({ navigation, route }) => {
  const { userName, patientDisease, GetQueueState } = route.params;
  console.log("username", userName);
  console.log("patientDisease", patientDisease);
  console.log("queueState", GetQueueState);
  const [modalVisible, setModalVisible] = useState(true);

  const [Disease, SetDisease] = useState("");

  useEffect(() => {
    // if (mins == "" && secs == "1") {
    //   onProceed();
    //   setModalVisible(!modalVisible);
    // }
    // const timerId = setInterval(() => {
    //   if (secs <= 0) {
    //     if (mins <= 0) alert("end");
    //     else {
    //       setMins((m) => m - 1);
    //       setSecs(59);
    //     }
    //   } else setSecs((s) => s - 1);
    // }, 1000);
    // return () => clearInterval(timerId);
    // const timer =
    //   counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    // return () => clearInterval(timer);
    //secs, mins
  }, []);
  console.log("disease", Disease);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                borderRadius: 10,
                height: 50,
                color: "#206E79",
                backgroundColor: "white",
                marginBottom: 20,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <View>
                <TextInput
                  autoFocus={true}
                  placeholderTextColor="#6e6464"
                  onChangeText={(text) => {
                    SetDisease(text);
                  }}
                  // defaultValue={text}
                  value={Disease}
                  style={{
                    paddingHorizontal: 10,
                    color: "#6e6464",
                    fontWeight: "bold",
                    width: 300,

                    // outline: "none"
                  }}
                  placeholder="Please Enter Disease"
                />
              </View>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                if (Disease === "") {
                  e.prevenDefault();
                  return false;
                } else {
                  navigation.navigate("HOSPITALS LIST", {
                    userName: userName,
                    patientDisease: Disease,
                    GetQueueState: GetQueueState,
                  });
                }
              }}
            >
              <Text style={styles.textStyle}>Go</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFC300",
    borderRadius: 10,
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});

export default ModalInPut;
