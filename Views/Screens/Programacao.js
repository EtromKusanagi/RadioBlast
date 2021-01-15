import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { displayPlayer } from "../../Actions/HomePageAction";
import { getProgramacaoList } from "../../Actions/ProgramacaoPageAction";
import { scale } from '../../assets/scaling';
import api from '../../services/api';
import ProgramacaoDia from '../../Component/ProgramaDia';


class Programacao extends Component {
    componentDidMount(){
        api.get("getSchedule")
        .then((response) => {
            console.log("getSchedule: ", response.data)
            this.props.getProgramacaoList(response.data.days)
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }
    render(){
        return(
            <View style={styles.content}>
                <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.contentProgramacao}>
                        {
                            this.props.programacao.map((days,index) => {
                                return <ProgramacaoDia key={`programa-${index}`} days={days} />
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    statusDisplayPlay:          state.HomePageReducer.statusDisplayPlay,
    programacao:                state.ProgramacaoPageReducer.programacao,
});
export default connect(mapStateToProps, { displayPlayer, getProgramacaoList })(Programacao);
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