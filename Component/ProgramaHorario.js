import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { setItemNotificationList } from "../Actions/ProgramacaoPageAction";
import { scale } from '../assets/scaling';
class ProgramacaoHorario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.notification[this.props.prog.hashProgram]
        } 
        this.toggleSwitch = this.toggleSwitch.bind(this);
    }
    toggleSwitch = async (value) => {
        let newState = this.props.notification;
        //console.log(value)
        newState[value] = !newState[value];
        this.props.setItemNotificationList(value, newState[value]);
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
                        fontWeight: "700",
                        marginBottom: scale(10)
                    }}>{this.props.prog.time}</Text>
                    <Text style={{
                        fontSize: scale(14),
                        fontWeight: "700",
                        marginBottom: scale(5)
                    }}>Notificação</Text>
                    {
                        this.props.notification &&
                        this.props.prog.hashProgram &&
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                fontSize: scale(12),
                                fontWeight: "500",
                                lineHeight: scale(25)
                            }}>Não</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#99CC00" }}
                                thumbColor={this.props.notification[this.props.prog.hashProgram] ? "#BBEE00" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.toggleSwitch(this.props.prog.hashProgram)}
                                value={this.props.notification[this.props.prog.hashProgram]}
                            />
                            <Text style={{
                                fontSize: scale(12),
                                fontWeight: "500",
                                lineHeight: scale(25)
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
                        fontWeight: "700"
                    }}>{this.props.prog.program}</Text>
                    <Text style={{
                        fontSize: scale(13),
                        fontWeight: "700"
                    }}>{this.props.prog.teamName}</Text>
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

const mapStateToProps = state => ({
    notification:               state.ProgramacaoPageReducer.notification,
});
export default connect(mapStateToProps, { setItemNotificationList })(ProgramacaoHorario);