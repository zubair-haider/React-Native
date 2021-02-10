import React, { Component } from 'react';
import{Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';
import logo from './assets/boy.png';
class LastComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true,
        }
    }
render(){
     const{item,img,onDeclineLeave}=this.props;
    return(
        <SafeAreaView style={{marginTop:20}}>
        <View style={{flex:1, alignItems:'center', justifyContent:'space-between'}} key={item} >
            <Text style={{marginBottom:20,}}>{item}</Text>
            <Image   source={logo} style={{width:200, height:200, justifyContent:'center'}}/>
        
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:100}}>
        {/* <View style={{width:80,marginBottom:10}}>
        
        </View> */}
        <View style={{width:100,}}>
          <Button  title='Leave'  onPress={()=>onDeclineLeave()}></Button>
          </View>
          </View> 
        </SafeAreaView>
    )
}


}
export default LastComponent;