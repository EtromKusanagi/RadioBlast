import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { displayPlayer } from "../Actions/HomePageAction";
import { scale } from '../assets/scaling';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../assets/fonts/selection.json';
const Blast = createIconSetFromIcoMoon(
    icoMoonConfig,
    'redeblast',
    'icomoon.ttf'
);


class FooterMenu extends Component {
    render(){
        return(
            <View style={styles.footerMenu}>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.home()}>
                    {/* <Text>EVENTOS</Text> */}
                    <Icon name='home'size={scale(20)} color='#000' />
                    <Text style={{
                        fontSize: scale(10)
                    }}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionItem,{
                        borderLeftWidth: 2,
                        borderLeftColor: '#707070',
                    }]}
                    onPress={() => Actions.programacao()}>
                    {/* <Text>EVENTOS</Text> */}
                    <Icon name='clock'size={scale(20)} color='#000' />
                    <Text style={{
                        fontSize: scale(10)
                    }}>Programação</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionItem,{
                        borderLeftWidth: 2,
                        borderRightWidth: 2,
                        borderLeftColor: '#707070',
                        borderRightColor: '#707070'
                    }]}
                    onPress={() => Actions.recardo()}>
                    {/* <Text>EQUIPE</Text> */}
                    <Icon name='comment-alt'size={scale(20)} color='#000' />
                    <Text style={{
                        fontSize: scale(10)
                    }}>Recado</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.pedido()}>
                    {/* <Text>EQUIPE</Text> */}
                    <Icon name='music'size={scale(20)} color='#000' />
                    <Text style={{
                        fontSize: scale(10)
                    }}>Música</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    statusDisplayPlay:         state.HomePageReducer.statusDisplayPlay,
});
export default connect(mapStateToProps, { displayPlayer })(FooterMenu);
const styles = StyleSheet.create({
    footerMenu: {
        height: scale(50),
        padding: scale(10),
        marginHorizontal: scale(20),
        marginVertical: scale(5),
        borderRadius: scale(10),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionItem: {
        flex: 1,
        alignItems: 'center'
    }
})