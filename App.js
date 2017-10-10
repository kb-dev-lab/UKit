import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import About from './components/About';
import {StyleSheet, View, StatusBar, Text, Image} from 'react-native';
import {DrawerNavigator, NavigationActions} from 'react-navigation';
import DrawerButton from './components/containers/buttons/DrawerButton';
import MyGroupButton from './components/containers/buttons/MyGroupButton';
import Split from './components/containers/headers/Split';
import style from './Style';
import moment from 'moment';
import 'moment/locale/fr';
import store from 'react-native-simple-store';


moment.locale('fr');

const CustomDrawerContentComponent = (props) => {
    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <View style={{
                    backgroundColor: '#009DE0',
                    paddingTop: StatusBar.currentHeight,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    alignContent: 'center',
                    height: 150
                }}>
                    <Image
                        style={{width: 50, height: 50, marginLeft: 20}}
                        source={require('./assets/icons/app_96.png')}
                    />
                    <Text style={{
                        color: '#FFF',
                        fontWeight: 'bold',
                        fontSize: 30,
                        marginLeft: 20,
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
                    <Split title='Mon groupe'/>
                    <MyGroupButton onPress={(group) => {
                        const navigateAction = NavigationActions.navigate({
                            routeName: 'Group',
                            params: {name: group}
                        });
                        props.navigation.dispatch(navigateAction);
                    }}/>
                    <Split title='Navigation'/>
                    <DrawerButton title={"ENT"} size={28} textSize={14} icon={'dashboard'} color={"#757575"}
                                  tintColor={'transparent'} onPress={() => null}/>
                    <DrawerButton title={"Boîte email"} size={28} textSize={14} icon={'mail-outline'} color={"#757575"}
                                  tintColor={'transparent'} onPress={() => null}/>
                    <Split title='Application'/>
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

function generateAllDays() {

    let currentDay = moment();
    if (currentDay.isoWeekday() === 7) {
        currentDay = currentDay.add(1, 'days');
    }
    let currentMonth = currentDay.month();
    let currentYear = currentDay.year();
    let startYear = (currentMonth > 7) ? currentYear : currentYear - 1;
    let endYear = (currentMonth > 7) ? currentYear + 1 : currentYear;


    let days = [];
    let day = moment().set({year: startYear, month: 7, date: 20});
    let lastDay = moment().set({year: endYear, month: 6, date: 31});
    let index = 0;
    while (day.isBefore(lastDay, 'day')) {
        let isSunday = (day.isoWeekday() === 7);
        if (!isSunday) {
            days.push(day.clone());
            index++;
        }
        day = day.add(1, 'days');
    }
    store.update('days', {data: days});
}

generateAllDays();

export default drawer;
