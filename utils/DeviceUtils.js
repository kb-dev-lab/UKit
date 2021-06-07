import React from 'react';
import NetInfo from "@react-native-community/netinfo";
import { NativeModules, Platform } from 'react-native';

export function deviceLanguage() {
    return Platform.OS === 'ios' 
    ? NativeModules.SettingsManager.settings.AppleLocale 
    || NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;
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

export async function isConnected () {
    const netInfo = await NetInfo.fetch();
    
    return netInfo.isConnected;
}

const AppContextCreator = React.createContext({});

export const AppContext = AppContextCreator;
export const AppContextProvider = AppContextCreator.Provider;

export default {
    isConnected,

    AppContext: AppContextCreator,
    AppContextProvider: AppContextCreator.Provider,
};
