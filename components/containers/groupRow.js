import React from 'react';
import {View, Text, TouchableHighlight, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../../Style';

export default class Row extends React.Component {
    static propTypes = {
        group: React.PropTypes.object,
        index: React.PropTypes.number,
    };

    displayName(name){
        name.replace(/_/g, '');
        return name;
    }

    openGroup(group){
        Alert.alert(group);
    }

    render() {
        return (
        <TouchableHighlight onPress={this.openGroup(this.props.group.code)} underlayColor="white">
            <View style={[style.list.view]}>
                <Text>{this.displayName(this.props.group.name)}</Text>
            </View>
        </TouchableHighlight>
        );
    }
}