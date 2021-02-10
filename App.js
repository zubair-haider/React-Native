import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import Counter from './Counter';
import ComponentsHolder from './ComponentsHolder';

import { Image, StyleSheet, Text, View,TouchableOpacity,Button,SafeAreaView } from 'react-native';
import logo from './assets/boy.png';

export default function App() {
  const[shouldShow,setShouldShow]=useState(false);
  return (
    <SafeAreaView style={{flex:1, marginTop:100,}} >
      <View style={{backgroundColor:'yellow'}}>
      <ComponentsHolder/>
        {/* { shouldShow?(<Button style={{backgroundColor:'green'}} title="Hide/Show"/>):<Text>Press CLICK ME to see second Button</Text>

        }
        <Button style={styles.buttonClass} title="click me" onPress={()=> setShouldShow(!shouldShow)}>

        </Button> */}
        {/* <Counter/> */}

      </View>
     
    
    </SafeAreaView>
    // <View style={styles.container}>
    //   {/* <Image source={logo} style={{width:200,height:200,margin:20}} ></Image> */}
    //   <Text className="text" style={{color:'black',fontStyle:'italic', backgroundColor:'white',fontSize:18,width:200,height:50,justifyContent:'space-between',alignContent:'stretch'}}>welcome to the St.james Hospital A&E</Text>
    //   <Text style={{color:'black',fontStyle:'italic', backgroundColor:'white',fontSize:18,width:300,height:50, margin:10,}}>Would you like to join virtual Queue?</Text>
      
    //   {/* <StatusBar style="auto" /> */}
    //   <TouchableOpacity  style={{backgroundColor:'green',marginTop:10,}}>
    //     <Text style={{fontSize:20,color:'#fff',margin:10,}}>Change text</Text>
    //   </TouchableOpacity>
    
    // </View>
  
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
