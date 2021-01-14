import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { scale } from '../assets/scaling';
export default class ProgramacaoHorario extends Component {
    render(){
        return (
            <View style={{
                flexDirection: "row",
                marginBottom: scale(10)
            }}>
                <View style={{
                    paddingHorizontal: scale(20),
                }}>
                    <Text style={{
                        fontSize: scale(20),
                        fontWeight: "700"
                    }}>{this.props.prog.time}</Text>
                </View>
                <View style={{
                    paddingRight: scale(20),
                    flex:1
                }}>
                    <Text style={{
                        fontSize: scale(16),
                        fontWeight: "700"
                    }}>{this.props.prog.program}</Text>
                    <Text style={{
                        fontSize: scale(12),
                    }}>{this.props.prog.style}</Text>
                    <Text style={{
                        fontSize: scale(12),
                        color: "#666",
                        display: "flex"
                    }}>{this.props.prog.description}</Text>
                </View>
            </View>
        )
    }
}