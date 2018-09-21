import React from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';

import style from '../../../Style';

export default class URLButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            title: this.props.title,
        };
    }

    openURL() {
        Linking.canOpenURL(this.state.url)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + this.state.url);
                } else {
                    return Linking.openURL(this.state.url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.openURL()}>
                <Text style={{ color: style.colors.darkblue }}>{this.state.title}</Text>
            </TouchableOpacity>
        );
    }
}
