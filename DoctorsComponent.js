import React, { Component } from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import{Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';
const DoctorsComp=({item,onConformed,onDeclined})=>{
   
    return(
        <SafeAreaView style={{backgroundColor:'',paddingTop:10}}>
             <View style={{backgroundColor:'rgb(160,235,239)', padding:10,borderLeftWidth:5,marginTop:10,marginBottom:10, borderLeftColor:'rgb(58,150,243)', }} key={item} >
                    <Text style={{fontSize:20,fontFamily:'Inter-Black',color:'rgb(199,9,9)'}}   >   {item}?</Text>
      </View>
                    {/* <View style={{flex:1, alignItems:'center', justifyContent:'space-between',}} key={item} >
                        <Text style={{color:'black'}}>{item}</Text>
                    
                    </View> */}
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:10}}>
                    <View style={{width:80,marginBottom:10}}>
                    <Button  title='Yes'  onPress={()=>onConformed()} style={{width:18, marginTop:30,}}></Button>
                    </View>
                    <View style={{width:100,paddingLeft:20,}}>
                    <Button  title='No'  onPress={()=>onDeclined()}></Button>
                    </View>
                    </View>
        </SafeAreaView>
    )


}
export default DoctorsComp;