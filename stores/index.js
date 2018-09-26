import { createStore } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './../reducers';

const config = {
    timeout: 10000,
    key: 'root',
    storage,
};
const reducer = persistCombineReducers(config, rootReducer);

export default () => {
    let store = createStore(reducer);
    let pStore = persistStore(store);
    return { store, pStore };
};
