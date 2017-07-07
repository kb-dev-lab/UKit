import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../../Style';

export default class Row extends React.Component {
    static propTypes = {
        group: React.PropTypes.object,
        index: React.PropTypes.number,
    };

    render() {
        return (
            <View style={[style.list.view]}>
                    <Text>{this.props.group.name}</Text>
            </View>
        );
    }
}