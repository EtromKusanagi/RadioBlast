import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Slider } from "@miblanchard/react-native-slider";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { scale } from '../assets/scaling';
import ListMusic from "./ListMusic";

//import TrackPlayer from 'react-native-track-player';

import { playPause, controlVolume, playList } from "../Actions/HomePageAction";

//import ControlVolume from './ColtrolVolume';

class Player extends Component {
    // constructor(){
    //     fetch('https://redeblast.com/api/getStreamData')
    //     .then((response) => {
    //         console.log(response.json());
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // }
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
                    <View>
                        <Text style={{
                            fontSize: scale(20),
                            lineHeight: scale(27),
                            fontWeight: 'bold'
                        }}>Agora na Blast!</Text>
                        <Text style={{
                            fontSize: scale(14),
                            lineHeight: scale(19)
                        }}>Playlist com o programa Playlist </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Slider
                        value={this.props.volume}
                        thumbTintColor='#99CC00'
                        maximumTrackTintColor='#CCCCCC'
                        minimumTrackTintColor='#707070'
                        thumbTouchSize={{width: scale(15), height: scale(15)}}
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
    volume:             state.HomePageReducer.volume,
    statusPlayList:     state.HomePageReducer.statusPlayList
});

export default connect(mapStateToProps, { playPause, controlVolume, playList })(Player);

const styles = StyleSheet.create({
    session: {
        backgroundColor:'#fff',
        minHeight: scale(147),
        borderRadius: scale(20),
        marginHorizontal: scale(20),
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