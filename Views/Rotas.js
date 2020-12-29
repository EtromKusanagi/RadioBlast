import React, { Component } from 'react';
import { StatusBar, View, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//Componentes
// import Menu from '../Component/Menu';
// import PlayerControl from '../Component/PlayerControl';

// Screen
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Pedido from "./Screens/Pedido";
import Recardo from "./Screens/Recardo";
import Sobre from "./Screens/Sobre";
import Programacao from "./Screens/Programacao";
import UltimasTocadas from "./Screens/UltimasTocadas";

import FooterMenu from '../Component/FooterMenu';

import { scale } from '../assets/scaling';
import image from '../assets/images/fundo.png';

class Rotas extends Component {
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
        return(
            <View style={styles.content}>
                <StatusBar barStyle="light-content" backgroundColor={this.props.headerColor[0]} />
                <Image source={image} style={styles.image}/>
                <Router sceneStyle={styles.backGroundScreen}>
                    <Stack key="root"
                        navigationBarStyle={styles.navBar}
                        tintColor='#ffffff'
                        titleStyle={styles.navBarTitle}
                        headerLayoutPreset="center"
                    >
                        <Scene 
                            key="home" 
                            title='Home Page' 
                            component={Home}
                            hideNavBar
                        />
                        <Scene 
                            key="login" 
                            title='Login' 
                            component={Login}
                            hideNavBar
                        />
                        <Scene 
                            key="pedido" 
                            title='Pedido' 
                            component={Pedido}
                            hideNavBar
                        />
                        <Scene 
                            key="recardo" 
                            title='Recardo' 
                            component={Recardo}
                            hideNavBar
                        />
                        <Scene 
                            key="sobre" 
                            title='Sobre' 
                            component={Sobre}
                            hideNavBar
                        />
                        <Scene 
                            key="programacao" 
                            title='Programação' 
                            component={Programacao}
                            hideNavBar
                        />
                        <Scene 
                            key="ultimasTocadas" 
                            title='Ultimas Tocadas' 
                            component={UltimasTocadas}
                            hideNavBar
                        />
                    </Stack>
                </Router>
                <FooterMenu />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    headerColor:        state.HomePageReducer.headerColor
});

export default connect(mapStateToProps, {})(Rotas);

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#000'
    },
    image: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        width: scale(350)
    },
    backGroundScreen: {
        backgroundColor: 'rgba(0, 0, 0, 0.0)'
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