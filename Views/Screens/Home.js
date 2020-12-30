import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
//import TrackPlayer from 'react-native-track-player';
import { displayPlayer, getSongs } from "../../Actions/HomePageAction";
import { scale } from '../../assets/scaling';
import Player from '../../Component/Player';

class Home extends Component {
    componentDidMount(){
        fetch('https://redeblast.com/api/getStreamData').then((response) => response.json()).then((json) => {
            console.log("RETURN: ",json.shoutcast);
            this.props.getSongs(json.shoutcast.songs)
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
                    <Player/>
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    statusDisplayPlay:         state.HomePageReducer.statusDisplayPlay,
    songs:                     state.HomePageReducer.songs,
});

export default connect(mapStateToProps, { displayPlayer, getSongs })(Home);

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