import React, { Component } from 'react';
import { StatusBar, View, Image, StyleSheet, BackHandler, ToastAndroid  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import * as Animatable from 'react-native-animatable';
//Componentes
// import Menu from '../Component/Menu';
// import PlayerControl from '../Component/PlayerControl';

// Screen
import Home from "./Screens/Home";
import Pedido from "./Screens/Pedido";
import Recardo from "./Screens/Recardo";
import Programacao from "./Screens/Programacao";

import FooterMenu from '../Component/FooterMenu';
import Audio from '../Component/Audio';

import { scale } from '../assets/scaling';
import image from '../assets/images/fundo.png';

class Rotas extends Component {
    state = {
        validCloseWindow: false
    }
    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }
    handleBackButton = () => {
        console.log(this.state.validCloseWindow)
        if (this.state.validCloseWindow){
            return false;
        } else {
            this.setState({validCloseWindow: true});
            setTimeout(() => {
                this.setState({validCloseWindow: false});
            }, 3000);
            ToastAndroid.show("Toque novamente em Voltar para sair!", ToastAndroid.SHORT);
            return true;
        }
    };
    MenuIcon = () => {
        return (
            <Icon name='navicon'size={scale(30)} color='#fff' />
        )
    }
    LogoIcon = () => {
        return (
            <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        )
    }
    render(){
        console.log("TEAM: ", this.props.team)
        return(
            <View style={styles.content}>
                <StatusBar barStyle="light-content" backgroundColor={this.props.headerColor[0]} />
                <Image source={image} style={styles.image}/>
                <View style={styles.logoContent}>
                    <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Animatable.View style={{
                            width: scale(350), 
                            position: "absolute", 
                            left: this.props.activePage === "home" ? 0 : scale(350),
                            opacity: this.props.activePage === "home" ? 1 : 0
                        }}
                        duration={500}
                        transition={['left','opacity']}
                        easing="ease-in-out"
                    >
                        <Home/>
                    </Animatable.View>
                    <Animatable.View style={{
                           width: scale(350), 
                           position: "relative", 
                           left: this.props.activePage === "programacao" ? 0 : scale(350),
                           opacity: this.props.activePage === "programacao" ? 1 : 0
                        }}
                        duration={500}
                        transition={['left','opacity']}
                        easing="ease-in-out"
                    >
                        <Programacao/>
                    </Animatable.View>
                    <Animatable.View style={{
                            width: scale(350), 
                            position: "absolute", 
                            left: this.props.activePage === "pedido" ? 0 : scale(350),
                            opacity: this.props.activePage === "pedido" ? 1 : 0
                        }}
                        duration={500}
                        transition={['left','opacity']}
                        easing="ease-in-out"
                    >
                        <Pedido/>
                    </Animatable.View>
                    <Animatable.View style={{
                            width: scale(350), 
                            position: "absolute", 
                            left: this.props.activePage === "recardo" ? 0 : scale(350),
                            opacity: this.props.activePage === "recardo" ? 1 : 0
                        }}
                        duration={500}
                        transition={['left','opacity']}
                        easing="ease-in-out"
                    >
                        <Recardo/>
                    </Animatable.View>
                </View>
                <FooterMenu transitionPage={this.transitionPage} />
                <Audio />
            </View>
        )
    }
}
const mapStateToProps = state => ({
    headerColor:        state.HomePageReducer.headerColor,
    activePage:         state.HomePageReducer.activePage,
    songs:              state.HomePageReducer.songs,
    team:               state.HomePageReducer.team
});

export default connect(mapStateToProps, {})(Rotas);

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#000'
    },
    image: {
        position: "absolute",
        bottom: 0,
        width: scale(350),
        zIndex: 0
    },
    logoContent: {
        height: scale(111),
        paddingBottom: scale(25),
        paddingLeft: scale(10),
        backgroundColor: '#99CC00',
        justifyContent: 'flex-end'
    },
    backGroundScreen: {
        backgroundColor: 'transparent'
    },
    navBar: {
        paddingTop: scale(60),
        paddingBottom: scale(30),
        backgroundColor: '#99CC00',
    },
    navBarTitle:{
        color:'#FFFFFF'
    },
    btnPlayPause: {
        paddingVertical: scale(20)
    },
    logo: {
        //position: 'absolute',
        marginLeft: scale(10),
        width: scale(130),
        height: scale(50)
    }
});