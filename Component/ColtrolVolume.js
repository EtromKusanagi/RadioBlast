import React, { Component } from 'react';
import { Slider } from 'react-native';
import VolumeControl, {
    VolumeControlEvents
} from "react-native-volume-control";
//import Slider from '@react-native-community/slider';
  
export default class ControlVolume extends Component {
    state = {
        volume: 0
    }
  
    async componentDidMount() {
        this.setState({
            volume: await VolumeControl.getVolume()
        });
    
        // Add and store event listener
        this.volEvent = VolumeControlEvents.addListener(
            "VolumeChanged",
            this.volumeEvent
        );
    }
  
    // Updates Slider UI when hardware buttons change volume
    volumeEvent = event => {
        this.setState({ volume: event.volume });
    };
  
    // Updates device volume
    sliderChange(value) {
        VolumeControl.change(value);
    }
  
    componentWillUnmount() {
        // remove event listener
        this.volEvent.remove();
    }
  
    render() {
        return (
            <Slider style={{flex:1}}
                value={this.state.volume}
                onValueChange={this.sliderChange}
                thumbTintColor="#FFF"
                minimumTrackTintColor="#FFF"
                maximumTrackTintColor="#FFF"
                // Other props
            />
        )
    }
}