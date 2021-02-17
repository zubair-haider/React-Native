import React, { Component } from 'react';
import{Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';
import logo from './assets/boy.png';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
const Complete=({item,img,onDeclineLeave,onReset})=> {
    return(
        <SafeAreaView style={{marginTop:20}}>
           <View style={{backgroundColor:'rgb(160,235,239)', padding:10,borderLeftWidth:5,marginTop:10,marginBottom:10, borderLeftColor:'rgb(58,150,243)', }} key={item} >
                    <Text style={{fontSize:20,fontFamily:'Inter-Black',color:'rgb(17,117,6))'}}   >  {item}</Text>
      </View>
       
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:10,}}>
       
       
          <View style={{width:80,marginBottom:10}}>
        <Button  title='Reset'  onPress={()=>onReset()} style={{width:18, marginTop:30,}}></Button>
        </View>
          </View> 
        </SafeAreaView>
    )



}
export default Complete;