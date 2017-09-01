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

    getSectionStyle(){
        let indexStyle = this.props.group.sectionIndex % style.list.sections.length;
        return style.list.sections[indexStyle];
    }

    render() {
        return (
            <TouchableHighlight onPress={this.props.openGroup} underlayColor="white">
                <View style={[style.list.view, this.getSectionStyle()]}>
                    <Text>{this.displayName(this.props.group.name)}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}