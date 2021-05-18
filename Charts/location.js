/**
 *
 * SearchLocation
 *
 */

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; //@react-native-community/async-storage
import CORS from "cors";
import axios from "axios";
// import Button from "../../widgets/Button";
// import Input from "../../widgets/Input";
// import Text from "../../widgets/Text";
// import Icon from "../../widgets/Icon";
import {
  Text,
  Input,
  StyleSheet,
  Icon,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// import { MainView, InfoView, Locations, Wrapper } from "./styles";

const googleApiKey = "AIzaSyAebg6LwiVjVj_Hiysnv5GQ8tbPlwCqfA4"; //"AIzaSyB94Glgain12Qqgn9Vzj4nwkQiiFKWIqx8";
const recentApiKey = "AIzaSyDh30PgP_JNDoPCeF1yx-Cr47uSEslXsXw";
class SearchLocation extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Search Hospital",
      onBackPress: () => navigation.pop(),
    };
  };

  _retrieveData = async (key) => {
    console.log("vlaaaaaa", key);
    try {
      let value = await AsyncStorage.getItem(key);
      console.log("value: ", value);
      console.log("vlaaaaaa", key);
      return value ? JSON.parse(value) : "31.5082 , 74.3086";
    } catch (e) {
      console.log("Error retrieving data: ", e);
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
    this.getLocationDetails("");
  }
  getLocationDetails = async (location) => {
    const base_url = "https://maps.googleapis.com/maps/api/";
    let nearby = !location;
    location = location || "hospital";
    let value = await this._retrieveData("lastLocation");
    console.log("valuereceived", value);
    console.log("location", location);
    const url = `${base_url}place/textsearch/json?query=${location}&location=${value}&radius=10000&key=${recentApiKey}`;

    let response = await fetch(url, { mode: "no-cors" });
    console.log("response", response);
    // .then((response) => response.json())
    // .then((locs) => {
    //   this.setState({ locations: locs.results, nearby });
    // });
  };

  openLocation(obj) {
    console.log("obj: ", obj);
    const {
      navigation: { navigate },
    } = this.props;
    const isHospital = obj.types.indexOf("hospital");
    const isHealth = obj.types.indexOf("health");
    const hospital = obj.formatted_address.match(/hospital/i);
    if (isHospital < 0 && isHealth < 0 && !hospital)
      return alert("Select location for hospital");
    navigate("RequestForm", { selectedLocation: obj });
  }

  render() {
    const { locations, nearby } = this.state;
    const type = nearby ? "Nearby Hospitals" : "Search Results";
    return (
      <View>
        {/* <Input
          icon="search"
          type="default"
          placeholder="Hospital Name or lat,lng"
          onChangeText={this.getLocationDetails}
        /> */}
        <Text
          borderBottomWidth="1px"
          backgroundColor="lightgrey"
          padding={"5px"}
        >
          {type}
        </Text>
        <View>
          {locations &&
            locations.map((obj, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.openLocation(obj)}
                >
                  {/* <Icon marginTop={7} fontSize={22} name={"map-marker"} /> */}
                  <View>
                    <Text>{obj.name || obj.formatted_address}</Text>
                    <Text>{obj.formatted_address}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    );
  }
}

export default SearchLocation;
