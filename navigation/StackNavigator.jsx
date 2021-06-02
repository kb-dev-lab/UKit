import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

import NavBarHelper from '../components/NavBarHelper';
import Translator from '../utils/translator';
import BackButton from '../components/buttons/BackButton';

const mapStateToProps = (state) => ({ themeName: state.darkMode.themeName });

// const StackNavigator = createStackNavigator({
//     Home: {
//         screen: Home,
//     },
//     Group: {
//         screen: Group,
//     },
//     Week: {
//         screen: WeekView,
//     },
//     Day: {
//         screen: DayView,
//     },
//     About: {
//         screen: About,
//     },
//     Settings: {
//         screen: Settings,
//     },
//     WebBrowser: {
//         screen: WebBrowser,
//     },
//     Geolocation: {
//         screen: Geolocation,
//     },
//     Course: {
//         screen: Course,
//     },
// });

const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Home}
            // options={({ navigation, screenProps }) => {
            //     const title = Translator.get('GROUPS');
            //     const leftButton = (
            //         <TouchableOpacity
            //             onPress={() => {
            //                 navigation.openDrawer();
            //             }}
            //             style={{
            //                 justifyContent: 'space-around',
            //                 paddingLeft: 16,
            //             }}>
            //             <View
            //                 style={{
            //                     flexDirection: 'row',
            //                     justifyContent: 'space-between',
            //                 }}>
            //                 <MaterialCommunityIcons
            //                     name="menu"
            //                     size={32}
            //                     style={{
            //                         color: '#F0F0F0',
            //                         height: 32,
            //                         width: 32,
            //                     }}
            //                 />
            //             </View>
            //         </TouchableOpacity>
            //     );

            //     return NavBarHelper({
            //         title,
            //         headerLeft: leftButton,
            //         themeName: screenProps.themeName,
            //     });
            // }}
        />
        <Stack.Screen
            name="Group"
            component={Group}
        />
        <Stack.Screen
            name="Week"
            component={WeekView}
        />
        <Stack.Screen
            name="Day"
            component={DayView}
        />
        <Stack.Screen
            name="About"
            component={About}
            options={({ navigation, screenProps }) => {
                let title = 'À propos';
                let leftButton = <BackButton backAction={navigation.goBack} />;

                return NavBarHelper({
                    headerLeft: leftButton,
                    title,
                    themeName: screenProps.themeName,
                });
            }}
        />
        <Stack.Screen
            name="Settings"
            component={Settings}
        />
        <Stack.Screen
            name="WebBrowser"
            component={WebBrowser}
        />
        <Stack.Screen
            name="Geolocation"
            component={Geolocation}
        />
        <Stack.Screen
            name="Course"
            component={Course}
        />
    </Stack.Navigator>
);

class CustomStackNavigator extends React.Component {
    static router = StackNavigator.router;

    render() {
        return <StackNavigator navigation={this.props.navigation} screenProps={{ themeName: this.props.themeName }} />;
    }
}

export default connect(mapStateToProps)(CustomStackNavigator);
