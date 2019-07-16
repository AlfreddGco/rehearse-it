import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native'
import firebase from "firebase"; import "firebase/auth"; import "firebase/database";
const styles = require('../libs/Styles').styles_forms


export default class Register extends React.Component {
  
  constructor(props){
    super(props)
    this.onRegister = this.onRegister.bind(this)
    this.handleBackPress = this.handleBackPress.bind(this)
    this.state = {
      email: '',
      password: '',
      password_conf: '',
      nombre: '',
      usuario: '',
    }
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
    return (
      <View style={styles.main_container}>
        <Text style={styles.main_text}>Register</Text>
        <View style={styles.form_container}>
          <TextInput style={styles.text_input} placeholder={'Correo'} underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(param) => this.setState({email: param})}></TextInput>
          <TextInput style={styles.text_input} placeholder={'Nombre'} underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(param) => this.setState({nombre: param})}></TextInput>
          <TextInput style={styles.text_input} placeholder={'Usuario'} underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(param) => this.setState({usuario: param})}></TextInput>
          <TextInput style={styles.text_input} placeholder={'Contraseña'} underlineColorAndroid={'rgba(0,0,0,0)'} secureTextEntry={true} onChangeText={(param) => this.setState({password: param})} autoCapitalize={'none'}></TextInput>
          <TextInput style={styles.text_input} placeholder={'Confirmar contraseña'} underlineColorAndroid={'rgba(0,0,0,0)'} secureTextEntry={true} onChangeText={(param) => this.setState({password_conf: param})} autoCapitalize={'none'}></TextInput>
          <TouchableOpacity style={styles.buttons} onPress={this.onRegister}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onRegister() {
    const { email, password, nombre, usuario, password_conf } = this.state
    if(password == password_conf){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("Successful Registration :D")
        user = firebase.auth().currentUser
        if(user != null){
          firebase.database().ref('users/' + user.uid).set({
            nombre: nombre,
            usuario: usuario,
          })
          firebase.database().ref('users/' + user.uid + '/siguiendo').set({
          })
        }
        this.props.navigation.navigate('Login')
      })
      .catch((error) => {
        const { code, message } = error
        console.log(message)
        Alert.alert(
          'Registro Inválido',
          message,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
      })
    }
    else {
      Alert.alert(
        'Confirmación de contraseña',
        'Las contraseñas no coinciden',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

}