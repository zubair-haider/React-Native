import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useEffect } from "react/cjs/react.development";

const ModalAlert = ({ onProceed }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [mins, setMins] = useState(1);
  const [secs, setSecs] = useState(5);

  useEffect(() => {
    if (mins == "" && secs == "1") {
      onProceed();
      setModalVisible(!modalVisible);
    }
    const timerId = setInterval(() => {
      if (secs <= 0) {
        if (mins <= 0) alert("end");
        else {
          setMins((m) => m - 1);
          setSecs(59);
        }
      } else setSecs((s) => s - 1);
    }, 1000);
    return () => clearInterval(timerId);
    // const timer =
    //   counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    // return () => clearInterval(timer);
  }, [secs, mins]);
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

                color: "#206E79",
                backgroundColor: "white",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "#FFC300",
                  fontWeight: "bold",
                  padding: 10,

                  margin: "auto",
                  fontSize: 30,
                }}
              >
                {mins}:{secs}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Now Its Your Turn.Please head to Reception.
              </Text>
            </View>

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                onProceed();
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
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

export default ModalAlert;
