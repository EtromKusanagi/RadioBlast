import React, { Component } from 'react';
import {  View, Image, Text, StyleSheet, BackHandler, ToastAndroid, Modal } from 'react-native';

import { connect } from 'react-redux';

import { scale, verticalScale } from '../../assets/scaling';

class NewsFull extends Component {
    render(){
        return(
            <View style={[styles.content,{backgroundColor: this.props.backgroundColor}]}>
                <Text style={styles.title}>{this.props.newsPage.title}</Text>
                <Image style={styles.image} source={{uri: this.props.newsPage.thumb}}/>
                <Text style={styles.subTitle}>{this.props.newsPage.description}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    backgroundColor:    state.AppConfigReducer.backgroundColor,
    newsPage:           state.NewsPageReducer.newsPage,
    newsVisible:        state.NewsPageReducer.newsVisible
});

export default connect(mapStateToProps, {})(NewsFull);

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        display: 'flex',
        padding: scale(20),
        fontSize: scale(24),
        color: "#fff",
        fontWeight: "bold"
    },
    image: {
        width: scale(310),
        height: scale(155),
        marginHorizontal: scale(20)
    },
    
    subTitle: {
        display: 'flex',
        padding: scale(20),
        fontSize: scale(18),
        color: "#fff"
    },
});