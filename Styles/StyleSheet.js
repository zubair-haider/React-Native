import { StyleSheet } from "react-native";

const StyleSheetMethods = StyleSheet.create({
  // btn: {
  //   backgroundColor: "green",
  //   color: "white",
  //   cursor: "pointer",
  // },
  text: {
    backgroundColor: "#EAF1F2",
    padding: 10,

    borderLeftWidth: 5,
    // borderRightWidth: 5,
    shadowColor: "green",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,

    elevation: 24,
    marginTop: 10,
    marginBottom: 10,
    borderLeftColor: "rgb(58,150,243)",
    // borderRightColor: "rgb(58,150,243)",
    width: "90%",
    marginHorizontal: 20,
  },
  stagebg: {
    height: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  btndoc: {
    marginLeft: 10,
    width: 100,
    backgroundColor: "rgb(199,9,9)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  hospitalViews: {
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
    // justifyContent: "center",
    // alignItems: "center",
  },
  hospitalViewsGr: {
    marginTop: 10,
    // paddingBottom: 10,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "#98FB98",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
    // justifyContent: "center",
    // alignItems: "center",
  },
  stage: {
    color: "white",
    backgroundColor: "rgb(199,9,9)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter_900Black",
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  questions: {
    backgroundColor: "#EAF1F2",
    padding: 10,
    marginTop: 0,
    borderLeftWidth: 5,
    borderTopWidth: 5,
    width: "90%",
    borderTopLeftRadius: 10,

    borderLeftColor: "rgb(58,150,243)",
    borderTopColor: "rgb(58,150,243)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  viewsText: {
    fontSize: 20,
    color: "rgb(199,9,9)",
    textAlign: "center",
    justifyContent: "center",
  },
  // clikableBtn: {
  //   color: "white",
  //   backgroundColor: "green",
  //   cursor: "pointer",
  // },
});
export default StyleSheetMethods;
