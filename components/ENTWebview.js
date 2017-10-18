import React from 'react';
import {View, WebView} from 'react-native';

export default class ENTWebview extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: 'https://ent.u-bordeaux.fr'}}
                    style={{marginTop: 20}}
                />
            </View>
        );
    }
}