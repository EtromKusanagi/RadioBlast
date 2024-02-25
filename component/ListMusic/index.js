import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { scale } from '../../assets/scaling';

const ListMusic = (props) => {
    return(
        <ScrollView>
            {
                props.songs.map(
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
        </ScrollView>
    );
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
        color: '#666'
    },
    titleMusic: {
        display: 'flex',
        flex: 1,
        fontSize: scale(14),
        lineHeight: scale(19),
        fontWeight: 'bold',
        color: '#666'
    },
})