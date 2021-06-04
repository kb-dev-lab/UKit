import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { toggleDarkMode } from '../actions/toggleDarkMode';
import DrawerButton from '../components/buttons/DrawerButton';
import MyGroupButton from '../components/buttons/MyGroupButton';
import Split from '../components/ui/Split';
import StackNavigator from './StackNavigator';
import style from '../Style';
import Translator from '../utils/translator';

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchToggleDarkMode: () => {
            dispatch(toggleDarkMode());
        },
    };
};

const mapStateToProps = (state) => {
    return {
        themeName: state.darkMode.themeName,
    };
};

const CustomDrawerContentComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)((props) => {
    const { navigate } = props.navigation;
    const theme = style.Theme[props.themeName];

    return (
        <View style={{ flex: 1, backgroundColor: theme.primary }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: theme.primary,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        alignContent: 'center',
                        height: 120,
                    }}>
                    <Image style={{ width: 170, height: 75, marginLeft: 8, marginTop: 16 }} source={require('../assets/icons/app.png')} />
                </View>
                <ScrollView style={{ backgroundColor: theme.background }}>
                    <View>
                        <Split lineColor={theme.border} onlyBottomMargin={true} />
                        <DrawerButton
                            title={Translator.get('GROUPS')}
                            size={28}
                            textSize={14}
                            icon={'list'}
                            color={theme.icon}
                            fontColor={theme.font}
                            onPress={() => props.navigation.closeDrawer()}
                        />
                        <Split title={Translator.get('MY_GROUP')} lineColor={theme.border} color={theme.icon} />
                        <MyGroupButton navigate={navigate} />
                        <Split title={Translator.get('NAVIGATION')} lineColor={theme.border} color={theme.icon} />
                        <DrawerButton
                            title={'ENT'}
                            size={28}
                            textSize={14}
                            icon={'dashboard'}
                            color={theme.icon}
                            fontColor={theme.font}
                            onPress={() => navigate('WebBrowser', { entrypoint: 'ent' })}
                        />
                        <DrawerButton
                            title={Translator.get('MAILBOX')}
                            size={28}
                            textSize={14}
                            icon={'mail-outline'}
                            color={theme.icon}
                            fontColor={theme.font}
                            onPress={() => navigate('WebBrowser', { entrypoint: 'email' })}
                        />
                        <DrawerButton
                            title={'Apogée'}
                            size={28}
                            textSize={14}
                            icon={'school'}
                            color={theme.icon}
                            fontColor={theme.font}
                            onPress={() => navigate('WebBrowser', { entrypoint: 'apogee' })}
                        />
                        <Split title="Application" lineColor={theme.border} color={theme.icon} />
                        <DrawerButton
                            title={Translator.get('SETTINGS')}
                            size={28}
                            textSize={14}
                            icon={'settings'}
                            color={theme.icon}
                            fontColor={theme.font}
                            onPress={() => navigate('Settings')}
                        />
                        <DrawerButton
                            title={Translator.get('ABOUT')}
                            size={28}
                            textSize={14}
                            icon={'info'}
                            color={theme.icon}
                            fontColor={theme.font}
                            onPress={() => navigate('About')}
                        />
                    </View>
                </ScrollView>
                <View
                    style={{
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        borderTopColor: theme.border,
                        borderTopWidth: 1,
                        backgroundColor: theme.background,
                    }}>
                    <TouchableOpacity onPress={props.dispatchToggleDarkMode}>
                        <MaterialCommunityIcons name="theme-light-dark" size={32} style={{ width: 32, height: 32, color: theme.icon }} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
});

// export default createDrawerNavigator(
//     {
//         Home: {
//             screen: StackNavigator,
//         },
//     },
//     {
//         contentComponent: CustomDrawerContentComponent,
//     }
// );

const Drawer = createDrawerNavigator();

export default () => (
    <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
            <Drawer.Screen name="Home" component={StackNavigator} />
        </Drawer.Navigator>
    </NavigationContainer>
);