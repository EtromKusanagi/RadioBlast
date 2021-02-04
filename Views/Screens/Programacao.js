import React, { Component } from 'react';
import { View, AsyncStorage, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { displayPlayer } from "../../Actions/HomePageAction";
import { getProgramacaoList, setNotificationList } from "../../Actions/ProgramacaoPageAction";
import { scale } from '../../assets/scaling';
import api from '../../services/api';
import ProgramacaoDia from '../../Component/ProgramaDia';

class Programacao extends Component {
    componentDidMount(){
        //let inscription = [];
        api.get("getSchedule")
        .then((response) => {
            console.log("getSchedule: ", response.data)
            this.props.getProgramacaoList(response.data.days);
            AsyncStorage.getItem('notification', (err, result) => {
                let notification = JSON.parse(result);
                console.log("NOTIFICATION: ", notification);
                if(response.data.programsInTheWeek){
                    let inscription = this.convertArrayToObject(response.data.programsInTheWeek)
                    if(notification === null){
                        alert("Sem Notificações")
                        this.props.setNotificationList(inscription)
                        AsyncStorage.setItem("notification",JSON.stringify(inscription))
                    } else {
                        this.props.setNotificationList(notification);
                    }
                }
            });
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }
    convertArrayToObject = (array, key) => array.reduce(
        (obj, item) => ({
            ...obj,
            [item]: false
        }),
        {}
    );
    render(){
        return(
            <View style={styles.content}>
                <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.contentProgramacao}>
                        { this.props.programacao.map((days, index) => <ProgramacaoDia key={`dia-${index}`} days={days} /> ) }
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    statusDisplayPlay:          state.HomePageReducer.statusDisplayPlay,
    programacao:                state.ProgramacaoPageReducer.programacao,
    notification:               state.ProgramacaoPageReducer.notification,
});
export default connect(mapStateToProps, { displayPlayer, getProgramacaoList, setNotificationList })(Programacao);
const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
    },
    logoContent: {
        height: scale(111),
        paddingBottom: scale(40),
        paddingLeft: scale(10),
        backgroundColor: '#99CC00',
        justifyContent: 'flex-end'
    },
    logo: {
        marginLeft: scale(10),
        width: scale(130),
        height: scale(50)
    },
    contentProgramacao: {
        flex:1,
        overflow:'hidden',
        paddingTop: scale(20),
    },
    programacaoSemana: {
        backgroundColor:"#fff",
        paddingVertical: scale(10),
        marginHorizontal: scale(20),
        borderRadius: scale(20),
        marginBottom: scale(10)
    },
    iconTime: {
        fontSize: scale(20),
        color: '#000',
        marginLeft: scale(20),
        marginVertical: scale(15),
        lineHeight: scale(22),
    },
    semanaTitle: {
        fontSize: scale(22),
        lineHeight: scale(22),
        marginLeft: scale(10),
        marginVertical: scale(15),
        fontWeight: "700"
    }
})