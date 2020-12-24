import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from '../../assets/scaling';

export default class Home extends Component {
    render(){
        return(
            <View style={styles.content}>
                <View style={styles.logoContent}>
                    <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                </View>
                <View style={styles.session}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            <TouchableOpacity style={styles.btnPlayPause}></TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: scale(20),
                                lineHeight: scale(27),
                                fontWeight: 'bold'
                            }}>Agora na Blast!</Text>
                            <Text style={{
                                fontSize: scale(14),
                                lineHeight: scale(19)
                            }}>Playlist com o programa Playlist </Text>
                        </View>
                    </View>
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
        height: scale(151),
        paddingBottom: scale(24),
        backgroundColor: '#99CC00',
        justifyContent: 'flex-end'
    },
    logo: {
        //position: 'absolute',
        marginLeft: scale(10),
        width: scale(130),
        height: scale(50)
    },
    session: {
        backgroundColor:'#fff',
        height: scale(147),
        borderRadius: scale(20),
        marginTop: -scale(22),
        marginHorizontal: scale(20),
        padding: scale(20)
    },
    btnPlayPause: {
        width: scale(55),
        height: scale(55),
        borderRadius: scale(27),
        backgroundColor: '#99CC00',
        marginRight: scale(15)
    }
})