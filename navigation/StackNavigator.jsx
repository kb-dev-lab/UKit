import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../pages/Home';
import Group from '../pages/Group';
import About from '../pages/About';
import Settings from '../pages/NewSettings';
import WebBrowser from '../pages/WebBrowser';
import Geolocation from '../pages/Geolocation';
import Course from '../pages/Course';
import DayView from '../pages/DayView';
import WeekView from '../pages/WeekView';

import NavBarHelper from '../components/NavBarHelper';
import BackButton from '../components/buttons/BackButton';
import SaveButton from '../components/buttons/SaveGroupButton';
import { AppContext, treatTitle } from '../utils/DeviceUtils';
import Translator from '../utils/translator';

const Stack = createStackNavigator();

const StackNavigator = () => (
    <AppContext.Consumer>
        {({ themeName, groupName }) => (
            <Stack.Navigator
                screenOptions={({ navigation, route }) => {
                    let leftButton = <BackButton backAction={navigation.goBack} />;
                    let title = route.name

                    return NavBarHelper({
                        headerLeft: () => leftButton,
                        title,
                        themeName,
                    });
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation }) => {
                        const title = Translator.get('GROUPS');
                        const leftButton = (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.openDrawer();
                                }}
                                style={{
                                    justifyContent: 'space-around',
                                    paddingLeft: 16,
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                    <MaterialCommunityIcons
                                        name="menu"
                                        size={32}
                                        style={{
                                            color: '#F0F0F0',
                                            height: 32,
                                            width: 32,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                        return NavBarHelper({
                            headerLeft: () => leftButton,
                            title,
                            themeName,
                        });
                    }}
                />
                <Stack.Screen
                    name="Group"
                    component={Group}
                    options={({ route }) => {
                        const groupName = route.params.name;
                        const title = groupName.replace(/_/g, ' ');
                        const rightButton = (
                            <View
                                style={{
                                    justifyContent: 'space-around',
                                    paddingRight: 16,
                                    flexDirection: 'row',
                                }}>
                                <SaveButton groupName={groupName} />
                            </View>
                        );

                        return NavBarHelper({
                            title,
                            headerRight: () => rightButton,
                            themeName,
                        });
                    }}
                />
                <Stack.Screen
                    name="Week"
                    component={WeekView}
                    options={({ route }) => {
                        const groupName = route.params.groupName;
                        const title = groupName.replace(/_/g, ' ');
                        const rightButton = (
                            <View
                                style={{
                                    justifyContent: 'space-around',
                                    paddingRight: 16,
                                    flexDirection: 'row',
                                }}>
                                <SaveButton groupName={groupName} />
                            </View>
                        );

                        return NavBarHelper({
                            headerRight: () => rightButton,
                            title,
                            themeName,
                        });
                    }}
                />
                <Stack.Screen
                    name="Day"
                    component={DayView}
                    options={{
                        tabBarLabel: Translator.get('DAY'),
                        tabBarIcon: ({ tintColor }) => {
                            return <MaterialCommunityIcons name="calendar" size={24} style={{ color: tintColor }} />;
                        },
                    }}
                />
                <Stack.Screen
                    name="About"
                    component={About}
                    options={{
                        title: Translator.get('ABOUT'),
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        title: Translator.get('SETTINGS'),
                    }}
                />
                <Stack.Screen
                    name="WebBrowser"
                    component={WebBrowser}
                    options={({ route }) => {
                        let title = treatTitle(route.params?.title ?? Translator.get('WEB_BROWSER'));

                        return NavBarHelper({
                            title,
                            themeName,
                        });
                    }}
                />
                <Stack.Screen
                    name="Geolocation"
                    component={Geolocation}
                />
                <Stack.Screen
                    name="Course"
                    component={Course}
                    options={({ route }) => {
                        let title = route.params?.title ?? Translator.get('DETAILS');

                        return NavBarHelper({
                            title,
                            themeName,
                        });
                    }}
                />
            </Stack.Navigator>
        )}
    </AppContext.Consumer>
);

class CustomStackNavigator extends React.Component {
    static router = StackNavigator.router;

    render() {
        return (
            <StackNavigator navigation={this.props.navigation} />
        );
    }
}

export default CustomStackNavigator;
