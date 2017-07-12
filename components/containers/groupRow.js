import React from 'react';
import {View, Text, TouchableHighlight, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../../Style';

export default class GroupRow extends React.Component {

    constructor(props) {
        super(props);
    }

    displayName(name) {
        name.replace(/_/g, '');
        return name;
    }

    render() {
        return (
            <TouchableHighlight onPress={this.props.openGroup} underlayColor="white">
                <View style={[style.list.view]}>
                    <Text>{this.displayName(this.props.group.name)}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}