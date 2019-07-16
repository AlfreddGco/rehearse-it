import React from 'react'
import { Text, View, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {AdMobBanner} from 'expo'
import DialogInput from 'react-native-dialog-input'
import firebase from "firebase"; import "firebase/auth"; import "firebase/database";
const topHeaderStyle = require('../libs/Styles').styles_topHeader
const styles = require('../libs/Styles').styles_profile

export default class Profile extends React.Component {
  
  constructor(props){
    super(props)
    const {naviagte} = this.props
    this.writeNewList = this.writeNewList.bind(this)
    this.removeLista = this.removeLista.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.state = {
      isLoading: true,
      nombre: '',
      usuario: '',
      id: firebase.auth().currentUser.uid,
      Lref: firebase.database().ref('lists'),
      isDialogVisible: false,
      passwordDialogVisible: false,
      IpasswordDialogVisible: false,
      listas: [],
      contraseñas: [],
      selectedList: '',
      nuevaLista: '',
    }
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }
  
  componentWillMount(){
    temporal = []
    t2 = []
    firebase.database().ref('users/' + this.state.id).once('value', (snapshot) => {
      this.setState({nombre: snapshot.val().nombre, usuario: snapshot.val().usuario})
    })
    firebase.database().ref('lists/' + this.state.id).on('value', (snapshot) => {
      temporal = []
      t2 = []
      snapshot.forEach((child) => {
        temporal.push(child.key)
        t2.push(snapshot.child(child.key).val().password)
      })
      this.setState({listas: temporal, contraseñas: t2 , isLoading: false})
    })
  }


  render() {
    const {navigate} = this.props.navigation
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, alignContent: 'center', flexDirection: 'column', justifyContent: 'center'}}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )
    }

    render_listas = this.state.listas.map((v, k) => {
      return (
        <TouchableOpacity key={k} style={styles.listas} onPress={() => navigate('ContentListTemplate', {id: this.state.id, lista: v})} onLongPress={() => this.setState({passwordDialogVisible: true, selectedList: v, contraseñaSelected: this.state.contraseñas[k]})}>
          <Text style={[styles.main_text, {paddingHorizontal: 0}]}>{v}</Text>
          <Ionicons name={'ios-remove-circle-outline'} size={30} onPress={() => this.removeLista(k)}></Ionicons>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.main_container}>
        <View style={[topHeaderStyle.topHeader, {justifyContent: 'space-between'}]}>
          <Text style={topHeaderStyle.main_text}>Profile</Text>
          <Ionicons name={'ios-settings-outline'} size={30} color={'white'} onPress={() => navigate('Settings')}></Ionicons>
        </View>
        <View style={styles.user_header}>
          <Image style={{width:50, height:50}} source={{uri: 'https://www.juptr.io/images/default-user.png'}}></Image>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.main_text}>{this.state.nombre}</Text>
            <Text style={{paddingHorizontal: 20, fontSize: 15, color: '#c6c6c6'}}>@{this.state.usuario}</Text>
          </View>
        </View>
        <View style={[styles.user_info, {flexDirection: 'row'}]}>
          <Text style={[styles.main_text, {paddingHorizontal: 0}]}>Mis Listas:</Text>
          <Ionicons name={'ios-add-circle-outline'} size={30} style={{marginLeft: 200}} onPress={() => this.setState({isDialogVisible: true})}></Ionicons>
        </View>
        <View>
          {render_listas}
        </View>

        <AdMobBanner
          style={{ position: "absolute", bottom: 0 }}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-2057967511465377/2842056111"
          // My ID: ca-app-pub-2057967511465377/2842056111
          //Test ID: ca-app-pub-3940256099942544/6300978111
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />

        <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Nueva Lista"}
            message={"Nombre:"}
            submitInput={ (inputText) => {this.setState({isDialogVisible: false, nuevaLista: inputText, IpasswordDialogVisible: true})} }
            closeDialog={() => this.setState({isDialogVisible: false})}>
        </DialogInput>

        <DialogInput isDialogVisible={this.state.passwordDialogVisible}
          title={"Contraseña para " + this.state.selectedList}
          message={"Contraseña actual: " + this.state.contraseñaSelected + "\nNueva contraseña:"}
          submitInput={(password) => this.setPassword(password)}
          closeDialog={() => this.setState({passwordDialogVisible: false})}>
        </DialogInput>

        <DialogInput isDialogVisible={this.state.IpasswordDialogVisible}
          title={"Contraseña para " + this.state.nuevaLista}
          message={"Contraseña:"}
          submitInput={(password) => this.writeNewList(password)}
          closeDialog={() => this.setState({ IpasswordDialogVisible: false })}>
        </DialogInput>

      </View>
    )
  }
  
  writeNewList(psswd) {
    title = this.state.nuevaLista
    console.log("Enviando input: " + title)
    uid = this.state.id
    if (title != '' && psswd != '') {
      postData = {
        password: psswd
      }
      newPostKey = firebase.database().ref().child('lists').push().key
      updates = {}
      updates[newPostKey + uid] = postData
      firebase.database().ref('lists/' + uid + '/' + title).update(postData)
    }
    this.setState({isDialogVisible: false, IpasswordDialogVisible: false, nuevaLista: ''})
  }

  removeLista(index) {
    remove = false
    uid = this.state.id
    Alert.alert(
      'Eliminar',
      '¿Desea eliminar esta lista?',
      [
        {text: 'No', onPress: () => console.log('No remover lista'), style: 'cancel'},
        {text: 'Si', onPress: () => {
            console.log('Remover lista\nData: ' + index)
            this.state.Lref.child(uid).child(this.state.listas[index]).set(null)
          }
        },
      ],
      { cancelable: false }
    )
  }

  setPassword(password){
    uid = this.state.id
    this.state.Lref.child(uid+'/'+this.state.selectedList).on('value', (snapshot) => {
      if(snapshot.val().elementos){
        postData = {
          password: password,
          elementos: snapshot.val().elementos
        }
      } else {
        postData = {
          password: password
        }
      }
    })
    this.state.Lref.child(uid + '/' + this.state.selectedList).set(postData)
    this.setState({passwordDialogVisible: false})
  }

}