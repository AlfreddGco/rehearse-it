import React from 'react'
import firebase from "firebase"; import "firebase/auth"; import "firebase/database";
import { Text, View, StyleSheet, Image } from 'react-native'

export default class FriendProfile extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            Lref: firebase.database().ref('lists'),
            Uref: firebase.database().ref('users'),
            nombre: '',
            listas: []
        }
    }

    componentWillMount(){
        temporal = []
        this.state.Uref.child(this.props.id).on('value', (snapshot) => {
            this.setState({nombre: snapshot.val().nombre})
        })
        this.state.Lref.child(this.props.id).on('value', (snapshot) =>{
            temporal = []
            snapshot.forEach((child) => {
                temporal.push(child.key)
            })
            this.setState({listas: temporal})
        })
    }


    render() {
        componentes_listas = []
        componentes_listas = this.state.listas.map((v, k) => {
            if (k == this.state.listas.length-1) {
                return (
                    <View style={[styles.user_lists, { borderBottomWidth: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]} key={k}>
                        <Text style={styles.normal_text}>{v}</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.user_lists} key={k}>
                        <Text style={styles.normal_text}>{v}</Text>
                    </View>
                )
            }
        })

        if(componentes_listas.length != 0){
            return (
                <View style={styles.main_container}>
                    <View style={styles.user_info}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://www.juptr.io/images/default-user.png' }}></Image>
                        <Text style={styles.normal_text}>{this.state.nombre}</Text>
                    </View>
                    {componentes_listas}
                </View>
            )
        } else {
            return (
                <View style={styles.main_container}>
                    <View style={[styles.user_info, {borderBottomLeftRadius:10, borderBottomRightRadius:10}]}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://www.juptr.io/images/default-user.png' }}></Image>
                        <Text style={styles.normal_text}>{this.state.nombre}</Text>
                    </View>
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        marginTop: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgb(233, 235, 238)',
        borderRadius: 10,
    },
    user_info: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(233, 235, 238)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    user_lists: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(233, 235, 238)',
    },
    normal_text: {
        fontSize: 20,
        textAlign: 'left',
        paddingLeft: 10
    },
})