import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../../assets/scaling';

export default class Recardo extends Component {
    render(){
        return(
            <View style={styles.content}>
                <View style={styles.logoContent}>
                    <TouchableOpacity>
                        <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                    </TouchableOpacity>
                </View>
                <View style={{
                            paddingVertical: scale(20),
                            marginHorizontal: scale(20),
                            borderRadius: scale(10)
                        }}>
                    <TextInput
                        style={styles.input}
                        placeholder="seu nome/nick"
                    />
                    <TextInput
                        style={[styles.input, { textAlignVertical: "top"}]}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="sua mensagem"
                    />
                    <TouchableOpacity style={styles.btnSubmit}>
                    <Icon name="paper-plane" size={scale(20)} color='#fff'/>
                        <Text style={{
                            fontSize: scale(16),
                            fontWeight: "bold",
                            color: "#fff",
                            marginLeft: scale(10)
                        }}>Enviar recado!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
    },
    logoContent: {
        height: scale(111),
        paddingBottom: scale(40),
        paddingLeft: scale(10),
        backgroundColor: '#99CC00',
        justifyContent: 'flex-end'
    },
    logo: {
        marginLeft: scale(10),
        width: scale(130),
        height: scale(50)
    },
    input: {
        backgroundColor: "#fff",
        paddingHorizontal: scale(20),
        borderRadius: scale(10),
        marginBottom: scale(10)
    },
    btnSubmit: {
        backgroundColor: "#99CC00",
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
        borderRadius: scale(10),
        flexDirection: "row"
    }
})