import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Home from '../pages/Home';
import Group from '../pages/Group';
import About from '../pages/About';
import Settings from '../pages/Settings';
import WebBrowser from '../pages/WebBrowser';
import Geolocation from '../pages/Geolocation';
import Course from '../pages/Course';
import DayView from '../pages/DayView';
import WeekView from '../pages/WeekView';

const mapStateToProps = (state) => ({ themeName: state.darkMode.themeName });

const StackNavigator = createStackNavigator({
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
    Course: {
        screen: Course,
    },
});

class CustomStackNavigator extends React.Component {
    static router = StackNavigator.router;

    render() {
        return <StackNavigator navigation={this.props.navigation} screenProps={{ themeName: this.props.themeName }} />;
    }
}

export default connect(mapStateToProps)(CustomStackNavigator);
