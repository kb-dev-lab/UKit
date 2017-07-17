import React from 'react';
import {TabNavigator} from 'react-navigation';
import Day from '../components/Day';
import Week from '../components/Week';

export default TabNavigator({
    Day: {
        screen: Day
    },
    Week: {
        screen: Week
    }
});