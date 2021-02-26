import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Slider } from "@miblanchard/react-native-slider";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { scale } from '../assets/scaling';
import ListMusic from "./ListMusic";
import api from '../services/api';

import { playPause, controlVolume, playList, getSongs, getTean } from "../Actions/HomePageAction";
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
            //console.log("getStreamData: ", response.data.shoutcast)
            if(this.props.songs !== response.data.shoutcast.songs){
                this.props.getSongs(response.data.shoutcast.songs);
            }
            if(this.props.team !== response.data.shoutcast.team){
                this.props.getTean(response.data.shoutcast.team);
            }
            this.sleep(60000)
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
    statusPlay:         state.HomePageReducer.statusPlay,
    statusPlayList:     state.HomePageReducer.statusPlayList,
    volume:             state.HomePageReducer.volume,
    songs:              state.HomePageReducer.songs,
    team:               state.HomePageReducer.team,
});

export default connect(
    mapStateToProps, { 
        playPause, 
        controlVolume, 
        playList, 
        getSongs, 
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