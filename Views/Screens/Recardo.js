import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../../assets/scaling';
import api from '../../services/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage, hideMessage } from "react-native-flash-message";

export default class Recardo extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            message: null,
            loading: false,
            error: false,
            sucess: false
        }
    }
    componentDidUpdate(prevProps,prevState){
        let that = this;
        if(prevState.error !== this.state.error && this.state.error === true || this.state.sucess === true){
            setTimeout(function(){
                that.setState({
                    loading: false,
                    error: false, 
                    sucess: false
                })
            },5000);
        }
    }
    alertFail = (mensage) => {
        showMessage({
            message: "Opa, falta preencher algo!",
            description: mensage,
            type: "danger",
        });
    }
    alertSucess = (mensage) => {
        showMessage({
            message: "Ok, está tudo certo!",
            description: mensage,
            type: "success",
        });
    }
    
    onSubmit = async () => {
        this.setState({loading: true});
        if(
            (this.state.name === "" || this.state.name === null)
        ){
            this.setState({ loading: false, error: true },
            this.alertFail("Você deve preencher o seu nome/nick"))
        } else if(
            (this.state.message === "" || this.state.message === null)
        ){
            this.setState({ loading: false, error: true },
            this.alertFail("Você deve preencher a sua mensagem"))
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
                    loading: false,
                    error: false,
                    sucess: true
                },
                this.alertSucess("O seu recardo foi enviado com sucesso!"));
            }
        }
    }
    render(){
        return(
            <View style={styles.content}>
                <KeyboardAwareScrollView
                    innerRef={ref => {
                        this.scrollRecardo = ref
                    }}
                >
                    <View style={{
                        paddingVertical: scale(20),
                        marginHorizontal: scale(20),
                        borderRadius: scale(10),
                    }}>
                        {/* {
                        this.state.sucess &&
                            <Animatable.View 
                                style={styles.alertSucess}
                                animation ={this.state.sucess ? 'fadeInUp' : 'fadeOutDown'}
                                easing="ease-in-out"
                            >
                                <Text style={styles.textAlert}>Recado enviado com sucesso!</Text>
                            </Animatable.View>
                        }
                        {
                        this.state.error &&
                            <Animatable.View 
                                style={styles.alertError}
                                animation ={this.state.error ? 'fadeInUp' : 'fadeOutDown'}
                                easing="ease-in-out"
                            >
                                <Text style={styles.textAlert}>Opa, falta preencher algo!</Text>
                            </Animatable.View>
                        } */}
                        <TextInput
                            style={styles.input}
                            placeholder="seu nome/nick"
                            value={this.state.name}
                            onChangeText={text => this.setState({name:text})}
                            returnKeyType="next"
                            onSubmitEditing={() => {this.MensagemInputRef.focus()}}
                        />
                        <TextInput
                            ref={input => {this.MensagemInputRef = input}}
                            style={[styles.input, { minHeight: scale(120),textAlignVertical: "top"}]}
                            multiline={true}
                            numberOfLines={10}
                            placeholder="sua mensagem"
                            value={this.state.message}
                            onChangeText={text => this.setState({message:text})}
                            returnKeyType="send"
                            onSubmitEditing={() => this.onSubmit()}
                        />
                        <TouchableOpacity style={[styles.btnSubmit, this.state.loading ? styles.btnSubmitInative: styles.btnSubmitActive]} onPress={this.onSubmit}  disabled={this.state.loading}>
                            {
                                this.state.loading ?
                                <ActivityIndicator color="#fff" /> : 
                                <Icon name="paper-plane" size={scale(20)} color='#fff'/>
                            }
                            <Text style={{
                                fontSize: scale(16),
                                fontWeight: "bold",
                                color: "#fff",
                                marginLeft: scale(10)
                            }}>Enviar recado!</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
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
        minHeight: scale(40),
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
    alertSucess: {
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
        borderRadius: scale(10),
        marginBottom: scale(10),
        backgroundColor: "#99CC00"
    },
    textAlert: { 
        color: "#fff",
        fontWeight: "bold"
    },
    btnSubmit: {
        paddingHorizontal: scale(20),
        paddingVertical: scale(15),
        borderRadius: scale(10),
        flexDirection: "row"
    },
    btnSubmitActive: {
        backgroundColor: "#99CC00"
    },
    btnSubmitInative: {
        backgroundColor: "#ccc"
    },
})