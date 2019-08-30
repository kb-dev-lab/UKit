import React from 'react';
import { Image } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

import RootContainer from './containers/rootContainer';

function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
}

function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class App extends React.Component {
    state = {
        isSplashReady: false,
    };

    constructor(props) {
        super(props);

        this._loadAssetsAsync = this._loadAssetsAsync.bind(this);
    }

    render() {
        if (!this.state.isSplashReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isSplashReady: true })}
                    onError={console.warn}
                    autoHideSplash={false}
                />
            );
        }

        return <RootContainer />;
    }

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([require('./assets/icons/app.png')]);

        const fontAssets = cacheFonts([
            FontAwesome.font,
            Feather.font,
            Ionicons.font,
            MaterialCommunityIcons.font,
            MaterialIcons.font,
            SimpleLineIcons.font,
            Entypo.font,
        ]);

        await Promise.all([...imageAssets, ...fontAssets]);
        SplashScreen.hide();
    }
}
