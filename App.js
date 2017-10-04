import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import About from './components/About';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import {DrawerNavigator, NavigationActions} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerButton from './components/containers/buttons/DrawerButton';
import Split from './components/containers/headers/Split';

const CustomDrawerContentComponent = (props) => {
    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <View style={{
                    backgroundColor: '#0D47A1',
                    paddingTop: StatusBar.currentHeight,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    alignContent: 'center',
                    height: 150
                }}>
                    <MaterialCommunityIcons
                        name="school"
                        size={50}
                        style={{color: '#FFF', marginLeft: 20}}
                    />
                    <Text style={{
                        color: '#FFF',
                        fontWeight: 'bold',
                        fontSize: 30,
                        marginLeft: 10,
                        flex: 1,
                        flexWrap: 'wrap'
                    }}>Ukit</Text>
                </View>
                <View style={{paddingTop: 5}}>
                    <DrawerButton title={"Groupes"} size={28} textSize={14} icon={'list'} color={"#757575"}
                                  tintColor={'#ededed'} onPress={() => {
                        const navigateAction = NavigationActions.navigate({
                            routeName: 'Home'
                        });
                        props.navigation.dispatch(navigateAction);
                    }}/>
                    <Split/>
                    <DrawerButton title={"Paramètres"} size={28} textSize={14} icon={'settings'} color={"#757575"}
                                  tintColor={'transparent'} onPress={() => null}/>
                    <DrawerButton title={"À propos"} size={28} textSize={14} icon={'info'} color={"#757575"}
                                  tintColor={'transparent'} onPress={() => {
                        const navigateAction = NavigationActions.navigate({
                            routeName: 'About'
                        });
                        props.navigation.dispatch(navigateAction);
                    }}/>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

const drawer = DrawerNavigator({
    Home: {
        screen: StackNavigator,
    },
    About: {
        screen: About,
    }
}, {
    contentComponent: CustomDrawerContentComponent
});

export default drawer;
