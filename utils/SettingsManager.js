import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorAlert from '../components/alerts/ErrorAlert';

class SettingsManager {
	constructor() {
		this._firstload = true;
		this._theme = 'light';
		this._groupName = null;
		this._language = 'fr';
		this._subscribers = {};
	}

	on = (event, callback) => {
		if (!this._subscribers[event]) {
			this._subscribers[event] = [];
		}

		this._subscribers[event].push(callback);
	};

	notify = (event, ...args) => {
		if (!this._subscribers[event]) {
			return;
		}

		this._subscribers[event].forEach((fn) => {
			fn(...args);
		});

		this.saveSettings();
	};

	getTheme = () => {
		return this._theme;
	};

	setTheme = (newTheme) => {
		this._theme = newTheme;
		this.notify('theme', this._theme);
	};

	switchTheme = () => {
		if (this._theme === 'light') {
			this.setTheme('dark');
		} else {
			this.setTheme('light');
		}
	};

	isFirstLoad = () => {
		return this._firstload;
	};

	setFirstLoad = (newState) => {
		this._firstload = newState;
		this.notify('firstload', this._firstload);
	};

	switchFirstLoad = () => {
		this.setFirstLoad(!this.isFirstLoad());
	};

	getGroup = () => {
		console.log('GETTING GROUP: ', this._groupName);
		return this._groupName;
	};

	setGroup = (newGroup) => {
		this._groupName = newGroup;
		this.notify('group', this._groupName);
	};

	getLanguage = () => {
		return this._language;
	};

	setLanguage = (newLang) => {
		this._language = newLang;
		this.notify('language', this._language);
	};

	resetSettings = () => {
		this.setTheme('light');
		this.setLanguage('fr');
		this.setGroup(null);
		this.setFirstLoad(true);
	};

	saveSettings = () => {
		AsyncStorage.setItem('firstload', JSON.stringify(this._firstload));
		AsyncStorage.setItem(
			'settings',
			JSON.stringify({
				theme: this._theme,
				groupName: this._groupName,
				language: this._language,
			}),
		);
		console.log(
			'save settings',
			JSON.stringify({
				theme: this._theme,
				groupName: this._groupName,
				language: this._language,
			}),
		);
	};

	loadSettings = async () => {
		try {
			const isFirstLoad = JSON.parse(await AsyncStorage.getItem('firstload'));

			if (isFirstLoad === null) {
				this._firstload = true;
			} else {
				this._firstload = isFirstLoad;
			}
		} catch (error) {
			const settingsError = new ErrorAlert(
				Translator.get('ERROR_WITH_MESSAGE', "Settings couldn't be loaded"),
				ErrorAlert.durations.SHORT,
			);
			settingsError.show();
		}

		try {
			const settings = JSON.parse(await AsyncStorage.getItem('settings'));

			if (settings?.theme) {
				this._theme = settings.theme;
			}
			if (settings?.groupName) {
				this._groupName = settings.groupName;
			}
			if (settings?.language) {
				this.setLanguage(settings.language);
			}
			console.log('load settings', settings);
		} catch (error) {
			const settingsError = new ErrorAlert(
				Translator.get('ERROR_WITH_MESSAGE', "Settings couldn't be loaded"),
				ErrorAlert.durations.SHORT,
			);
			settingsError.show();
		}
	};
}

export default new SettingsManager();
