import React from 'react';
import {View, WebView} from 'react-native';

export default class WebBrowser extends React.Component {
    constructor(props) {
        super(props);
        console.log('WebBrowser', props);
        this.state = {
            entrypoint: this.props.entrypoint
        };
        this.entrypoints = {
            ent: 'https://ent.u-bordeaux.fr',
            email: 'https://webmel.u-bordeaux.fr',
            groups: 'https://ent.u-bordeaux.fr'
        };
    }

    getUri() {
        if (this.entrypoints.hasOwnProperty(this.state.entrypoint)) {
            return this.entrypoints[this.state.entrypoint];
        }
        return this.entrypoints.ent;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: this.getUri()}}
                />
            </View>
        );
    }
}