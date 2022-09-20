import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
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
	console.warn('No Sentry URL provided.');
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

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
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
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return <RootContainer />;
}
