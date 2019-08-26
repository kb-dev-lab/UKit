import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class SettingsDividerShort extends Component {
    render() {
        // if (Platform.OS !== 'ios') return null;
        return (
            <View style={styles.containerStyle}>
                <View style={styles.dividerStyle} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        height: 1,
        paddingLeft: 16,
        backgroundColor: 'rgb(255,255,255)',
    },
    dividerStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(220,220,223)',
    },
});
