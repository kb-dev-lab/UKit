import React from 'react';
import StackNavigator from 'react-navigation';
import Home from '../components/Home';
import style from '../Style';

export default StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: style.stackNavigator
    }
});