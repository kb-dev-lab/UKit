import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class SettingsDividerLong extends Component {
    render() {
        return <View style={styles.dividerStyle} />;
    }
}

const styles = StyleSheet.create({
    dividerStyle: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgb(220,220,223)',
    },
});
