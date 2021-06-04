import { PermissionsAndroid, ACCESS_FINE_LOCATION } from "react-native";
export default estimatedTime = (first, second) => {
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
};
export default requestLocationPermission = async () => {
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
};
