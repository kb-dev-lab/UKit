import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
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

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AnimatedAppLoader({ children }) {
	const [appIsReady, setAppIsReady] = useState(false);
	const imageSrc = require('./assets/icons/splash.png');

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
			setTimeout(() => SplashScreen.hideAsync());
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return <AnimatedSplashScreen image={imageSrc}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
	const animation = useMemo(() => new Animated.Value(1), []);
	const [isAppReady, setAppReady] = useState(false);
	const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

	useEffect(() => {
		if (isAppReady) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: true,
			}).start(() => setAnimationComplete(true));
		}
	}, [isAppReady]);

	const onImageLoaded = useCallback(async () => {
		try {
			await SplashScreen.hideAsync();
		} catch (e) {
			console.log('err', e);
			// handle errors
		} finally {
			setAppReady(true);
		}
	}, []);

	return (
		<View style={{ flex: 1 }}>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents="none"
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: Constants.manifest.splash.backgroundColor,
							opacity: animation,
						},
					]}>
					<Animated.Image
						style={{
							width: '100%',
							height: '100%',
							resizeMode: Constants.manifest.splash.resizeMode || 'contain',
						}}
						source={image}
						onError={(e) => console.log(e.nativeEvent.error)}
						onLoadEnd={onImageLoaded}
						fadeDuration={0}
					/>
				</Animated.View>
			)}
		</View>
	);
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
	return (
		<AnimatedAppLoader>
			<RootContainer />
		</AnimatedAppLoader>
	);
}
