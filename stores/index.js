import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { createStore } from 'redux';

import rootReducer from './../reducers';

const config = {
    key: 'root',
    storage,
    debug: true,
};
const reducer = persistCombineReducers(config, rootReducer);

export default function configureStore() {
    let store = createStore(reducer);
    let pStore = persistStore(store, null, () => {
        store.getState();
    });
    return { pStore, store };
}
