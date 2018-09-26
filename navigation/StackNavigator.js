import React from 'react';
import { createStackNavigator } from 'react-navigation';

import style from '../Style';

import Home from '../components/Home';
import Group from '../components/Group';
import About from '../components/About';
import Settings from '../components/Settings';
import WebBrowser from '../components/WebBrowser';
import Geolocation from '../components/Geolocation';
import DayView from '../components/DayView';
import WeekView from '../components/WeekView';
import { setStatusBar } from '../Utils';

export default createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: style.stackNavigator,
        },
        Group: {
            screen: Group,
        },
        Week: {
            screen: WeekView,
        },
        Day: {
            screen: DayView,
        },
        About: {
            screen: About,
            navigationOptions: style.stackNavigator,
        },
        Settings: {
            screen: Settings,
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
        navigationOptions: ({ navigation }) => setStatusBar(navigation),
    }
);
