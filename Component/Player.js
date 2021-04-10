import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Slider } from "@miblanchard/react-native-slider";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import analytics from '@react-native-firebase/analytics';
import { connect } from 'react-redux';
import { scale, verticalScale } from '../assets/scaling';
import ListMusic from "./ListMusic";
import api from '../services/api';

import { playPause, controlVolume, playList, getSongs, setCurrentSong, setCurrentListeners, getTean } from "../Actions/HomePageAction";
import {setBackgroundImage, setBackgroundColor } from "../Actions/AppConfigAction";

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
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    getList = () => api.get("getStreamData")
    .then((response) => {
        if(response.data && response.data.shoutcast){
            this.props.setBackgroundImage(response.data.shoutcast.app.background);
            this.props.setBackgroundColor(response.data.shoutcast.app.color);
            if(this.props.songs !== response.data.shoutcast.songs){
                this.props.getSongs(response.data.shoutcast.songs);
            }
            if(this.props.currentSong !== response.data.shoutcast.stream){
                this.props.setCurrentSong(response.data.shoutcast.stream.currentSong);
            }
            if(this.props.currentListeners !== response.data.shoutcast.stream.currentListeners){
                console.log("currentListeners: ", this.props.currentListeners)
                this.props.setCurrentListeners(response.data.shoutcast.stream.currentListeners);
            }
            if(this.props.team !== response.data.shoutcast.team){
                this.props.getTean(response.data.shoutcast.team);
            }
            this.sleep(30000)
            .then(() => this.getList())
            //setTimeout(async() => awa this.getList(), 10000);
        }
    })
    .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
    });
    render(){
        return(
            <View style={styles.session}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View>
                        <TouchableOpacity 
                            style={styles.btnPlayPause}
                            onPress={() => {
                                analytics().logEvent('handlePressPlayPause');
                                this.props.playPause(!this.props.statusPlay)
                            }}
                        >
                            {
                                this.props.statusPlay ?
                                <Icon name='play'size={scale(27)} color='#fff' />
                                :
                                <Icon name='pause' size={scale(27)} color='#fff' />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{
                            fontSize: scale(20),
                            lineHeight: scale(27),
                            fontWeight: 'bold'
                        }}>Agora na Blast!</Text>
                        <Text style={{
                            fontSize: scale(14),
                            lineHeight: scale(19),
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
                        onValueChange={value => {
                            analytics().logEvent('handlePressVolumeControl');
                            this.props.controlVolume(value)
                        }}
                    />
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                analytics().logEvent('handlePressPlayList');
                                this.props.playList(!this.props.statusPlayList)
                            }}
                        >
                            <Text style={{
                                fontSize: scale(14),
                                lineHeight: scale(19)
                            }}>
                                {this.props.statusPlayList ? 'Fechar' : 'Últimas tocadas'}
                            </Text>
                        </TouchableOpacity>
                        {
                            this.props.team && this.props.team.teamHash &&
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                paddingHorizontal: scale(8),
                                paddingVertical: scale(4),
                                borderRadius: scale(5),
                                backgroundColor: this.props.team.teamHash !== "blast" ? "#f00" : "#fff",
                            }}>
                                {
                                    this.props.team.teamHash !== "blast" &&
                                <Text style={{
                                    fontSize: scale(14),
                                    lineHeight: scale(16),
                                    marginRight: scale(10),
                                    color:"#fff",
                                }}>ao vivo</Text>
                                }
                                <Icon name='user'size={scale(14)}  color={this.props.team.teamHash !== "blast" ? "#fff" : "#000"} solid/>
                                <Text style={{
                                    fontSize: scale(14),
                                    lineHeight: scale(16),
                                    marginLeft: scale(10),
                                    color: this.props.team.teamHash !== "blast" ? "#fff" : "#000",
                                }}>{this.props.currentListeners}</Text>
                            </View>
                        }
                    </View>
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
                    transition={['height', 'paddingTop', "opacity"]}
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
    statusPlay:         state.HomePageReducer.statusPlay,
    statusPlayList:     state.HomePageReducer.statusPlayList,
    volume:             state.HomePageReducer.volume,
    songs:              state.HomePageReducer.songs,
    currentSong:        state.HomePageReducer.currentSong,
    currentListeners:   state.HomePageReducer.currentListeners,
    team:               state.HomePageReducer.team,
    backgroundImage:    state.AppConfigReducer.backgroundImage
});

export default connect(
    mapStateToProps, { 
        playPause, 
        controlVolume, 
        playList, 
        getSongs,
        setCurrentSong, 
        setCurrentListeners, 
        getTean, 
        setBackgroundImage,
        setBackgroundColor
    }
)(Player);

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
        height: verticalScale(410),
        flex:1
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