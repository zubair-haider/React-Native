import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import Counter from './Counter';
import ComponentsHolder from './ComponentsHolder';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import { Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';
import logo from './assets/boy.png';

export default function App() {
  const[shouldShow,setShouldShow]=useState(false);
  return (
    <SafeAreaView style={{flex:1, width:1000, margin:'auto',marginBottom:50,}} >
       <View style={{ margin:'auto',width:400, backgroundColor:'red',borderColor:'red',shadowColor:'gray',shadowRadius:15, borderWidth:5,padding:5,marginBottom:10,}}>
      <TitleHodler  />
       

      </View>
      <View style={{backgroundColor:'rgb(255,255,255)',borderColor:'green',shadowColor:'gray',shadowRadius:5, borderWidth:5,padding:5,borderRadius:5,}}>
      <ComponentsHolder   />
       

      </View>
     
    
    </SafeAreaView>
   
  
  );
}
 const TitleHodler=()=>{
  return(
    <View>
    <Text style={{height:30, fontSize:30, justifyContent:'center',textAlign:'center',fontWeight:'bold',color:'white'}}>Doctor's Appointment</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
     alignItems: 'center',
    // justifyContent: 'center',
  
  },
  textContainer:{
    color:'green',
  },
  buttonClass:{
    backgroundColor:'red',
  }
});
