import { VideoExportPreset } from 'expo-image-picker';
import React, { Component,useState,useEffect } from 'react';
import {SafeAreaView, Text, View,Button} from 'react-native';
import IntialComponent from './Counter';
import DoctorsComp from './DoctorsComponent';
import CountDownTimer  from './LeaveComponent';
import Complete from './Complete';

const ComponentsHolder=()=>{
//     constructor(props){
//         super(props);
//         this.child=React.createRef();
//         this.state={
//             text:[{text2:"Would you like to join the Virtual Queue"},],
//             nextState:[],
//             lastState:[],
//             increment:1,
//             complete:[],
//              empty:null,
//              counter:0,
//         }
//    this.onConform=this.onConform.bind(this);
//    this.onDecline=this.onDecline.bind(this);
//    this.onConformed=this.onConformed.bind(this);
//    this.onDeclined=this.onDeclined.bind(this);
//    this.onDeclinedLeave=this.onDeclinedLeave.bind(this);
//    this.onReset=this.onReset.bind(this);
//    this.settingState=this.settingState.bind(this);

//     }
const[text,setText]=useState( [{text2:"Would you like to Join the Virtual Queue"}]);
const[nextState,setNextState]=useState('');
const[lastState,setLastState]=useState('');
const[complete,setComplete]=useState('');
const [increment,setIncrement]=useState("1");
 const onConformed=()=>{
        setNextState([...nextState,{text:"people are ahead of you,your estimated time is 4-0 hours"}])
        setText('');
        setIncrement("2");
 }
const onDecline=()=>{
    alert("you are at intial state");
}
const onProceed=()=>{
    setLastState([...lastState,{lasttext:"Have You Seen By the Doctor?"}])
    setNextState('');
    setIncrement("3");
}
const onReset=()=>{
      setText([...text,{text2:"Would you like to Join the Virtual Queue"}])
      setNextState('');
      setLastState('');
      setComplete('');
      setIncrement("1");
}
const onLastStateConform=()=>
{
    setComplete ([...complete,{completeText:"Visit Completed"}])
    setLastState('');
    setIncrement("4");
 }

       
        return(
            <SafeAreaView >
                    <View style={{width:100,height:50,backgroundColor:'#1A788D',flex:1, alignItems:'center', justifyContent:'space-between',margin:'auto'}}>
                        <Text style={{color:'white',height:30,justifyContent:'center', alignItems:'center'}}>Stage: {increment}</Text>
                    </View>
                    <View>
                                    {console.log("length",text.length)}
                                    {text.length>0? text.map(item=>
                                                <IntialComponent item={item.text2} onConform={onConformed} onDecline={onDecline}   />

                                    ):null}
                    </View>

                     <View>
                                     {lastState.length>0?  lastState.map(item=>
                                    
                                                <DoctorsComp item={item.lasttext} onConformed={onLastStateConform} onDeclined={onReset}   />
                                            
                                    ):null
                                    }
                                 {nextState.length>0? nextState.map(item=>
                                    
                                    <CountDownTimer  setToIntial={onProceed} item={item.text} img={item.img} onDeclineLeave={onProceed} onReset={onReset}  />
                                    
                                        ):null
                                        } 
                    </View>
                     <View>
                            {complete.length>0? complete.map(item=>
                            
                            <Complete item={item.completeText} onReset={onReset}  />
                            
                                ):null
                                }
                    </View>
            </SafeAreaView>
        );
    
}
export default ComponentsHolder;

// class ComponentsHolder extends Component{
//     constructor(props){
//         super(props);
//         this.child=React.createRef();
//         this.state={
//             text:[{text2:"Would you like to join the Virtual Queue"},],
//             nextState:[],
//             lastState:[],
//             increment:1,
//             complete:[],
//              empty:null,
//              counter:0,
//         }
//    this.onConform=this.onConform.bind(this);
//    this.onDecline=this.onDecline.bind(this);
//    this.onConformed=this.onConformed.bind(this);
//    this.onDeclined=this.onDeclined.bind(this);
//    this.onDeclinedLeave=this.onDeclinedLeave.bind(this);
//    this.onReset=this.onReset.bind(this);
//    this.settingState=this.settingState.bind(this);

//     }
// onConform()
//     {
//                 this.setState({
//                     nextState:[...this.state.nextState,{texts:"Have You been Seen By the Doctor?",}],
//                     text:[],
//                     lastState:[],
//                     increment:3,
//      })
//     }
// settingState(){
//                 this.setState({
//                     text:[...this.state.text,{text2:"Would you like to join the Virtual Queue"},],
//                     increment:1,
//                 lastState:[],
//                 complete:[],
//                 })
//     }
// onDecline(){
//             //  this.setState({
//             //      text:[],
//             //      increment:1,
//             //  })
//      }
//     onConformed(){
//                     this.setState({
//                         lastState:[...this.state.lastState,{text:"people are ahead of you,your estimated time is 4-0 hours",}],
//                         text:[],
//                         increment:2,
//                     })
//     }
// onDeclined(){
       
//             this.setState({
//                 nextState:[],
//                 increment:'',
//             })
//             var msg= confirm("Are You sure you want to skip at this Stage?")
//             if(msg==true){
//             this.settingState();
//             } else{
//                 this.settingState();
//             }
// }
// onDeclinedLeave(){
//             this.setState({
//                 complete:[...this.state.complete,{text:"Survey Complted!"}],
//                 lastState:[],
//                 nextState:[],
//                 increment:4,
//             })
//      }
// onReset(){
//          this.settingState();
//          }
// render(){ 
       
//         return(
//             <SafeAreaView >
//                     <View style={{width:100,height:50,backgroundColor:'#1A788D',flex:1, alignItems:'center', justifyContent:'space-between',margin:'auto'}}>
//                         <Text style={{color:'white',height:30,justifyContent:'center', alignItems:'center'}}>Stage: {this.state.increment}</Text>
//                     </View>
//                     <View>
//                                     {/* <Text>this is paragraph</Text> */}
//                                     {this.state.text.length >=1?this.state.text.map(item=>
//                                                 <IntialComponent item={item.text2} onConform={this.onConformed} onDecline={this.onDecline}   />

//                                     ):null}
//                     </View>

//                     <View>
//                                     {this.state.nextState.length>0?   this.state.nextState.map(item=>
                                    
//                                                 <DoctorsComp item={item.texts} onConformed={this.onDeclinedLeave} onDeclined={this.onDeclined}   />
                                            
//                                     ):null
//                                     }
//                                     {this.state.timer>0?   this.state.lastState.map(item=>
                                    
//                                     <CountDownTimer  setToIntial={this.onConform} item={item.text} img={item.img} onDeclineLeave={this. onConform} onReset={this.onReset}  />
                                    
//                                         ):null
//                                         }
//                     </View>
//                     <View>
//                             {this.state.complete.length>0?   this.state.complete.map(item=>
                            
//                             <Complete item={item.text} img={item.img} onDeclineLeave={this.onConform} onReset={this.onReset}  />
                            
//                                 ):null
//                                 }
//                     </View>
//             </SafeAreaView>
//         );
//     }
// }
// export default ComponentsHolder;