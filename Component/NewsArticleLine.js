import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { scale } from '../assets/scaling';
import { setNews, setNewsVisible } from '../Actions/NewsPageAction'; 
class NewsAticleLine extends Component {
    render(){
        return (
            <TouchableOpacity 
                onPress={
                    () => {
                        this.props.setNews(this.props.news);
                        this.props.setNewsVisible(!this.props.newsVisible);
                    }
                }
                style={styles.newsLine}
            >
                <View>
                    <Image style={styles.newsImage} source={{uri: this.props.news.thumb}}/>
                </View>
                <View style={{display:"flex", flex: 1, marginLeft: scale(10)}}>
                    <Text style={styles.newsTime} numberOfLines = {1}>
                        {this.props.news.time}
                    </Text>
                    <Text style={styles.newsTitle} numberOfLines = {1}>
                        {this.props.news.title}
                    </Text>
                    <Text style={styles.newsDescription} numberOfLines = {2}>
                        {this.props.news.subTitle}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const mapStateToProps = state => ({
    newsVisible:        state.NewsPageReducer.newsVisible
});
export default connect(mapStateToProps, { setNews, setNewsVisible })(NewsAticleLine);

const styles = StyleSheet.create({
    newsLine: {
        backgroundColor: "#ffffff",
        flexDirection: 'row',
        padding: scale(5),
        borderRadius: scale(10),
        marginVertical: scale(5),
        marginHorizontal: scale(20),
    },
    newsImage: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(5),
        resizeMode: 'cover',
    },
    newsTime: {
        fontSize: scale(12),
        lineHeight: scale(18),
    },
    newsTitle: {
        fontSize: scale(16),
        lineHeight: scale(24),
        fontWeight: 'bold',
    },
    newsDescription: {
        display: 'flex',
        flex: 1,
        fontSize: scale(14),
        lineHeight: scale(19),
    },
})