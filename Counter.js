import React, { Component } from 'react';
import{Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';
class Counter extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true,
        }
// this.increment=this.increment.bind(this);
// this.Decrement=this.Decrement.bind(this);
    }

// increment(){
//     this.setState({
//         counter:this.state.counter+1,
//     })
// }
// Decrement(e){
// if(this.state.counter>0){
//     this.setState({
//         counter:this.state.counter-1,
        
//     })}
// }
oncall(){
    const variable=this.state.show;
    this.setState(!variable);
    // alert("calle");
}
render(){
     const{item,onConform,onDecline}=this.props;
    return(
        <SafeAreaView style={{marginTop:20}}>
        <View style={{flex:1, alignItems:'center', justifyContent:'space-between'}} key={item} >
            {/* <Text>Welcome to The St.James Hospital A&E</Text> */}
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
export default Counter;