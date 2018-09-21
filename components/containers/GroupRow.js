import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import style from '../../Style';

export default class GroupRow extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.props.openGroup} underlayColor={style.hintColors.gray}>
                <View style={[style.list.view, this.props.group.sectionStyle]}>
                    <Text>{this.props.group.cleanName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
