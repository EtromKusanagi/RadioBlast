import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import { playPause } from "../Actions/HomePageAction";

import ControlVolume from './ColtrolVolume';

class PlayerControl extends Component {
    render(){
        if(this.props.statusPlay) {
            // Starts playing it
            TrackPlayer.play();
            return (
                <View style={styles.contentePlayer}>
                    <TouchableOpacity
                        style={styles.btnPlayPause}
                        onPress={() => this.props.playPause(!this.props.statusPlay)}
                    >
                        <Icon name='pause-circle' size={50} color='#fff' />
                    </TouchableOpacity>
                    <ControlVolume/>
                </View>
            )
        } else {
            TrackPlayer.pause();
            return (
                <View style={styles.contentePlayer}>
                    <TouchableOpacity
                        style={styles.btnPlayPause}
                        onPress={() => this.props.playPause(!this.props.statusPlay)}
                    >
                        <Icon name='play-circle' size={50} color='#fff' />
                    </TouchableOpacity>
                    <ControlVolume/>
                </View>
            )
        }
    }
}

const mapStateToProps = state => ({
    statusPlay:         state.HomePageReducer.statusPlay
});

export default connect(mapStateToProps, { playPause })(PlayerControl);

const styles = StyleSheet.create({
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