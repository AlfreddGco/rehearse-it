import React from 'react'
import { Text, View, TouchableOpacity, TextInput, Alert, StyleSheet, BackHandler } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import firebase from "firebase"
import "firebase/auth"
import "firebase/database"
import {AdMobBanner} from 'expo'
const topHeaderStyle = require('../libs/Styles').styles_topHeader
const styles = require('../libs/Styles').styles_forms

export default class ChangePassword extends React.Component {

    constructor(props) {
        super(props)
        const { navigation } = this.props
        this.reauthenticate = this.reauthenticate.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.handleBackPress = this.handleBackPress.bind(this)
        this.state = {
            password: '',
            new_password: '',
            conf_password: '',
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
        const { goBack } = this.props.navigation
        return (
            <View style={styles_main.main_container}>
                <View style={[topHeaderStyle.topHeader, {justifyContent: 'space-between'}]}>
                    <Entypo name={'chevron-left'} size={30} color={'white'} onPress={() => goBack()}></Entypo>
                    <Text style={[topHeaderStyle.main_text, {marginRight: 35}]}>Cambiar contraseña</Text>
                </View>
                <View style={{paddingHorizontal: 25}}>
                    <TextInput style={[styles.text_input, {borderColor: 'rgb(233, 235, 238)', borderWidth: 1.5}]} placeholder={'Contraseña Actual'} underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(psswd) => this.setState({ password: psswd })} secureTextEntry={true} autoCapitalize={'none'}></TextInput>
                    <TextInput style={[styles.text_input, {borderColor: 'rgb(233, 235, 238)', borderWidth: 1.5}]} placeholder={'Nueva Contraseña'} underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(psswd) => { this.setState({ new_password: psswd }) }} secureTextEntry={true} autoCapitalize={'none'}></TextInput>
                    <TextInput style={[styles.text_input, {borderColor: 'rgb(233, 235, 238)', borderWidth: 1.5}]} placeholder={'Confirmar Nueva Contraseña'} underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(psswd) => { this.setState({ conf_password: psswd }) }} secureTextEntry={true} autoCapitalize={'none'}></TextInput>
                    <TouchableOpacity style={[styles.buttons, { backgroundColor: 'white', borderColor: 'rgb(233, 235, 238)', borderWidth: 1.5}]} onPress={() => { this.changePassword(this.state.password, this.state.new_password, this.state.conf_password) }}>
                        <Text style={{ fontSize: 15 }}>Cambiar contraseña</Text>
                    </TouchableOpacity>
                </View>
                <AdMobBanner
                    style={{ position: "absolute", bottom: 70, left: 30 }}
                    bannerSize="mediumRectangle"
                    adUnitID="ca-app-pub-2057967511465377/4701932691"
                    // My ID: ca-app-pub-2057967511465377/4701932691
                    //Test ID: ca-app-pub-3940256099942544/6300978111
                    testDeviceID="EMULATOR"
                    didFailToReceiveAdWithError={this.bannerError}
                />
            </View>
        )
    }

    reauthenticate = (currentPassword) => {
        user = firebase.auth().currentUser
        cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword)
        return user.reauthenticateAndRetrieveDataWithCredential(cred)
    }

    changePassword = (currentPassword, newPassword, confPassword) => {
        const {goBack} = this.props.navigation
        if(confPassword == newPassword){
            this.reauthenticate(currentPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {
                    console.log("Password updated!")
                    Alert.alert('Contraseña actualizada')
                    this.setState({ password: '', new_password: '', conf_password: ''})
                    goBack()
                }).catch((error) => { console.log(error); })
            }).catch((error) => { 
                if(error.toString().includes('password is invalid')){
                    Alert.alert('Contraseña incorrecta')
                }
             })
        } else ( Alert.alert("Las contraseñas no coinciden"))
    }   
}

const styles_main = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    form_container: {
        paddingHorizontal: 25,
        backgroundColor: 'rgb(71, 186, 251)',
    },
})