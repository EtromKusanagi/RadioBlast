import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { displayPlayer } from "../Actions/HomePageAction";
import { scale } from '../assets/scaling';

import Icon from 'react-native-vector-icons/FontAwesome5';


class FooterMenu extends Component {
    render(){
        return(
            <View style={styles.footerMenu}>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.programacao()}>
                    {/* <Text>EVENTOS</Text> */}
                    <Icon name='clock'size={scale(27)} color='#000' />
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
                    <Icon name='id-card'size={scale(27)} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.recardo()}>
                    {/* <Text>EQUIPE</Text> */}
                    <Icon name='user-friends'size={scale(27)} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionItem,{
                        borderLeftWidth: 2,
                        borderLeftColor: '#707070',
                    }]}
                    onPress={() => Actions.recardo()}>
                    {/* <Text>EQUIPE</Text> */}
                    <Icon name='book-open'size={scale(27)} color='#000' />
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
        height: scale(70),
        padding: scale(10),
        marginHorizontal: scale(20),
        marginBottom: scale(20),
        borderRadius: scale(20),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionItem: {
        flex: 1,
        alignItems: 'center'
    }
})