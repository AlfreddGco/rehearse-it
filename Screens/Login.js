import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import firebase from "firebase"; import "firebase/auth"; import "firebase/database";
const styles = require('../libs/Styles').styles_forms

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    const navigator_main = this.props.navigation
    return (
      <View style={styles.main_container}>
        <Text style={styles.main_text}>Rehearse-it</Text>
        <View style={styles.form_container}>
          <TextInput style={styles.text_input} placeholder={'Correo'} underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(pemail) => this.setState({email: pemail})}></TextInput>
          <TextInput style={styles.text_input} placeholder={'Contraseña'} underlineColorAndroid={'rgba(0,0,0,0)'} secureTextEntry={true} onChangeText={(ppassword)=>{this.setState({password: ppassword})}} autoCapitalize={'none'}></TextInput>
          <TouchableOpacity style={styles.buttons} onPress={this.onLogin}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => navigator_main.navigate('Register')}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onLogin() {
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
      })
      .catch((error) => {
        const { code, message } = error;
        console.log("INCORRECT PASSWORD")
        console.log(message)
        mensaje = "Error. Por favor póngase en contacto con el desarrollador"
        if(message.includes("The password is invalid")){
          mensaje = "Contraseña incorrecta"
        } else if (message.includes("There is no user record")){
          mensaje = "El correo ingresado no está registrado"
        } else if (message.includes("badly formatted")){
          mensaje = "El correo ingresado no es un correo válido"
        }
        Alert.alert(mensaje)
      })
  }

}