import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../../assets/scaling';
import api from '../../services/api';

export default class Recardo extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            message: null,
            error: false
        }
    }
    componentDidUpdate(prevProps,prevState){
        let that = this;
        console.log("prevState: ", prevState, "State: ", this.state)
        if(prevState.error !== this.state.error && this.state.error === true){
            setTimeout(function(){that.setState({error: false})},10000)
        }
    }
    onSubmit = async () => {
        if(
            (this.state.name === "" || this.state.name === null) ||
            (this.state.message === "" || this.state.message === null)
        ){
            this.setState({error: true})
        } else {
            let res = await api({
                method: 'post',
                url:"sendRequestMessage", 
                data: `name=${this.state.name}&message=${this.state.message}`
            });
            console.log("sendRequestMessage: ", res)
            if(res.data.sended === true){
                this.setState({
                    name: null,
                    message: null,
                    error: false
                });
            }
        }
    }
    render(){
        return(
            <View style={styles.content}>
                <View style={{
                    paddingVertical: scale(20),
                    marginHorizontal: scale(20),
                    borderRadius: scale(10)
                }}>
                    {
                    this.state.error &&
                        <Animatable.View 
                            style={styles.alertError}
                            animation ={this.state.error ? 'fadeInUp' : 'fadeOutDown'}
                            easing="ease-in-out"
                        >
                            <Text style={styles.textError}>Opa, falta preencher algo!</Text>
                        </Animatable.View>
                    }
                    <TextInput
                        style={styles.input}
                        placeholder="seu nome/nick"
                        value={this.state.name}
                        onChangeText={text => this.setState({name:text})}
                    />
                    <TextInput
                        style={[styles.input, { minHeight: scale(120),textAlignVertical: "top"}]}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="sua mensagem"
                        value={this.state.message}
                        onChangeText={text => this.setState({message:text})}
                    />
                    <TouchableOpacity style={styles.btnSubmit} onPress={this.onSubmit}>
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
    input: {
        backgroundColor: "#fff",
        paddingHorizontal: scale(20),
        height: scale(40),
        borderRadius: scale(10),
        marginBottom: scale(10)
    },
    alertError: {
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
        borderRadius: scale(10),
        marginBottom: scale(10),
        backgroundColor: "#f00"
    },
    textError: { 
        color: "#fff",
        fontWeight: "bold"
    },
    btnSubmit: {
        backgroundColor: "#99CC00",
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
        borderRadius: scale(10),
        flexDirection: "row"
    }
})