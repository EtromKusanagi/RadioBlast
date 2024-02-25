import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import { playPause } from "../../redux/actions/HomePageAction";
import { setupPlayer, addTracks } from '../../services/service';

const Audio = (props) => {
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [program, setProgram] = useState(null);

    useEffect(() => {
        async function setup() {
          if(program !== props.team.program){
            let isSetup = await setupPlayer();

            const queue = await TrackPlayer.getQueue();
            if(isSetup && queue.length <= 0) {
                await addTracks(props);
            }
            setIsPlayerReady(isSetup);
          }
        }
        setup();
    }, []);
    useEffect(() => {
        if(props.paused){
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
        }
    },[props.paused]);
    useEffect(() => {
        TrackPlayer.setVolume(parseFloat(props.volume));
    },[props.volume]);
    const resetTracks = async () => {
      if(program !== props.team.program){
        await TrackPlayer.reset();
        await addTracks(props);
        if(props.paused){
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
        }
        setProgram(props.team.program);
      }
    }
    useEffect(() => {
        resetTracks()
    },[props.team.program]);
    return (<></>)
}

const mapStateToProps = state => ({
    playlist:           state.HomePageReducer.playlist,
    paused:             state.HomePageReducer.statusPlay,
    volume:             state.HomePageReducer.volume,
    team:               state.HomePageReducer.team,
    currentSong:        state.HomePageReducer.currentSong
});

export default connect(mapStateToProps, { playPause })(Audio);
