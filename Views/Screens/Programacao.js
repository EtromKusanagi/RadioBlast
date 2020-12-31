import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { displayPlayer } from "../../Actions/HomePageAction";
import { getProgramacaoList } from "../../Actions/ProgramacaoPageAction";
import { scale } from '../../assets/scaling';


class Programacao extends Component {
    componentDidMount(){
        fetch('https://redeblast.com/api/getSchedule')
        .then((response) => response.json())
        .then((json) => {
            console.log("RETURN: ",json);
            this.props.getProgramacaoList(json.days)
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
                <Animatable.View
                    style={styles.contentPlayer}
                    animation ={!this.props.statusDisplayPlay? 'fadeOutRight' : 'fadeInRight'}
                    easing="ease-in-out"
                    duration={500}
                >
                    {
                        this.props.programacao.map(days => {
                            return <View style={{
                                backgroundColor:"#fff",
                                paddingHorizontal: scale(20),
                                paddingVertical: scale(10),
                                marginBottom: 2
                            }}>
                                <Text>{days.name}</Text>
                            </View>
                        })
                    }
                </Animatable.View>
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
        height: scale(151),
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
    contentPlayer: {
        overflow:'hidden',
        marginTop: -scale(22),
        left: 0
    }
})