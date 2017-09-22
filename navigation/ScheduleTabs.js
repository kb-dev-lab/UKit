import React from 'react';
import {TabNavigator} from 'react-navigation';
import DaySwiper from '../components/DaySwiper';
import Week from '../components/Week';

export default TabNavigator({
    Day: {
        screen: DaySwiper
    },
    Week: {
        screen: Week
    }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
        indicatorStyle: {
            backgroundColor: '#FFF'
        },
        iconStyle: {
            height: 16,
            width: 16
        },
        labelStyle: {
            fontSize: 10,
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0
        },
        showIcon: true
    }
});