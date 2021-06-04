import AsyncStorage from '@react-native-async-storage/async-storage'

class SettingsManager {
    constructor() {
        this._theme = 'light';
        this._firstload = true;
        this._subscribers = {};
    }

    on = (event, callback) => {
        if (!this._subscribers[event]) {
            this._subscribers[event] = [];
        }

        this._subscribers[event].push(callback);
    }

    notify = (event, ...args) => {
        if (!this._subscribers[event]) {
            return;
        }

        this._subscribers[event].forEach(fn => {
            fn(...args);
        });

        this.saveSettings();
    }

    getTheme = () => {
        return this._theme;
    }

    setTheme = (newTheme) => {
        this._theme = newTheme;
        this.notify('theme', this._theme);
    }

    switchTheme = () => {
        if (this._theme === 'light') {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }

    isFirstLoad = () => {
        return this._firstload;
    }

    setFirstLoad = (newState) => {
        this._firstload = newState;
        this.notify('firstload', this._firstload);
    }

    switchFirstLoad = () => {
        this.setFirstLoad(!this.isFirstLoad());
    }

    saveSettings = () => {
        AsyncStorage.setItem('firstload', JSON.stringify(this._firstload));
        AsyncStorage.setItem('settings', JSON.stringify({
            theme: this._theme,
        }));
    }

    loadSettings = async () => {
        try {
            const isFirstLoad = JSON.parse(await AsyncStorage.getItem('firstload'));

            if (!isFirstLoad) {
                this._firstload = true;
            }
        } catch (error) {
            // TODO: add error notification when firstload can't be recoverd
        }

        try {
            const settings = JSON.parse(await AsyncStorage.getItem('settings'));

            if (settings?.theme) {
                this._theme = settings.theme;
            }
        } catch (error) {
            // TODO: add error notification when settings can't be recoverd
        }
    }

}

export default new SettingsManager();
