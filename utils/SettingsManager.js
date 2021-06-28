import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native-appearance';
import ErrorAlert from '../components/alerts/ErrorAlert';

class SettingsManager {
	constructor() {
		this._firstload = true;
		this._theme = 'light';
		this._groupName = null;
		this._language = 'fr';
		this._openAppOnFavoriteGroup = true;
		this._filters = [];
		this._subscribers = {};
	}

	on = (event, callback) => {
		if (!this._subscribers[event]) {
			this._subscribers[event] = [];
		}

		this._subscribers[event].push(callback);
	};

	notify = (event, ...args) => {
		this.saveSettings();
		if (!this._subscribers[event] || !args) {
			return;
		}

		this._subscribers[event]
			.filter((e) => e !== null)
			.forEach((fn) => {
				fn(...args);
			});
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

	setAutomaticTheme = () => {
		if (Appearance.getColorScheme() === 'dark') this.setTheme('dark');
		else return 'light';
	};

	getAutomaticTheme = () => {
		if (Appearance.getColorScheme() === 'dark') return 'dark';
		else return 'light';
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

	getOpenAppOnFavoriteGroup = () => {
		return this._openAppOnFavoriteGroup;
	};

	setOpenAppOnFavoriteGroup = (newOpenAppBool) => {
		this._openAppOnFavoriteGroup = newOpenAppBool;
		this.saveSettings();
	};

	getFilters = () => {
		return this._filters;
	};

	resetFilter = () => {
		this._filters = [];
		this.notify('filter', this._filters);
	};

	addFilters = (filter) => {
		if (filter && !this._filters.includes(filter)) {
			this._filters.push(filter);
		}
		this.notify('filter', this._filters);
	};

	removeFilters = (filter) => {
		if (filter) {
			const index = this._filters.indexOf(filter);
			if (index > -1) {
				const newFilterList = this._filters.filter((e) => e !== filter);
				this._filters = [...newFilterList];
			}
		}
		this.notify('filter', this._filters);
	};

	resetSettings = () => {
		this.setTheme('light');
		this.setLanguage('fr');
		this.setGroup(null);
		this.setOpenAppOnFavoriteGroup(true);
		this.resetFilter();
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
				openAppOnFavoriteGroup: this._openAppOnFavoriteGroup,
				filters: this._filters,
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
			this._openAppOnFavoriteGroup = settings.openAppOnFavoriteGroup;
			if (settings?.filters) {
				this._filters = [...settings.filters];
			}
			if (settings?.language) {
				this.setLanguage(settings.language);
			}
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
