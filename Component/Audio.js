import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from 'react-native-video';

class Audio extends Component {
    render() {
        return <Video source={{uri: this.props.playlist}}
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
            onBuffer={this.onBuffer}
            onError={this.videoError}
        />
    }
}

const mapStateToProps = state => ({
    playlist:           state.HomePageReducer.playlist,
    statusPlay:         state.HomePageReducer.statusPlay,
    volume:             state.HomePageReducer.volume,
});

export default connect(mapStateToProps, {})(Audio);
