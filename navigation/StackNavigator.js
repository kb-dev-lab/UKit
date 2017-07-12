import React from 'react';
import {StackNavigator} from 'react-navigation';
import Home from '../components/Home';
import Group from '../components/Group';
import About from '../components/About';
import GroupRow from '../components/containers/groupRow';
import style from '../Style';

export default StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: style.stackNavigator
    },
    Group: {
        screen: Group,
        navigationOptions: style.stackNavigator
    },
    About: {
        screen: About,
        navigationOptions: style.stackNavigator
    },
    GroupRow: {
        screen: GroupRow,
        navigationOptions: style.stackNavigator
    }
});