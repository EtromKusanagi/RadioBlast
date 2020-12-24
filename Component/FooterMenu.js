import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { scale } from '../assets/scaling';


export default class FooterMenu extends Component {
    render(){
        return(
            <View style={styles.footerMenu}>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.pedido()}>
                    <Text>Pedido</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.recardo()}>
                    <Text>Recardo</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    footerMenu: {
        position: 'absolute',
        bottom: scale(20),
        height: scale(70),
        width: scale(310),
        left: scale(20),
        padding: scale(10),
        borderRadius: scale(20),
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    optionItem: {
        flex: 1
    }
})