import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { displayPlayer } from "../../Actions/HomePageAction";
import { scale } from '../../assets/scaling';
import Player from '../../Component/Player';

class Home extends Component {
    render(){
        return(
            <View style={styles.content}>
                <View style={styles.contentPlayer}>
                    <Player/>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    statusDisplayPlay:         state.HomePageReducer.statusDisplayPlay,
});

export default connect(mapStateToProps, { displayPlayer })(Home);

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
    },
    contentPlayer: {
        overflow:'hidden',
        marginTop: -scale(22),
        marginHorizontal: scale(20)
    }
})