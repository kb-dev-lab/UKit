import React from 'react';
import {TabNavigator} from 'react-navigation';
import DaySwiper from '../components/DaySwiper';
import WeekSwiper from '../components/WeekSwiper';

export default TabNavigator({
    Day: {
        screen: DaySwiper
    },
    Week: {
        screen: WeekSwiper
    }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazy: true,
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