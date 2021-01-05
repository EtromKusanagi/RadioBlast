import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { displayPlayer } from "../../Actions/HomePageAction";
import { getProgramacaoList } from "../../Actions/ProgramacaoPageAction";
import { scale } from '../../assets/scaling';


class Programacao extends Component {
    async componentDidMount(){
        await fetch('https://redeblast.com/api/getSchedule')
        .then((response) => response.json())
        .then(async (json) => {
            console.log("RETURN: ",json);
            await this.props.getProgramacaoList(json.days)
        }).catch((error) => {
            console.error(error);
        });
    }
    render(){
        return(
            <View style={styles.content}>
                <View style={styles.logoContent}>
                    <TouchableOpacity onPress={() => this.props.displayPlayer(true)}>
                        <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.contentProgramacao}>
                        {
                            this.props.programacao.map((days,index) => {
                                return <View key={`programa-${index}`} style={styles.programacaoSemana}>
                                    <View style={{flexDirection: "row"}}>
                                        <Icon name='clock' style={styles.iconTime} />
                                        <Text style={styles.semanaTitle}>{days.name}</Text>
                                    </View>
                                    {
                                        days.schedule.map((prog, ind) =>
                                            <View key={`programa-${index}-${ind}`} style={{
                                                flexDirection: "row",
                                                marginBottom: scale(10)
                                            }}>
                                                <View style={{
                                                    paddingHorizontal: scale(20),
                                                }}>
                                                    <Text style={{
                                                        fontSize: scale(20),
                                                        fontWeight: "700"
                                                    }}>{prog.time}</Text>
                                                </View>
                                                <View style={{
                                                    paddingRight: scale(20),
                                                    flex:1
                                                }}>
                                                    <Text style={{
                                                        fontSize: scale(16),
                                                        fontWeight: "700"
                                                    }}>{prog.program}</Text>
                                                    <Text style={{
                                                        fontSize: scale(12),
                                                    }}>{prog.style}</Text>
                                                    <Text style={{
                                                        fontSize: scale(12),
                                                        color: "#666",
                                                        display: "flex"
                                                    }}>{prog.description}</Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
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