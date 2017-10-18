import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import About from './components/About';
import {StyleSheet, View, StatusBar, Text, Image} from 'react-native';
import {DrawerNavigator, NavigationActions} from 'react-navigation';
import DrawerButton from './components/containers/buttons/DrawerButton';
import MyGroupButton from './components/containers/buttons/MyGroupButton';
import Split from './components/containers/headers/Split';
import style from './Style';
import DayStore from './stores/DayStore';
import WeekStore from './stores/WeekStore';

const CustomDrawerContentComponent = (props) => {
    const {navigate} = props.navigation;
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
                                  tintColor={'#ededed'} onPress={() => navigate('Home')}/>
                    <Split title='Mon groupe'/>
                    <MyGroupButton navigate={navigate}/>
                    <Split title='Navigation'/>
                    <DrawerButton title={"ENT"} size={28} textSize={14} icon={'dashboard'} color={"#757575"}
                                  tintColor={'transparent'} onPress={() => navigate('ENTWebview')}/>
                    <DrawerButton title={"Boîte email"} size={28} textSize={14} icon={'mail-outline'} color={"#757575"}
                                  tintColor={'transparent'} onPress={() => null}/>
                    <Split title='Application'/>
                    <DrawerButton title={"Paramètres"} size={28} textSize={14} icon={'settings'} color={"#757575"}
                                  tintColor={'transparent'} onPress={() => null}/>
                    <DrawerButton title={"À propos"} size={28} textSize={14} icon={'info'} color={"#757575"}
                                  tintColor={'transparent'} onPress={() => navigate('About')}/>
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
    }
}, {
    contentComponent: CustomDrawerContentComponent
});

DayStore.check();
WeekStore.check();

export default drawer;
