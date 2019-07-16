import React from 'react'
import firebase from "firebase"
import "firebase/auth"
import "firebase/database"
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert, BackHandler} from 'react-native'
import {AdMobBanner} from 'expo'
import { Ionicons, Entypo } from '@expo/vector-icons'
import DialogInput from 'react-native-dialog-input'
const topHeaderStyle = require('../libs/Styles').styles_topHeader
const stylesUserT = require('../libs/Styles').styles_profile

export default class ContentListTemplate extends React.Component {

    constructor(props){
        super(props)
        const {navigation} = this.props
        this.writeNewContent = this.writeNewContent.bind(this)
        this.deleteAlert = this.deleteAlert.bind(this)
        this.deleteContent = this.deleteContent.bind(this)
        this.handleBackPress = this.handleBackPress.bind(this)
        this.state = {
            Lref: firebase.database().ref('lists'),
            Uref: firebase.database().ref('users'),
            id: navigation.getParam('id'),
            lista: navigation.getParam('lista'),
            elementos: [],
            dialogAddVisible: false,
        }
    }

    componentWillMount(){
        temporal = []
        console.log("SL: " + this.state.lista)
        this.state.Lref.child(this.state.id + '/' + this.state.lista + '/elementos').on('value', (snapshot) =>{
            temporal = []
            snapshot.forEach((child) => {
                temporal.push(child.val().name)
            })
            this.setState({elementos: temporal})
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
        componentes_listas = []
        componentes_listas = this.state.elementos.map((v, k) => {
            if (k == 0) {
                return (
                    <TouchableOpacity style={[stylesUserT.listas, { marginTop: 0 }]} key={k}>
                        <Text style={[stylesUserT.main_text, { paddingHorizontal: 0 }]}>{v}</Text>
                        <Ionicons name={'ios-remove-circle-outline'} size={30} onPress={() => this.deleteAlert(v)} />
                    </TouchableOpacity>
                )
            } else {
                return (
                    <TouchableOpacity style={stylesUserT.listas} key={k}>
                        <Text style={[stylesUserT.main_text, { paddingHorizontal: 0 }]}>{v}</Text>
                        <Ionicons name={'ios-remove-circle-outline'} size={30} onPress={() => this.deleteAlert(v)} />
                    </TouchableOpacity>
                )
            }
        })

        return (
            <View style={styles.main_container}>
                <View style={[topHeaderStyle.topHeader, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                    <Entypo name={'chevron-left'} size={30} color={'white'} onPress={() => goBack()}></Entypo>
                    <Text style={[topHeaderStyle.main_text, {marginRight: 10}]}>{this.state.lista}</Text>
                    <Ionicons name={'ios-add-circle-outline'} size={30} color={'white'} onPress = {() => this.setState({dialogAddVisible: true})} />
                </View>

                <ScrollView>
                    {componentes_listas}
                </ScrollView>

                <AdMobBanner
                    style={{ position: "absolute", bottom: 0 }}
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-2057967511465377/9515275677"
                    // My ID: ca-app-pub-2057967511465377/9515275677
                    //Test ID: ca-app-pub-3940256099942544/6300978111
                    testDeviceID="EMULATOR"
                    didFailToReceiveAdWithError={this.bannerError}
                />

                <DialogInput isDialogVisible={this.state.dialogAddVisible}
                    title={"Nuevo Elemento"}
                    message={"Nombre:"}
                    submitInput={ (inputText) => this.writeNewContent(inputText) }
                    closeDialog={() => this.setState({dialogAddVisible: false})}>
                </DialogInput>
            </View>
        )
    }

    writeNewContent(title) {
        if(!this.state.elementos.includes(title)){
            console.log("Enviando input: " + title)
            postData = {
                name: title,
                addedBy: firebase.auth().currentUser.uid,
            }
            if (title != "") {
                ref = this.state.Lref.child(this.state.id).child(this.state.lista).child('elementos')
                ref.push(postData)
            }
            this.setState({ dialogAddVisible: false })
        } else {
            Alert.alert(
                'Elemento repetido',
                'Ya hay un elemento en la lista con el nombre introducido'
            )
        }
        
    }

    deleteAlert(content){
        Alert.alert(
            'Eliminar',
            '¿Desea eliminar este elemento?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Si', onPress: () => this.deleteContent(content)},
            ],
            { cancelable: false }
        )
    }

    deleteContent(content){
        this.state.Lref.child(this.state.id + '/' + this.state.lista + '/elementos').once('value', (snapshot) => {
            snapshot.forEach((child) => {
                if (child.val().name == content) {
                    this.state.Lref.child(this.state.id + '/' + this.state.lista + '/elementos/' + child.key).set(null)
                }
            })
        })
    }

}


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'ghostwhite',
    },
})