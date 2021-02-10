import { VideoExportPreset } from 'expo-image-picker';
import React, { Component } from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Counter from './Counter'
import DoctorsComp from './DoctorsComponent';
import LastComponent from './LeaveComponent';

class ComponentsHolder extends Component{
    constructor(props){
        super(props);
        this.state={
            text:[{text2:"Would you like to join the Virtual Queue"},],
            nextState:[],
            lastState:[],
        }
   this.onConform=this.onConform.bind(this);
   this.onDecline=this.onDecline.bind(this);
   this.onConformed=this.onConformed.bind(this);
   this.onDeclined=this.onDeclined.bind(this);
   this.onDeclinedLeave=this.onDeclinedLeave.bind(this);

    }
    onConform()
    {
        //  const tempvar="my array";
        // // console.log("console",tempvar);
        // // this.setState(tempvar);
        // console.log("text",this.state.text);
       this.setState({
           nextState:[...this.state.nextState,{texts:"Have You been Seen By the Doctor?",}],
           text:[],
           
       })
       console.log("state",this.state.text);
    }
     onDecline(){
     this.setState({
         text:[],
     })
     alert("are you sure you want to skip");

     }
    onConformed(){
                    this.setState({
                        lastState:[...this.state.lastState,{text:"18,20 people are ahead of you,your estimated time is 4-0 hours", img:"/boy.png",}],
                        nextState:[],
                    })
    }
    onDeclined(){
       this.setState({
           nextState:[],
       })
       alert("Are You sure you want to skip at this Stage?")
    }
    onDeclinedLeave(){
        this.setState({
            lastState:[],
        })
     }




    render(){
        return(
            <SafeAreaView>
            <View>
               {/* <Text>this is paragraph</Text> */}
            {this.state.text.length >=1?this.state.text.map(item=>
                        <Counter item={item.text2} onConform={this.onConform} onDecline={this.onDecline}   />

            ):null}
            </View>

            <View>
               {/* <Text>this is paragraph</Text> */}
            {this.state.nextState.length>0?   this.state.nextState.map(item=>
              
                        <DoctorsComp item={item.texts} onConformed={this.onConformed} onDeclined={this.onDeclined}   />
                       
            ):null
            }
            {this.state.lastState.length>0?   this.state.lastState.map(item=>
              
              <LastComponent item={item.text} img={item.img} onDeclineLeave={this.onDeclinedLeave}   />
             
  ):null
  }
            </View>
            </SafeAreaView>
        );
    }
}
export default ComponentsHolder;