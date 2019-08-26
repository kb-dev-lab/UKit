import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { PersistGate } from 'redux-persist/es/integration/react';

import StatusBar from '../components/ui/StatusBar';
import Drawer from '../navigation/Drawer';
import style from '../Style';
import configureStore from '../stores';

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
