import React, { Component } from 'react';
import { View, Text, Switch, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { setItemNotificationList } from "../../redux/actions/ProgramacaoPageAction";
import { scale } from '../../assets/scaling';
const ProgramacaoHorario = (props) => {
    const toggleSwitch = async (value) => {
        let newState = props.notification;
        //console.log(value)
        newState[value] = !newState[value];
        props.setItemNotificationList(value, newState[value]);
        //console.log(newState)
        if(newState[value]){
            await AsyncStorage.getItem("TOKEN", (err, result) => {
                let token = result;
                messaging()
                .subscribeToTopic(value, result)
                .then(() => console.log('Subscribed to topic!'));
            });
        } else {
            await AsyncStorage.getItem("TOKEN", (err, result) => {
                let token = result;
                messaging()
                .unsubscribeFromTopic(value, token)
                .then(() => console.log('Unsubscribed to topic!'));
            });
            
        }
        AsyncStorage.setItem("notification",JSON.stringify(newState))
    }   
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
                    fontWeight: "700",
                    marginBottom: scale(10),
                    color: '#666'
                }}>{props.prog.time}</Text>
                <Text style={{
                    fontSize: scale(14),
                    fontWeight: "700",
                    marginBottom: scale(5),
                    color: '#666'
                }}>Notificação</Text>
                {
                    props.notification &&
                    props.prog.hashProgram &&
                    <View style={{
                        flexDirection: "row",
                    }}>
                        <Text style={{
                            fontSize: scale(12),
                            fontWeight: "500",
                            lineHeight: scale(25),
                            color: '#666'
                        }}>Não</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#99CC00" }}
                            thumbColor={props.notification[props.prog.hashProgram] ? "#BBEE00" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(props.prog.hashProgram)}
                            value={props.notification[props.prog.hashProgram]}
                            style={
                                Platform.OS === 'ios' ? 
                                {transform: [{ scaleX: .7 }, { scaleY: .7 }]}
                                :
                                {transform: [{ scaleX: 1 }, { scaleY: 1 }]}
                            }
                        />
                        <Text style={{
                            fontSize: scale(12),
                            fontWeight: "500",
                            lineHeight: scale(25),
                            color: '#666'
                        }}>Sim</Text>
                    </View>
                }
            </View>
            <View style={{
                paddingRight: scale(20),
                flex:1
            }}>
                <Text style={{
                    fontSize: scale(16),
                    fontWeight: "700",
                    color: '#666'
                }}>{props.prog.program}</Text>
                <Text style={{
                    fontSize: scale(13),
                    fontWeight: "700",
                    color: '#666'
                }}>{props.prog.teamName}</Text>
                <Text style={{
                    fontSize: scale(12),
                    color: '#666'
                }}>{props.prog.style}</Text>
                <Text style={{
                    fontSize: scale(12),
                    color: "#666",
                    display: "flex"
                }}>{props.prog.description}</Text>
            </View>
        </View>
    );
}

const mapStateToProps = state => ({
    notification:               state.ProgramacaoPageReducer.notification,
});
export default connect(mapStateToProps, { setItemNotificationList })(ProgramacaoHorario);