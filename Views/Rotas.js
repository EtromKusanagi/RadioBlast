import React, { Component } from 'react';
import { StatusBar, View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
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
    constructor(props){
        super(props);
        this.state = {
            active: "home"
        }
    }
    componentDidMount(){
        this.transitionPage()
    }
    transitionPage = (active) => {
        if(active !== undefined){
            console.log("ACTIVE: ", this.state.active)
            this.setState({active})
        }
    }
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
                <View style={styles.logoContent}>
                    <TouchableOpacity onPress={() => this.props.displayPlayer(true)}>
                        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Animatable.View style={{width: scale(350), position: "absolute", left: this.state.active === "home" ? 0 : -scale(350)}}
                        duration={500}
                        transition={['left']}
                        easing="ease-in-out"
                    >
                        <Home/>
                    </Animatable.View>
                    <Animatable.View style={{width: scale(350), position: "relative", left: this.state.active === "programacao" ? 0 : -scale(350)}}
                        duration={500}
                        transition={['left']}
                        easing="ease-in-out"
                    >
                        <Programacao/>
                    </Animatable.View>
                    <Animatable.View style={{width: scale(350), position: "absolute", left: this.state.active === "pedido" ? 0 : -scale(350)}}
                        duration={500}
                        transition={['left']}
                        easing="ease-in-out"
                    >
                        <Pedido/>
                    </Animatable.View>
                    <Animatable.View style={{width: scale(350), position: "absolute", left: this.state.active === "recardo" ? 0 : -scale(350)}}
                        duration={500}
                        transition={['left']}
                        easing="ease-in-out"
                    >
                        <Recardo/>
                    </Animatable.View>
                </View>
                {/* <Router sceneStyle={styles.backGroundScreen}>
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
                            key="programacao" 
                            title='Programação' 
                            component={Programacao}
                            hideNavBar
                        />
                    </Stack>
                </Router> */}
                <FooterMenu transitionPage={this.transitionPage} />
                <Audio />
            </View>
        )
    }
}
const mapStateToProps = state => ({
    headerColor:        state.HomePageReducer.headerColor,
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