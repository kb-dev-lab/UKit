import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native-appearance';
import * as Calendar from 'expo-calendar';
import moment from 'moment';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import ErrorAlert from '../components/alerts/ErrorAlert';

import FetchManager from './FetchManager';

const TASK_DELAY = 12 * 60 * 60; // 12 hours
const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	await Manager.syncCalendar();

	return BackgroundFetch.Result.NewData;
});

function formatCalendarEventData(event) {
	return {
		title: event.subject,
		startDate: new Date(event.date.start),
		endDate: new Date(event.date.end),
		timeZone: 'Europe/Paris',
		endTimeZone: 'Europe/Paris',
		notes: event.schedule + '\n' + event.description,
	};
}

class SettingsManager {
	constructor() {
		this._calendar = -1;
		this._calendars = [];
		this._firstload = true;
		this._theme = 'light';
		this._groupName = null;
		this._language = 'fr';
		this._openAppOnFavoriteGroup = true;
		this._filters = [];
		this._subscribers = {};
		this._calendarSyncEnabled = false;
		this._isSynchronizingCalendar = false;
		this._lastSyncDate = null;
	}

	on = (event, callback) => {
		if (!this._subscribers[event]) {
			this._subscribers[event] = [];
		}

		this._subscribers[event].push(callback);
	};

	unsubscribe = (event, callback) => {
		if (!this._subscribers[event]?.length) {
			return;
		}

		const index = this._subscribers[event]?.indexOf(callback);

		if (index !== -1) {
			this._subscribers[event].splice(index, 1);
		}
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

	isSynchronizingCalendar = () => {
		return this._isSynchronizingCalendar;
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

	getLastSyncDate = () => {
		return this._lastSyncDate;
	};

	getSyncCalendar = () => {
		return this._calendar;
	};

	setSyncCalendar = (newCalendar) => {
		this._calendar = newCalendar;
		this.notify('calendar', this._calendar);
	};

	syncCalendar = async () => {
		this._isSynchronizingCalendar = true;
		this.notify('isSynchronizingCalendar', true);

		const events = await FetchManager.fetchCalendarForSynchronization(this._groupName);
		let existingCalendarEvents = {};

		try {
			const data = await AsyncStorage.getItem('previousSyncData');

			existingCalendarEvents = JSON.parse(data);

			if (!existingCalendarEvents) {
				existingCalendarEvents = {};
			}
		} catch (e) {
			// Invalid or inexisting data, so consider there's no previous data
			existingCalendarEvents = {};
		}

		const existingInternalCalendarEvents = Object.values(existingCalendarEvents);

		const updatedEvents = [];
		const nextExistingCalendarEvents = {};

		await events.reduce((p, event) => {
			return p.then(async () => {
				const eventToCreate = formatCalendarEventData(event);
				const existingInternalEventId = existingCalendarEvents[String(event.id)];

				if (existingInternalEventId) {
					try {
						await Calendar.updateEventAsync(existingInternalEventId, eventToCreate);

						updatedEvents.push(existingInternalEventId);
						nextExistingCalendarEvents[String(event.id)] = existingInternalEventId;
					} catch (e) {
						// Event is not found, so create event instead
						const id = await Calendar.createEventAsync(this._calendar, eventToCreate);

						nextExistingCalendarEvents[String(event.id)] = id;
					}
				} else {
					const id = await Calendar.createEventAsync(this._calendar, eventToCreate);

					nextExistingCalendarEvents[String(event.id)] = id;
				}
			});
		}, Promise.resolve());

		const internalEventsToDelete = existingInternalCalendarEvents.filter(
			(id) => updatedEvents.indexOf(id) === -1,
		);

		if (internalEventsToDelete.length) {
			await Promise.all(internalEventsToDelete.map((id) => Calendar.deleteEventAsync(id)));
		}

		await AsyncStorage.setItem('previousSyncData', JSON.stringify(nextExistingCalendarEvents));
		await AsyncStorage.setItem('previousSyncTime', String(Date.now()));

		this._lastSyncDate = moment();

		this._isSynchronizingCalendar = false;
		this.notify('isSynchronizingCalendar', false);
	};

	getCalendars = () => {
		return this._calendars;
	};

	getCalendarSyncEnabled = () => {
		return this._calendarSyncEnabled;
	};

	setCalendarSyncEnabled = (state) => {
		this._calendarSyncEnabled = state;
		this.notify('calendarSyncEnabled', state);

		if (state === true) {
			BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
				minimumInterval: 1,
				stopOnTerminate: false,
				startOnBoot: true,
			});
		} else {
			BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
		}
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

	loadCalendars = async () => {
		if ((await Calendar.getCalendarPermissionsAsync()).status === 'granted') {
			this._calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
		}
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
				calendar: this._calendar,
				theme: this._theme,
				groupName: this._groupName,
				language: this._language,
				openAppOnFavoriteGroup: this._openAppOnFavoriteGroup,
				filters: this._filters,
				calendarSyncEnabled: this._calendarSyncEnabled,
			}),
		);
	};

	loadSettings = async () => {
		await this.loadCalendars();

		try {
			const isFirstLoad = JSON.parse(await AsyncStorage.getItem('firstload'));

			if (isFirstLoad === null) {
				this._firstload = true;
			} else {
				this._firstload = isFirstLoad;
			}
		} catch (error) {
			this._firstload = true;
		}

		if (this._firstload) {
			return;
		}

		const lastSyncDateItem = await AsyncStorage.getItem('previousSyncTime');

		if (lastSyncDateItem !== null) {
			this._lastSyncDate = moment(parseInt(lastSyncDateItem, 10));
		}

		try {
			const settings = JSON.parse(await AsyncStorage.getItem('settings'));

			if (settings?.theme) {
				this._theme = settings.theme;
			}
			if (settings?.groupName) {
				this._groupName = settings.groupName;
			}
			if (settings?.openAppOnFavoriteGroup !== null) {
				this._openAppOnFavoriteGroup = settings.openAppOnFavoriteGroup;
			}
			if (settings?.filters) {
				this._filters = [...settings.filters];
			}
			if (settings?.calendar !== undefined) {
				this._calendar = settings?.calendar;
			}
			if (settings?.calendarSyncEnabled) {
				this._calendarSyncEnabled = true;
			}
			if (settings?.language) {
				this.setLanguage(settings.language);
			}
		} catch (error) {
			new ErrorAlert("Settings couldn't be loaded", ErrorAlert.durations.SHORT).show();
		}
	};
}

const Manager = new SettingsManager();

export default Manager;
