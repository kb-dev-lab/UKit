import React, { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

import Translator from '../utils/translator';
import URL from '../utils/URL';

const UpdateAlert = () => {
	const promptAlert = () => {
		Alert.alert(
			Translator.get('UPDATE_UKIT') + ' UKit',
			Translator.get('UPDATE_UKIT_DESCRIPTION'),
			[
				{ text: Translator.get('CANCEL') },
				{ text: Translator.get('UPDATE_UKIT'), onPress: openURL },
			],
			{ cancelable: true },
		);
	};

	const openURL = () => {
		if (Platform.OS === 'ios') {
			Linking.openURL(URL.APPLE_APP);
		} else {
			Linking.openURL(URL.GOOGLE_APP);
		}
	};

	const getCurrentVersion = () => {
		return String(Constants.manifest.version).trim();
	};

	useEffect(() => {
		const checkVersionDiff = async () => {
			const request = await axios.get(URL.VERSION_STORE);
			if (request.status === 200) {
				const storeVersion = String(request.data).trim();
				if (storeVersion !== getCurrentVersion()) {
					promptAlert();
				}
			}
		};
		checkVersionDiff();
	}, []);

	return <></>;
};

export default UpdateAlert;
