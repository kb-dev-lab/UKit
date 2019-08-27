import React from 'react';
import { Provider } from 'react-redux';
import { Platform, View } from 'react-native';
import { SafeAreaView, createAppContainer } from 'react-navigation';
import { PersistGate } from 'redux-persist/es/integration/react';

import StatusBar from '../components/ui/StatusBar';
import Drawer from '../navigation/Drawer';
import style from '../Style';
import configureStore from '../stores';

// See : https://github.com/react-navigation/react-navigation/issues/5568
if (Platform.OS === 'android') {
    SafeAreaView.setStatusBarHeight(0);
}

const { store, pStore } = configureStore();
const DrawerContainer = createAppContainer(Drawer);

export default () => (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <Provider store={store} style={style.fonts.default}>
            <PersistGate loading={null} persistor={pStore}>
                <StatusBar />
                <DrawerContainer />
            </PersistGate>
        </Provider>
    </View>
);
