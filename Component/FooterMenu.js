import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';


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
        height: 40,
        backgroundColor: '#ccc',
        flexDirection: 'row'
    },
    optionItem: {
        flex: 1
    }
})