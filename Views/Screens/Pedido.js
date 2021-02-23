import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../../assets/scaling';
import api from '../../services/api';

export default class Pedido extends Component {
    constructor(props){
        super(props);
        this.state = {
            artist: null,
            music: null,
            name: null,
            message: null,
            loading: false,
            error: false,
            sucess: true
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
            })},5000)
        }
    }
    onSubmit = async () => {
        this.setState({loading: true});
        if(
            (this.state.artist === "" || this.state.artist === null) ||
            (this.state.music === "" || this.state.music === null) ||
            (this.state.name === "" || this.state.name === null) ||
            (this.state.message === "" || this.state.message === null)
        ){
            this.setState({
                loading: false,
                error: true, 
                sucess: false
            })
        } else {
            let res = await api({
                method: 'post',
                url:"sendRequestMusical", 
                data: `artist=${this.state.artist}&music=${this.state.music}&name=${this.state.name}&message=${this.state.message}`
            });
            //console.log("sendRequestMusical: ", res.data)
            if(res.data.sended === true){
                this.setState({
                    artist: null,
                    music: null,
                    name: null,
                    message: null,
                    loading: false,
                    error: false,
                    sucess: true
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
                    this.state.sucess &&
                        <Animatable.View 
                            style={styles.alertSucess}
                            animation ={this.state.sucess ? 'fadeInUp' : 'fadeOutDown'}
                            easing="ease-in-out"
                        >
                            <Text style={styles.textAlert}>Pedido de música enviado com sucesso</Text>
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
                    }
                    <TextInput
                        style={styles.input}
                        value={this.state.artist}
                        placeholder="nome do artista/banda"
                        onChangeText={text => this.setState({artist: text})}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.music}
                        placeholder="nome da música"
                        onChangeText={text => this.setState({music: text})}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.name}
                        placeholder="seu nome/nick"
                        onChangeText={text => this.setState({name: text})}
                    />
                    <TextInput
                        style={[styles.input, { minHeight: scale(120),textAlignVertical: "top"}]}
                        value={this.state.message}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="sua mensagem"
                        onChangeText={text => this.setState({message: text})}
                    />
                    <TouchableOpacity style={[styles.btnSubmit,this.state.loading ? styles.btnSubmitInative: styles.btnSubmitActive]} onPress={this.onSubmit} disabled={this.state.loading}>
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
                        }}>Fazer o pedido!</Text>
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
        minHeight: scale(40),
        borderRadius: scale(10),
        marginBottom: scale(10),
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