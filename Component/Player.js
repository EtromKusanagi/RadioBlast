import React, {Component} from 'react';
import TrackPlayer from 'react-native-track-player';
export default class Player extends Component {
    componentDidMount(){
        // Creates the player
        TrackPlayer.setupPlayer().then(async () => {
            // Adds a track to the queue
            await TrackPlayer.add({
                id: 'track',
                url: 'http://192.99.150.31:8315/principal;'
            });
        });
    }
    componentWillUnmount(){
        TrackPlayer.destroy();
    }
    render(){
        return true;
    }
}