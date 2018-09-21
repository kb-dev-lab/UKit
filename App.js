import React from 'react';
import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import StackNavigator from './navigation/StackNavigator';
import About from './components/About';
import DrawerButton from './components/containers/buttons/DrawerButton';
import MyGroupButton from './components/containers/buttons/MyGroupButton';
import Split from './components/containers/headers/Split';
import style from './Style';
import WebBrowser from './components/WebBrowser';
import Geolocation from './components/Geolocation';
import configureStore from './stores';
import { setStatusBar } from './Utils';

const CustomDrawerContentComponent = (props) => {
    const { navigate } = props.navigation;

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: style.colors.blue,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        alignContent: 'center',
                        height: 150,
                    }}>
                    <Image style={{ width: 50, height: 50, marginLeft: 20 }} source={require('./assets/icons/app_96.png')} />
                    <Text
                        style={{
                            color: '#FFF',
                            fontWeight: 'bold',
                            fontSize: 30,
                            marginLeft: 20,
                            flex: 1,
                            flexWrap: 'wrap',
                        }}>
                        Ukit
                    </Text>
                </View>
                <View style={{ paddingTop: 5 }}>
                    <DrawerButton
                        title={'Groupes'}
                        size={28}
                        textSize={14}
                        icon={'list'}
                        color={'#757575'}
                        tintColor={'#ededed'}
                        onPress={() => navigate('Home')}
                    />
                    <Split title="Mon groupe" />
                    <MyGroupButton navigate={navigate} />
                    <Split title="Navigation" />
                    <DrawerButton
                        title={'ENT'}
                        size={28}
                        textSize={14}
                        icon={'dashboard'}
                        color={'#757575'}
                        tintColor={'transparent'}
                        onPress={() => navigate('WebBrowser', { entrypoint: 'ent' })}
                    />
                    <DrawerButton
                        title={'Boîte email'}
                        size={28}
                        textSize={14}
                        icon={'mail-outline'}
                        color={'#757575'}
                        tintColor={'transparent'}
                        onPress={() => navigate('WebBrowser', { entrypoint: 'email' })}
                    />
                    <DrawerButton
                        title={'Apogée'}
                        size={28}
                        textSize={14}
                        icon={'school'}
                        color={'#757575'}
                        tintColor={'transparent'}
                        onPress={() => navigate('WebBrowser', { entrypoint: 'apogee' })}
                    />
                    <Split title="Application" />
                    <DrawerButton
                        title={'Paramètres'}
                        size={28}
                        textSize={14}
                        icon={'settings'}
                        color={'#757575'}
                        tintColor={'transparent'}
                        onPress={() => null}
                    />
                    <DrawerButton
                        title={'À propos'}
                        size={28}
                        textSize={14}
                        icon={'info'}
                        color={'#757575'}
                        tintColor={'transparent'}
                        onPress={() => navigate('About')}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const Drawer = createDrawerNavigator(
    {
        Home: {
            screen: StackNavigator,
        },
        About: {
            screen: About,
            navigationOptions: style.stackNavigator,
        },
        WebBrowser: {
            screen: WebBrowser,
            navigationOptions: style.stackNavigator,
        },
        Geolocation: {
            screen: Geolocation,
            navigationOptions: style.stackNavigator,
        },
    },
    {
        navigationOptions: ({ navigation }) => setStatusBar(navigation),
        contentComponent: CustomDrawerContentComponent,
    }
);

const { pStore, store } = configureStore();
const RNRedux = () => (
    <Provider store={store} style={style.fonts.default}>
        <PersistGate loading={<ActivityIndicator style={style.containerView} size="large" animating={true} />} persistor={pStore}>
            <StatusBar barStyle="light-content" backgroundColor={style.colors.blue} />
            <Drawer />
        </PersistGate>
    </Provider>
);

export default RNRedux;
