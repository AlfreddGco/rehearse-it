import React from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native'
import firebase from "firebase"; import "firebase/auth"; import "firebase/database";
import FriendProfile from '../libs/FriendProfile'
import { AdMobBanner } from 'expo'
const topHeaderStyle = require('../libs/Styles').styles_topHeader
const styles = require('../libs/Styles').styles_home

export default class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      id: firebase.auth().currentUser.uid,
      isLoading: true,
      usuarios: [],
      Lref: firebase.database().ref('lists'),
      Uref: firebase.database().ref('users'),
    }
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }

  componentWillMount(){
    temporal = []
    this.state.Uref.child(this.state.id + '/siguiendo').on('value', (snapshot) => {
      temporal = []
      snapshot.forEach((child) => {
        if(snapshot.child(child.key + '/following').val()){
          temporal.push(child.key)
          console.log("Retrieved: " + child.key)
        }
      })
      console.log("Temporal: " + temporal)
      this.setState({usuarios: temporal, isLoading: false})
    })
  }

  render() {
    const { navigate } = this.props.navigation;

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, alignContent: 'center', flexDirection: 'column', justifyContent: 'center'}}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )
    }
    
    render_friends = this.state.usuarios.map((value, key) =>{
      return(
        <TouchableOpacity onPress={()=> navigate('UserTemplate', {id: value})} key={key}>
          <FriendProfile id={value} key={value}/>
        </TouchableOpacity>
      )
    })

    
    return (
      <View style={styles.main_container}>
        <View style={topHeaderStyle.topHeader}>
          <Text style={topHeaderStyle.main_text}>Friends</Text>
        </View>
        
        <ScrollView>
          {render_friends}
        </ScrollView>
        
        <AdMobBanner
          style={{ position: "absolute", bottom: 0}}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-2057967511465377/9425320926"
          // My ID: ca-app-pub-2057967511465377/9425320926
          //Test ID: ca-app-pub-3940256099942544/6300978111
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />

      </View>
    )
  }
}