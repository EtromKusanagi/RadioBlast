import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
//import TrackPlayer from 'react-native-track-player';
import { scale } from '../assets/scaling';

class ListMusic extends Component {
    render(){
        return(
            <View>
                {
                    this.props.songs.map(
                        (item, index) => {
                        if(item.time !== "Tocando agora")
                            return <View key={`itemUltimasTocadas-${index}`} style={styles.lineMusic}>
                                <Text style={styles.timerMusic}>
                                    {item.time}
                                </Text>
                                <Text style={styles.titleMusic} numberOfLines = {1}>
                                    {item.title}
                                </Text>
                            </View>
                        }
                    )
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    songs:  state.HomePageReducer.songs,
});

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