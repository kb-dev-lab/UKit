import React from 'react';
import { Platform, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import style from '../../Style';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class BackButton extends React.PureComponent {
    static propTypes = {
        backAction: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this._onPress = this._onPress.bind(this);
    }

    _onPress() {
        requestAnimationFrame(() => {
            this.props.backAction();
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPress} style={style.backButton}>
                <View>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        size={32}
                        style={{
                            color: '#F0F0F0',
                            height: 32,
                            width: 32,
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}
