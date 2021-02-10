import React, { Component } from 'react';
import{Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';
class DoctorsComp extends Component{
    constructor(props){
        super(props)
        
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
render(){
     const{item,onConformed,onDeclined}=this.props;
    return(
        <SafeAreaView style={{backgroundColor:'#eee',paddingTop:10}}>
        <View style={{flex:1, alignItems:'center', justifyContent:'space-between',}} key={item} >
            {/* <Text>Welcome to The St.James Hospital A&E</Text> */}
            <Text style={{color:'black'}}>{item}</Text>
        
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:100}}>
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


}
export default DoctorsComp;