import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import MusicControl from 'react-native-music-control';
import { playPause } from "../Actions/HomePageAction";

class Audio extends Component {
    constructor(props) {
        super(props)
        this.updatePlayback = this.updatePlayback.bind(this);
    }
    componentDidMount(){
        //MusicControl.enableBackgroundMode(true);
        // MusicControl.handleAudioInterruptions(true);
        MusicControl.on('play', ()=> {
            this.props.playPause(!this.props.paused);
            if(this.props.paused){
                MusicControl.updatePlayback({state: MusicControl.STATE_PAUSED });
            } else {
                MusicControl.updatePlayback({state: MusicControl.STATE_PLAYING });
            }
        })
        MusicControl.on('pause', ()=> {
            this.props.playPause(!this.props.paused);
            if(this.props.paused){
                MusicControl.updatePlayback({state: MusicControl.STATE_PAUSED });
            } else {
                MusicControl.updatePlayback({state: MusicControl.STATE_PLAYING });
            }
        })
        this.setDuration.bind(this)
    }

    componentDidUpdate(nextProps){
        if(this.props.currentSong !== nextProps.currentSong){
            this.setNowPlaying();
        }
    }

    setDuration() {
        this.enableExternalControls();
        this.setNowPlaying();
    }
    setNowPlaying() {
        MusicControl.setNowPlaying({
            title: `${this.props.team.team} com ${this.props.team.program}`,
            artwork:  `https://redeblast.com/super/uploads/team/${this.props.team.image}`, // URL or RN's image require()
            artist: this.props.currentSong,
            description: this.props.team.description,
            color: 0x99cc00,
            isLiveStream: true,
        });
        if(this.props.paused){
            MusicControl.updatePlayback({state: MusicControl.STATE_PAUSED });
        } else {
            MusicControl.updatePlayback({state: MusicControl.STATE_PLAYING });
        }
    }

    updatePlayback() {
        if(this.props.paused){
            MusicControl.updatePlayback({state: MusicControl.STATE_PAUSED });
        } else {
            MusicControl.updatePlayback({state: MusicControl.STATE_PLAYING });
        }
    }


    enableExternalControls() {
        // Basic Controls
        MusicControl.enableControl('play', true);
        MusicControl.enableControl('pause', true);
    }


    render() {
        return <Video source={{uri: this.props.playlist}}
            ref={(ref) => {
                this.player = ref
            }} 
            audioOnly={true} 
            automaticallyWaitsToMinimizeStalling={true}
            //controls={false}
            onLoad={this.setDuration.bind(this)}
            onProgress={this.updatePlayback}    // Callback every ~250ms with currentTime
            paused={this.props.paused}
            playInBackground={true}
            playWhenInactive={true}
            volume={parseFloat(this.props.volume)}
            onBuffer={this.onBuffer}
            onError={this.videoError}
            playInBackground={true}
            playWhenInactive={true}
            ignoreSilentSwitch={"ignore"}
            controls={false}
        />
    }
}

const mapStateToProps = state => ({
    playlist:           state.HomePageReducer.playlist,
    paused:             state.HomePageReducer.statusPlay,
    volume:             state.HomePageReducer.volume,
    team:               state.HomePageReducer.team,
    currentSong:        state.HomePageReducer.currentSong
});

export default connect(mapStateToProps, { playPause })(Audio);
