import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import {AdMobBanner} from 'expo'
import * as firebase from 'firebase'
const topHeaderStyle = require('../libs/Styles').styles_topHeader
const stylesUserT = require('../libs/Styles').styles_profile

export default class Settings extends React.Component {

  constructor(props){
    super(props)
    const {navigation} = this.props
    this.signOutUser = this.signOutUser.bind(this)
    this.handleBackPress = this.handleBackPress.bind(this)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
    return true
  }

  render() {
    const {goBack, navigate} = this.props.navigation
    return (
      <View style={styles.main_container}>
        <View style={[topHeaderStyle.topHeader, {
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}]}>
          <Entypo name={'chevron-left'} size={30} color={'white'} onPress={() => goBack()}></Entypo>
          <Text style={topHeaderStyle.main_text}>Settings</Text>
          <Ionicons name={'ios-settings-outline'} size={30} color={'white'}/>
        </View>
        <ScrollView style={{backgroundColor: 'white'}}>
          <TouchableOpacity style={[stylesUserT.listas, { marginTop: 4 , justifyContent:'center'}]} onPress={()=> navigate('ChangePassword')}>
            <Text style={[stylesUserT.main_text, { paddingHorizontal: 0 }]}>Cambiar Contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[stylesUserT.listas, {justifyContent: 'center'}]} onPress={this.signOutUser}>
            <Text style={[stylesUserT.main_text, { paddingHorizontal: 0 }]} >Logout</Text>
          </TouchableOpacity>
        </ScrollView>
        <AdMobBanner
          style={{ position: "absolute", bottom: 160, left: 30 }}
          bannerSize="mediumRectangle"
          adUnitID="ca-app-pub-2057967511465377/2354970955"
          // My ID: ca-app-pub-2057967511465377/2354970955
          //Test ID: ca-app-pub-3940256099942544/6300978111
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    )
  }

  signOutUser = async () => {
    try {
      await firebase.auth().signOut()
    } catch (e) {
      console.log(e)
    }
  }

}

const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    form_container: {
      paddingHorizontal: 25,
      backgroundColor: 'skyblue',
    },
    main_text: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text_input: {
      height: 40,
      borderWidth: 0,
      backgroundColor: 'white',
      marginTop: 20,
      paddingHorizontal: 8,
      borderRadius: 10,
    },
    buttons: {
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: '#4286f4',
      padding: 10,
      borderRadius: 10,
    }
  });