import React, { Component } from 'react';
import { StatusBar, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//Componentes
import Menu from '../Component/Menu';
import PlayerControl from '../Component/PlayerControl';

// Screen
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Pedido from "./Screens/Pedido";
import Recardo from "./Screens/Recardo";
import Sobre from "./Screens/Sobre";
import Programacao from "./Screens/Programacao";
import UltimasTocadas from "./Screens/UltimasTocadas";



class Rotas extends Component {
    MenuIcon = () => {
        return (
            <Icon name='navicon'size={30} color='#fff' />
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
                <StatusBar barStyle="light-content" backgroundColor="#1B8EF2" />
                <Router>
                    <Stack key="root"
                    navigationBarStyle={[styles.navBar,{backgroundColor: `${this.props.headerColor[0]}`}]}
                    tintColor='#ffffff'
                    titleStyle={styles.navBarTitle}
                    headerLayoutPreset="center"
                    >
                        <Scene
                        key='drawer'
                        drawer
                        drawerPosition="right"
                        contentComponent={Menu}
                        drawerWidth={300}
                        rightTitle={this.MenuIcon}
                        onRight={()=>{Actions.drawerOpen()}}
                        renderLeftButton={this.LogoIcon}
                        renderTitle={PlayerControl}
                        hideNavBar
                        >
                            <Scene 
                                key="home" 
                                title='Home Page' 
                                component={Home}
                            />
                            <Scene 
                                key="login" 
                                title='Login' 
                                component={Login}
                            />
                            <Scene 
                                key="pedido" 
                                title='Pedido' 
                                component={Pedido}
                            />
                            <Scene 
                                key="recardo" 
                                title='Recardo' 
                                component={Recardo}
                            />
                            <Scene 
                                key="sobre" 
                                title='Sobre' 
                                component={Sobre}
                            />
                            <Scene 
                                key="programacao" 
                                title='Programação' 
                                component={Programacao}
                            />
                            <Scene 
                                key="ultimasTocadas" 
                                title='Ultimas Tocadas' 
                                component={UltimasTocadas}
                            />
                        </Scene>
                    </Stack>
                </Router>
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
        flex: 1
    },
    navBar: {
        paddingVertical: 20
    },
    navBarTitle:{
        color:'#FFFFFF'
    },
    contentePlayer: {
        display: 'flex',
        flexDirection: 'row',
        width: '70%',
        marginLeft: '30%'
    },
    btnPlayPause: {
        paddingVertical: 20
    },
    logo: {
        //position: 'absolute',
        marginLeft: 10,
        width: 90,
        height: 32
    }
});