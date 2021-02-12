import React, { Component } from 'react';
import{Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';
class IntialComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true,
        }}
// oncall(){
//     const variable=this.state.show;
//     this.setState(!variable);
//     // alert("calle");
// }
render(){
     const{item,onConform,onDecline}=this.props;
     const styles={

     }
    return(
        <SafeAreaView style={{marginTop:20,display:'flex',alignItems:'center',justifyContent:'center',}}>
                <View style={{backgroundColor:'white', }} key={item} >
                    <Text>{item}</Text>
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


}
export default IntialComponent ;