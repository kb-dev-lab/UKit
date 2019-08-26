import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

import style from '../Style';

export default class GroupRow extends React.PureComponent {
    static propTypes = {
        cleanName: PropTypes.string.isRequired,
        color: PropTypes.string,
        fontColor: PropTypes.string,
        name: PropTypes.string.isRequired,
        sectionStyle: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this._onPress = this._onPress.bind(this);
    }

    _onPress(e) {
        requestAnimationFrame(() => {
            this.props.openGroup(this.props.name);
        });
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onPress} underlayColor={style.hintColors.gray}>
                <View style={[style.list.view, this.props.sectionStyle, { backgroundColor: this.props.color }]}>
                    <Text style={{ color: this.props.fontColor }}>{this.props.cleanName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
