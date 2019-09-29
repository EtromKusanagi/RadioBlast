import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FooterMenu from '../../Component/FooterMenu';

export default class Home extends Component {
    render(){
        return(
            <View style={styles.content}>
                <View style={styles.session}>
                    <Text>Home</Text>
                </View>
                <FooterMenu style={styles.footerMenu} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1
    },
    session: {
        flex: 1
    },
    footerMenu: {
        height: 40,
        backgroundColor: '#ccc',
    },
})