import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { AppLoading, Asset, Font, SplashScreen } from 'expo';
import { Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { toggleDarkMode } from './actions/toggleDarkMode';
import StackNavigator from './navigation/StackNavigator';
import About from './components/About';
import DrawerButton from './components/containers/buttons/DrawerButton';
import MyGroupButton from './components/containers/buttons/MyGroupButton';
import Split from './components/containers/ui/Split';
import StatusBar from './components/containers/ui/StatusBar';
import style from './Style';
import WebBrowser from './components/WebBrowser';
import Geolocation from './components/Geolocation';
import configureStore from './stores';
import { setStatusBar } from './Utils';

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
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: theme.primary,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        alignContent: 'center',
                        height: 120,
                    }}>
                    <Image style={{ width: 170, height: 75, marginLeft: 8, marginTop: 16 }} source={require('./assets/icons/app.png')} />
                </View>
                <ScrollView style={{ backgroundColor: theme.background }}>
                    <View>
                        <Split lineColor={theme.border} onlyBottomMargin={true} />
                        <DrawerButton
                            title={'Groupes'}
                            size={28}
                            textSize={14}
                            icon={'list'}
                            color={theme.icon}
                            fontColor={theme.font}
                            onPress={() => props.navigation.closeDrawer()}
                        />
                        <Split title="Mon groupe" lineColor={theme.border} color={theme.icon} />
                        <MyGroupButton navigate={navigate} />
                        <Split title="Navigation" lineColor={theme.border} color={theme.icon} />
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
                            title={'Boîte email'}
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
                            title={'Paramètres'}
                            size={28}
                            textSize={14}
                            icon={'settings'}
                            color={theme.icon}
                            fontColor={theme.font}
                            onPress={() => navigate('Settings')}
                        />
                        <DrawerButton
                            title={'À propos'}
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
            </View>
        </View>
    );
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

const { store, pStore } = configureStore();
const RNRedux = () => (
    <Provider store={store} style={style.fonts.default}>
        <PersistGate loading={null} persistor={pStore}>
            <StatusBar />
            <Drawer />
        </PersistGate>
    </Provider>
);

function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
}

function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class App extends React.Component {
    state = {
        isSplashReady: false,
    };

    constructor(props) {
        super(props);

        this._loadAssetsAsync = this._loadAssetsAsync.bind(this);
    }

    render() {
        if (!this.state.isSplashReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isSplashReady: true })}
                    onError={console.warn}
                    autoHideSplash={false}
                />
            );
        }

        return <RNRedux />;
    }

    _loadAssetsAsync() {
        const imageAssets = cacheImages([require('./assets/icons/app.png'), require('./assets/icons/down.png')]);

        const fontAssets = cacheFonts([
            FontAwesome.font,
            Feather.font,
            Ionicons.font,
            MaterialCommunityIcons.font,
            MaterialIcons.font,
            SimpleLineIcons.font,
            Entypo.font,
        ]);

        Promise.all([...imageAssets, ...fontAssets]).then(() => {
            SplashScreen.hide();
        });
    }
}
