import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import style from '../../Style';

export default class GroupRow extends React.Component {

    constructor(props) {
        super(props);
    }

    displayName(name) {
        return name.replace(/_/g, ' ');
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