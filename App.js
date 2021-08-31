import React from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import {
	Entypo,
	Feather,
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
	SimpleLineIcons,
} from '@expo/vector-icons';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import * as Sentry from 'sentry-expo';

import RootContainer from './containers/rootContainer';
import SettingsManager from './utils/SettingsManager';
import DataManager from './utils/DataManager';

if (Constants.manifest.extra.sentryDSN) {
	Sentry.init({
		dsn: Constants.manifest.extra.sentryDSN,
		enableInExpoDevelopment: false,
		debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
	});
} else {
	console.error('No Sentry URL provided.');
}

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
	}

	render() {
		if (!this.state.isSplashReady) {
			return (
				<AppLoading
					startAsync={this._loadAssetsAsync}
					onFinish={() => this.setState({ isSplashReady: true })}
					onError={console.warn}
				/>
			);
		}

		return <RootContainer />;
	}

	_loadAssetsAsync = async () => {
		await Font.loadAsync({ Montserrat_500Medium });

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

		await DataManager.loadData();

		await SettingsManager.loadSettings();

		await Promise.all([...imageAssets, ...fontAssets]);
	};
}
