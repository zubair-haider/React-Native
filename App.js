import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import Counter from './Counter';
import ComponentsHolder from './ComponentsHolder';

import { Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';
import logo from './assets/boy.png';

export default function App() {
  const[shouldShow,setShouldShow]=useState(false);
  return (
    <SafeAreaView style={{flex:1, marginTop:100, width:500, margin:'auto'}} >
      <View style={{backgroundColor:'#eee'}}>
      <ComponentsHolder/>
       

      </View>
     
    
    </SafeAreaView>
   
  
  );
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
