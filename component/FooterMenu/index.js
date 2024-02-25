import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { connect } from 'react-redux';
import { setActivePage } from "../../redux/actions/HomePageAction";
import { scale } from '../../assets/scaling';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/fonts/selection.json';
const Blast = createIconSetFromIcoMoon(
    icoMoonConfig,
    'redeblast',
    'icomoon.ttf'
);


const FooterMenu = (props) => {
    return(
        <View style={styles.footerMenu}>
            <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                    analytics().logEvent('changeRoute', {screen: 'Home'});
                    analytics().logScreenView({
                        screen_name: "home",
                        screen_class: "home",
                    });
                    props.setActivePage("home")
                }}>
                {/* <Text>EVENTOS</Text> */}
                <Icon name='home'size={scale(20)} color={props.activePage === "home" ? "#000" : "#ccc"} />
                <Text style={{
                    fontSize: scale(9),
                    color: props.activePage === "home" ? "#000" : "#ccc"
                }}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.optionItem,{
                    borderLeftWidth: 2,
                    borderLeftColor: '#707070',
                }]}
                onPress={() => {
                    analytics().logEvent('changeRoute', {screen: 'Programação'});
                    analytics().logScreenView({
                        screen_name: "programacao",
                        screen_class: "programacao",
                    });
                    props.setActivePage("programacao")
                }}>
                {/* <Text>EVENTOS</Text> */}
                <Icon name='clock'size={scale(20)}  color={props.activePage === "programacao" ? "#000" : "#ccc"} />
                <Text style={{
                    fontSize: scale(9),
                    color: props.activePage === "programacao" ? "#000" : "#ccc"
                }}>Programação</Text>
            </TouchableOpacity>
            {
            props.team.teamHash && props.team.teamHash !== "blast" && 
            <TouchableOpacity
                style={[styles.optionItem,{
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderLeftColor: '#707070',
                    borderRightColor: '#707070'
                }]}
                onPress={() => {
                    analytics().logEvent('changeRoute', {screen: 'Recardo'});
                    analytics().logScreenView({
                        screen_name: "recardo",
                        screen_class: "recardo",
                    });
                    props.setActivePage("recardo")
                }}>
                {/* <Text>EQUIPE</Text> */}
                <Icon name='comment-alt'size={scale(20)}  color={props.activePage === "recardo" ? "#000" : "#ccc"} />
                <Text style={{
                    fontSize: scale(9),
                    color: props.activePage === "recardo" ? "#000" : "#ccc"
                }}>Recado</Text>
            </TouchableOpacity>
            }

            {
            props.team.teamHash && props.team.teamHash !== "blast" &&
            <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                    analytics().logEvent('changeRoute', {screen: 'Pedido'});
                    analytics().logScreenView({
                        screen_name: "pedido",
                        screen_class: "pedido",
                    });
                    props.setActivePage("pedido")
                }}>
                {/* <Text>EQUIPE</Text> */}
                <Icon name='music'size={scale(20)}  color={props.activePage === "pedido" ? "#000" : "#ccc"} />
                <Text style={{
                    fontSize: scale(9),
                    color: props.activePage === "pedido" ? "#000" : "#ccc"
                }}>Música</Text>
            </TouchableOpacity>
            }
            {/* <TouchableOpacity
                style={[styles.optionItem,{
                    borderLeftWidth: 2,
                    borderLeftColor: '#707070',
                }]}
                onPress={() => {
                    // analytics().logEvent('changeRoute', {screen: 'Seção'});
                    // analytics().logScreenView({
                    //     screen_name: "section",
                    //     screen_class: "section",
                    // });
                    props.setActivePage("section")
                }}>
                <Icon name='newspaper'size={scale(20)}  color={props.activePage === "section" ? "#000" : "#ccc"} />
                <Text style={{
                    fontSize: scale(9),
                    color: props.activePage === "section" ? "#000" : "#ccc"
                }}>Seções</Text>
            </TouchableOpacity> */}
        </View>
    );
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