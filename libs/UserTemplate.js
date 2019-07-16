import React from 'react'
import { Text, View, Image, ActivityIndicator, Alert, TouchableOpacity, BackHandler } from 'react-native'
import {Entypo} from '@expo/vector-icons'
import DialogInput from 'react-native-dialog-input'
import firebase from "firebase"
import "firebase/auth"
import "firebase/database"
import {AdMobBanner} from 'expo'
const topHeaderStyle = require('../libs/Styles').styles_topHeader
const styles = require('../libs/Styles').styles_profile

export default class UserTemplate extends React.Component {
  
  constructor(props){
    super(props)
    const {navigation} = this.props
    this.accessList = this.accessList.bind(this)
    this.handleBackPress = this.handleBackPress.bind(this)
    this.state = {
      isLoading: true,
      nombre: '',
      usuario: '',
      uid: firebase.auth().currentUser.uid,
      id: navigation.getParam('id'),
      isDialogVisible: false,
      listas: [],
      Lref: firebase.database().ref('lists'),
      Uref: firebase.database().ref('users'),
      following: false,
      selectedList: '',
      validado: false,
      alertPresent: false,
    }
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }
  
  componentWillMount(){
    temporal = []
    firebase.database().ref('users/' + this.state.id).once('value', (snapshot) => {
      this.setState({nombre: snapshot.val().nombre, usuario: snapshot.val().usuario})
    })
    firebase.database().ref('lists/' + this.state.id).on('value', (snapshot) => {
      temporal = []
      snapshot.forEach((child) => {
        temporal.push(child.key)
      })
      this.setState({listas: temporal, isLoading: false})
    })
    this.state.Uref.child(this.state.uid + '/siguiendo/' + this.state.id).once('value', (snapshot) => {
      if(!(snapshot.val() == null)){
        if (snapshot.val().following) {
          this.setState({ following: true })
        }
      }
    })
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
    const { navigate } = this.props.navigation

    if(this.state.isLoading === true){
      return(
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )
    }

    render_listas = this.state.listas.map((v, k) => {
      return (
        <TouchableOpacity key={k} style={styles.listas} onPress={() => this.setState({isDialogVisible: true, selectedList: v})}>
          <Text style={[styles.main_text, {paddingHorizontal: 0}]}>{v}</Text>
        </TouchableOpacity>
      )
    })

    if(this.state.following){
        followStatus = "Unfollow"
    } else {
        followStatus = "Follow"
    }

    if (this.state.validado && !this.state.alertPresent) {
      this.setState({validado: false})
      navigate('ContentListTemplate', { id: this.state.id, lista: this.state.selectedList })
    } else if( !this.state.validado && this.state.alertPresent){
      Alert.alert('Contraseña Incorrecta')
      this.setState({alertPresent: false})
    }

    return (
      <View style={styles.main_container}>
        <View style={[topHeaderStyle.topHeader, {flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center', paddingHorizontal: 20}]}>
            <Entypo name={'chevron-left'} size={30} color={'white'} onPress={() => goBack()}></Entypo>
            <Text style={[topHeaderStyle.main_text, {marginLeft: 94}]}>Profile</Text>
        </View>
        <View style={[styles.user_header, {justifyContent: 'space-between'}]}>
          <Image style={{width:50, height:50}} source={{uri: 'https://www.juptr.io/images/default-user.png'}}></Image>
          <View style={{flexDirection: 'column', alignItems:'center'}}>
            <Text style={styles.main_text}>{this.state.nombre}</Text>
            <Text style={{paddingHorizontal: 20, fontSize: 15, color: '#c6c6c6'}}>@{this.state.usuario}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => Alert.alert("Following", "Now following " + this.state.nombre)}>
                <Text style={[styles.buttons]} onPress={() => this.followUser(!this.state.following)}>{followStatus}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.user_info, {flexDirection: 'row'}]}>
          <Text style={[styles.main_text, {paddingHorizontal: 0}]}>Listas:</Text>
        </View>
        <View>
          {render_listas}
        </View>

        <AdMobBanner
          style={{ position: "absolute", bottom: 0 }}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-2057967511465377/7519667728"
          // My ID: ca-app-pub-2057967511465377/7519667728
          //Test ID: ca-app-pub-3940256099942544/6300978111
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />

        <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Acceder a lista"}
            message={"Contraseña de la lista:"}
            submitInput={ (password) => {this.accessList(password); this.setState({isDialogVisible: false})} }
            closeDialog={() => this.setState({isDialogVisible: false})}>
        </DialogInput>
      </View>
    )
  }
  
  followUser(bln){
    message = ""
    if(this.state.following){
        message = "Has dejado de seguir a " + this.state.nombre
        this.setState({following: false})
    } else {
        message = "¡Ahora siguiendo a " + this.state.nombre + "!"
        this.setState({following: true})
    }

    this.state.Uref.child(this.state.uid).child('siguiendo').child(this.state.id).set({
        following: bln
    })
    Alert.alert(message)
  }

  accessList(psswd) {
    console.log("Validando...")
    console.log("Lista seleccionada: " + this.state.selectedList)
    this.state.Lref.child(this.state.id + '/' + this.state.selectedList).once('value', (snapshot) => {
      if (psswd == snapshot.val().password) {
        this.setState({ validado: true, alertPresent: false })
      } else {
        this.setState({alertPresent: true})
      }
    })
    //Proceso de validacion
  }

}