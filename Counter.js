import React, { Component } from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import{Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';

const IntialComponent=({item,onConform,onDecline})=>{
    return(
        <SafeAreaView style={{marginTop:20,display:'flex',alignItems:'center',justifyContent:'center',}}>
                <View style={{backgroundColor:'rgb(160,235,239)', padding:10,borderLeftWidth:5,marginTop:50, borderLeftColor:'rgb(58,150,243)', }} key={item} >
                    <Text style={{fontSize:20,fontFamily:'Inter-Black',color:'rgb(199,9,9)'}}   >{item}?</Text>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:100}}>
                        <View style={{width:80,marginBottom:10}}>
                            <Button  title='Yes'  onPress={()=>onConform()} style={{width:18, marginTop:30,}}></Button>
                        </View>
                        <View style={{width:100,paddingLeft:20,}}>
                            <Button  title='No'  onPress={()=>onDecline()}></Button>
                        </View>
                </View>
        </SafeAreaView>
    )


}
export default IntialComponent ;