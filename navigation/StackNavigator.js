import React from 'react';
import { createStackNavigator } from 'react-navigation';

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
        },
        Settings: {
            screen: Settings,
        },
        WebBrowser: {
            screen: WebBrowser,
        },
        Geolocation: {
            screen: Geolocation,
        },
    },
    {
        navigationOptions: ({ navigation }) => setStatusBar(navigation),
    }
);
