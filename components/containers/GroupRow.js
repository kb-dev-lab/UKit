import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import style from '../../Style';

export default class GroupRow extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onPress = this._onPress.bind(this);
    }

    _onPress(e) {
        requestAnimationFrame(() => {
            this.props.openGroup(e);
        });
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onPress} underlayColor={style.hintColors.gray}>
                <View style={[style.list.view, this.props.group.sectionStyle]}>
                    <Text>{this.props.group.cleanName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
