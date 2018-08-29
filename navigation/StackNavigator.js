import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../components/Home';
import Group from '../components/Group';
import About from '../components/About';
// import Demo from '../components/Demo';
import WebBrowser from '../components/WebBrowser';
import Geolocation from '../components/Geolocation';
import style from '../Style';

export default createStackNavigator({
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
    // Demo: {
    //     screen: Demo,
    //     navigationOptions: style.stackNavigator
    // },
    WebBrowser: {
        screen: WebBrowser,
        navigationOptions: style.stackNavigator,
    },
    Geolocation: {
        screen: Geolocation,
        navigationOptions: style.stackNavigator,
    },
});
