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
            //console.log("getSchedule: ", response.data)
            this.props.getProgramacaoList(response.data.days);
            AsyncStorage.getItem('notification', (err, result) => {
                let notification = JSON.parse(result);
                //console.log("NOTIFICATION: ", notification);
                if(response.data.programsInTheWeek){
                    let inscription = this.convertArrayToObject(response.data.programsInTheWeek)
                    if(notification === null){
                        this.props.setNotificationList(inscription)
                        AsyncStorage.setItem("notification",JSON.stringify(inscription))
                    } else {
                        let prevNotification = Object.keys(notification)
                        let prevInscription = Object.keys(inscription);
                        //console.log("prevNotification: ", prevNotification ,"prevInscription: ", prevInscription)
                        if (prevNotification.sort().join('|') !== prevInscription.sort().join('|')) {
                            this.props.setNotificationList(notification);
                        }
                    }
                }
            });
        })
        .catch((err) => {
            //console.error("ops! ocorreu um erro" + err);
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
    contentProgramacao: {
        flex:1,
        overflow:'hidden',
        paddingTop: scale(20),
    },
})