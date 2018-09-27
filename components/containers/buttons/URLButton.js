import React from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';

export default class URLButton extends React.PureComponent {
    openURL() {
        Linking.canOpenURL(this.props.url)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + this.props.url);
                } else {
                    return Linking.openURL(this.props.url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }

    render() {
        const { theme } = this.props;

        return (
            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => this.openURL()}>
                <Text style={{ color: theme.link }}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}
