import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
//import TrackPlayer from 'react-native-track-player';
import { scale } from '../assets/scaling';

const musicasTocadas = [
    { timer: '09:35', musicName: "Girls' Generation - Oh!" },
    { timer: '09:31', musicName: "B'z - NO EXCUSE" },
    { timer: '09:26', musicName: "清水咲斗子 - Shining Soul" },
    { timer: '09:24', musicName: "Abertura Japonesa - Meninas Superpoderosas" },
    { timer: '09:20', musicName: "Hatsune Miku - Mythologias End" },
    { timer: '09:19', musicName: "Tamo na Blast! - Gangsta" },
    { timer: '09:18', musicName: "Fox Angeluz - Blurry Eyes" },
    { timer: '09:14', musicName: "LM.C - OH MY JULIET" },
    { timer: '09:11', musicName: "YUI - Thank you My teens" },
    
];

class ListMusic extends Component {
    render(){
        return(
            <FlatList
                data={musicasTocadas}
                keyExtractor={ item => item.timer}
                renderItem={
                    ({item}) => (
                        <View style={styles.lineMusic}>
                            <Text style={styles.timerMusic}>
                                {item.timer}
                            </Text>
                            <Text style={styles.titleMusic} numberOfLines = {1}>
                                {item.musicName}
                            </Text>
                        </View>
                    )
                }
            />
                        
        )
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(ListMusic);

const styles = StyleSheet.create({
    lineMusic: {
        flexDirection: 'row',
        height: scale(30)
    },
    timerMusic: {
        fontSize: scale(11),
        lineHeight: scale(19),
        marginRight: scale(20),
    },
    titleMusic: {
        display: 'flex',
        flex: 1,
        fontSize: scale(14),
        lineHeight: scale(19),
        fontWeight: 'bold'
    },
})