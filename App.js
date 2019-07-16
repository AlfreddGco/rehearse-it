import React from 'react'
import {View, Image} from 'react-native'
//import * as firebase from 'firebase' <<-- ORIGINAL IMPORT IN VERSION 1 AND 1.2
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import {createStackNavigator} from 'react-navigation'
import Register from './Screens/Register'
import Login from './Screens/Login'
import MainScreenNavigator from './Screens/MainScreenNavigator'

const firebaseConfig = {
}

firebase.initializeApp(firebaseConfig)

export const NavigationAppLogin = createStackNavigator({
  Login: Login,
  Register: Register,
},
{
  initialRouteName: 'Login',
  navigationOptions: {
    header: null
  }
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      })
    })
  }
  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription()
  }

  render() {
    // The application is initialising
    if (this.state.loading==true) return(
      <View style={{ flex:1, backgroundColor:'rgb(233, 235, 238)', justifyContent:'center', alignItems:'center'}}>
        <Image source={require('./Resources/just-circle.png')} style={{width: 130, height: 130}}/>
      </View>
    )
    // The user is an Object, so they're logged in
    if (this.state.user) return <MainScreenNavigator/>
    // The user is null, so they're logged out
    return <NavigationAppLogin/>
  }
}
