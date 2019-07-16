import React from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import UserSearch from '../libs/UserSearch'
import firebase from "firebase"; import "firebase/auth"; import "firebase/database";
const topHeaderStyle = require('../libs/Styles').styles_topHeader
const searchInputStyle = require('../libs/Styles').styles_forms

export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: firebase.auth().currentUser.uid,
      Uref: firebase.database().ref('users'),
      searchTerm: '',
      nombres: [],
      usuarios: [],
      ids: [],
      written: false,
    }
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }

  componentWillMount(){
    t = []
    t2 = []
    t3 = []
    this.state.Uref.once('value', (snapshot) => {
      snapshot.forEach((child) => {
        if(child.key != this.state.id){
          t.push(snapshot.child(child.key + "/nombre").val())
          t2.push(snapshot.child(child.key + "/usuario").val())
          t3.push(child.key)
        }
      })
      console.log("Done loading")
      this.setState({nombres: t, usuarios: t2, ids: t3, isLoading: false})
    })
  }

  render() {

    const { navigate } = this.props.navigation;

    if(this.state.isLoading === true){
      return(
        <View style={{ flex: 1, alignContent: 'center', flexDirection: 'column', justifyContent: 'center', paddingTop: 44.5,}}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )
    }

    const filteredUsers = this.state.usuarios.filter( (user) => {
      return user.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) != -1  //Si esta en la lista lo devuelve y guarda
    })

    return (
      <View style={styles.main_container}>

        <View style={[topHeaderStyle.topHeader, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }]}>
          <TextInput style={[searchInputStyle.text_input, { marginTop: 0, width: 280, fontSize: 25 }]} maxLength={21} placeholder={'Search'} underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(text) => this.updateSearch(text)}></TextInput>
          <Ionicons name={'ios-search-outline'} size={30} onPress = {() => navigate('UserTemplate', {id: this.props.id})}></Ionicons>
        </View>

        <ScrollView>
          {filteredUsers.map((value, key) => {
            if(this.state.written){
              return (
                <TouchableOpacity onPress={() => navigate('UserTemplate', {id: this.state.ids[this.state.usuarios.indexOf(value)]})} key={key}>
                  <UserSearch nombre={this.state.nombres[this.state.usuarios.indexOf(value)]} usuario={value}/>
                </TouchableOpacity>
              )
            }
          })}
        </ScrollView>

      </View>
    )
  }

  updateSearch(input) {
    if(input=="")
      this.setState({searchTerm: input, written: false})
    else
      this.setState({ searchTerm: input, written: true })
  }

}

const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: 'ghostwhite',
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
  })