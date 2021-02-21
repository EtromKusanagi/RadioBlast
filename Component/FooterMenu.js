import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setActivePage } from "../Actions/HomePageAction";
import { scale } from '../assets/scaling';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../assets/fonts/selection.json';
const Blast = createIconSetFromIcoMoon(
    icoMoonConfig,
    'redeblast',
    'icomoon.ttf'
);


class FooterMenu extends Component {
    render(){
        return(
            <View style={styles.footerMenu}>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => this.props.setActivePage("home")}>
                    {/* <Text>EVENTOS</Text> */}
                    <Icon name='home'size={scale(20)} color={this.props.activePage === "home" ? "#000" : "#ccc"} />
                    <Text style={{
                        fontSize: scale(10),
                        color: this.props.activePage === "home" ? "#000" : "#ccc"
                    }}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionItem,{
                        borderLeftWidth: 2,
                        borderLeftColor: '#707070',
                    }]}
                    onPress={() => this.props.setActivePage("programacao")}>
                    {/* <Text>EVENTOS</Text> */}
                    <Icon name='clock'size={scale(20)}  color={this.props.activePage === "programacao" ? "#000" : "#ccc"} />
                    <Text style={{
                        fontSize: scale(10),
                        color: this.props.activePage === "programacao" ? "#000" : "#ccc"
                    }}>Programação</Text>
                </TouchableOpacity>
                {
                this.props.team.team && this.props.team.team !== "Playlist" && 
                <TouchableOpacity
                    style={[styles.optionItem,{
                        borderLeftWidth: 2,
                        borderRightWidth: 2,
                        borderLeftColor: '#707070',
                        borderRightColor: '#707070'
                    }]}
                    onPress={() => this.props.setActivePage("recardo")}>
                    {/* <Text>EQUIPE</Text> */}
                    <Icon name='comment-alt'size={scale(20)}  color={this.props.activePage === "recardo" ? "#000" : "#ccc"} />
                    <Text style={{
                        fontSize: scale(10),
                        color: this.props.activePage === "recardo" ? "#000" : "#ccc"
                    }}>Recado</Text>
                </TouchableOpacity>
                }

                {
                this.props.team.team && this.props.team.team !== "Playlist" &&
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => this.props.setActivePage("pedido")}>
                    {/* <Text>EQUIPE</Text> */}
                    <Icon name='music'size={scale(20)}  color={this.props.activePage === "pedido" ? "#000" : "#ccc"} />
                    <Text style={{
                        fontSize: scale(10),
                        color: this.props.activePage === "pedido" ? "#000" : "#ccc"
                    }}>Música</Text>
                </TouchableOpacity>
                }
            </View>
        )
    }
}
const mapStateToProps = state => ({
    team:                       state.HomePageReducer.team,
    activePage:                 state.HomePageReducer.activePage,
});
export default connect(mapStateToProps, { setActivePage })(FooterMenu);
const styles = StyleSheet.create({
    footerMenu: {
        height: scale(50),
        padding: scale(10),
        marginHorizontal: scale(20),
        marginVertical: scale(5),
        borderRadius: scale(10),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionItem: {
        flex: 1,
        alignItems: 'center'
    }
})