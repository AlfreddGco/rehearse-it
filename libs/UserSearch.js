import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

export default class UserSearch extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10, paddingVertical: 10}}>
                    <Image style={{width:30, height:30}} source={{uri: 'https://www.juptr.io/images/default-user.png'}}></Image>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 15, paddingVertical: 5, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={styles.nombre_text}>{this.props.nombre}</Text>
                    <Text style={styles.usuario_text}>@{this.props.usuario}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopColor: 'rgb(233, 235, 238)',
        borderTopWidth: 1,
        paddingVertical: 3,
    },
    nombre_text: {
        fontSize: 20,
        textAlign: 'left',
    },
    usuario_text: {
        fontSize: 15,
        color: 'rgb(233, 235, 238)',
        textAlign: 'left',
    },
})