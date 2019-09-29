import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {scale} from '../assets/scaling';

export default class Menu extends React.Component {
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.contentItems}>
                    <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.home()}>
                        <Text>Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.login()}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.sobre()}>
                        <Text>Sobre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.programacao()}>
                        <Text>Programação</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => Actions.ultimasTocadas()}>
                        <Text>Ultimas Tocadas</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles =  StyleSheet.create({
    content: {
        flex: 1,
    },
    header: {
        flex: 1, 
        backgroundColor: '#38BDF2', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    contentItems: {
        flex: 2, 
        backgroundColor: '#fff',
    },
    optionItem: {
        color: "#ccc",
        fontSize: scale(14),
        paddingVertical: scale(10),
        paddingHorizontal: scale(15),
        fontWeight: 'bold',
    },
    logo: {
        width: scale(280),
        height: scale(80),
    },
});