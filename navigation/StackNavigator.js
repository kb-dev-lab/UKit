import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from '../components/Home';
import Group from '../components/Group';
import About from '../components/About';
import WebBrowser from '../components/WebBrowser';
import Geolocation from '../components/Geolocation';
import style from '../Style';
import { StatusBar } from 'react-native';

export default createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: style.stackNavigator,
        },
        Group: {
            screen: Group,
        },
        About: {
            screen: About,
            navigationOptions: style.stackNavigator,
        },
        WebBrowser: {
            screen: WebBrowser,
            navigationOptions: style.stackNavigator,
        },
        Geolocation: {
            screen: Geolocation,
            navigationOptions: style.stackNavigator,
        },
    },
    {
        navigationOptions: ({ navigation }) => {
            navigation.addListener('willFocus', () => {
                StatusBar.setBarStyle('light-content');
            });
            navigation.addListener('didFocus', () => {
                StatusBar.setBarStyle('light-content');
            });
            navigation.addListener('willBlur', () => {
                StatusBar.setBarStyle('light-content');
            });
            navigation.addListener('didBlur', () => {
                StatusBar.setBarStyle('light-content');
            });
        },
    }
);
