import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { NativeModules, Platform } from 'react-native';

export function deviceLanguage() {
	return Platform.OS === 'ios'
		? NativeModules.SettingsManager.settings.AppleLocale ||
				NativeModules.SettingsManager.settings.AppleLanguages[0]
		: NativeModules.I18nManager.localeIdentifier;
}

export function languageFromDevice() {
	switch (deviceLanguage()) {
		case 'fr_FR':
			return 'fr';
		case 'es_ES':
			return 'es';
		default:
			return 'en';
	}
	if (deviceLanguage() === 'fr_FR') {
		return 'fr';
	} else {
		return 'en';
	}
}

export function treatTitle(str) {
	if (str.length > 18) {
		if (str.charAt(18) === ' ') {
			return `${str.substr(0, 18)}…`;
		}

		return `${str.substr(0, 18)} …`;
	}

	return str;
}

export async function isConnected() {
	const netInfo = await NetInfo.fetch();

	return netInfo.isConnected;
}

const AppContextCreator = React.createContext({});

export const AppContext = AppContextCreator;
export const AppContextProvider = AppContextCreator.Provider;

export default {
	isConnected,
	languageFromDevice,

	AppContext: AppContextCreator,
	AppContextProvider: AppContextCreator.Provider,
};
