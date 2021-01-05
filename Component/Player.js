import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Slider } from "@miblanchard/react-native-slider";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { scale } from '../assets/scaling';
import ListMusic from "./ListMusic";
import api from '../services/api';

//import TrackPlayer from 'react-native-track-player';

import { playPause, controlVolume, playList, getSongs, getTean } from "../Actions/HomePageAction";

//import ControlVolume from './ColtrolVolume';

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            volume: this.props.volume,
        }
    }
    componentDidMount(){
        this.getList()
    }
    getList = () => api.get("getStreamData")
    .then((response) => {
        console.log("getStreamData: ", response.data.shoutcast)
        if(this.props.songs !== response.data.shoutcast.songs){
            this.props.getSongs(response.data.shoutcast.songs);
        }
        if(this.props.team !== response.data.shoutcast.team){
            this.props.getTean(response.data.shoutcast.team);
        }
        setTimeout(() => this.getList(), 10000);
    })
    .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
    });
    render(){
        return(
            <View style={styles.session}>
                <Video source={{uri: this.props.playlist}}
                    ref={(ref) => {
                        this.player = ref
                    }} 
                    audioOnly={true} 
                    automaticallyWaitsToMinimizeStalling={true}
                    //controls={false}
                    paused={this.props.statusPlay}
                    playInBackground={true}
                    playWhenInactive={true}
                    volume={parseFloat(this.props.volume)}
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo}
                />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View>
                        <TouchableOpacity 
                            style={styles.btnPlayPause}
                            onPress={() => this.props.playPause(!this.props.statusPlay)}
                        >
                            {
                                this.props.statusPlay ?
                                <Icon name='play'size={scale(27)} color='#fff' />
                                :
                                <Icon name='pause' size={scale(27)} color='#fff' />
                            }
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: scale(20),
                            lineHeight: scale(27),
                            fontWeight: 'bold'
                        }}>Agora na Blast!</Text>
                        <Text style={{
                            fontSize: scale(14),
                            lineHeight: scale(19)
                        }}>{this.props.team.team} com o programa {this.props.team.program} </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Slider
                        value={this.props.volume}
                        thumbTintColor='#99CC00'
                        maximumTrackTintColor='#CCCCCC'
                        minimumTrackTintColor='#707070'
                        thumbTouchSize={{
                            width: scale(15), 
                            height: scale(15)
                        }}
                        onValueChange={value => this.props.controlVolume(value)}
                    />
                    <TouchableOpacity
                        onPress={() => this.props.playList(!this.props.statusPlayList)}
                    >
                        <Text style={{
                            fontSize: scale(14),
                            lineHeight: scale(19)
                        }}>
                            {this.props.statusPlayList ? 'Fechar' : 'Ultimas tocadas'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Animatable.View 
                    style={[
                        styles.contentMusicList,
                        !this.props.statusPlayList &&
                        { 
                            height: 0,
                            paddingTop: 0,
                        }
                    ]}
                    transition={['height', "opacity"]}
                    easing="ease-in-out"
                    duration={250}
                >
                    <ListMusic />
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    playlist:           state.HomePageReducer.playlist,
    statusPlay:         state.HomePageReducer.statusPlay,
    volume:             state.HomePageReducer.volume,
    statusPlayList:     state.HomePageReducer.statusPlayList,
    songs:              state.HomePageReducer.songs,
    team:               state.HomePageReducer.team,
});

export default connect(mapStateToProps, { playPause, controlVolume, playList, getSongs, getTean })(Player);

const styles = StyleSheet.create({
    session: {
        backgroundColor:'#fff',
        minHeight: scale(147),
        borderRadius: scale(20),
        padding: scale(20)
    },
    contentMusicList: {
        paddingTop: scale(20),
        overflow: 'hidden',
        height: scale(290)
    },
    btnPlayPause: {
        width: scale(55),
        height: scale(55),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(27),
        backgroundColor: '#99CC00',
        marginRight: scale(15)
    }
});