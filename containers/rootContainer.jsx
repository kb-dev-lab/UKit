import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';

import StatusBar from '../components/ui/StatusBar';
import Drawer from '../navigation/Drawer';
import style from '../Style';
import configureStore from '../stores';
import { AppContextProvider } from '../utils/DeviceUtils';
import SettingsManager from '../utils/SettingsManager';


// See : https://github.com/react-navigation/react-navigation/issues/5568
// if (Platform.OS === 'android') {
//     SafeAreaView.setStatusBarHeight(0);
// }

const { store, pStore } = configureStore();
// const DrawerContainer = createAppContainer(Drawer);

export default () => {
    const [themeName, setThemeName] = useState(SettingsManager.getTheme());

    useEffect(() => {
        SettingsManager.on('theme', (newTheme) => {
            setThemeName(newTheme);
        });
    }, []);

    return (
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <Provider store={store} style={style.fonts.default}>
                <AppContextProvider value={{ themeName }}>
                    <PersistGate loading={null} persistor={pStore}>
                        <StatusBar />
                        <Drawer />
                    </PersistGate>
                </AppContextProvider>
            </Provider>
        </View>
    );
};
