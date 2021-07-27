import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchManager from './FetchManager';

class DataManager {
	constructor() {
		this._subscribers = {};
		this._notesList = [];
		this._groupList = [];
		// refresh group list cache every week
		this._cacheTimeLimit = 7 * 24 * 60 * 60 * 1000;
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
		this.saveData();
	};

	getGroupList = () => {
		return this._groupList;
	};

	setGroupList = (newList) => {
		this._groupList = [...newList];
		this.notify('groupList', this._groupList);
	};

	fetchGroupList = async () => {
		const groupList = await FetchManager.fetchGroupList();
		await AsyncStorage.setItem('groupListTimestamp', String(Date.now()));
		this.setGroupList(groupList);
	};

	getNotesList = () => {
		return this._notesList;
	};

	setNotesList = (newList) => {
		this._notesList = [...newList];
		this.notify('notesList', this._notesList);
	};

	addNotesList = (item) => {
		this._notesList.push(item);
		this.notify('notesList', this._notesList);
	};

	updateNotesList = (item) => {
		for (const i of this._notesList) {
			if (i.id === item.id) {
				this._notesList.i = item;
				this.notify('notesList', this._notesList);
				break;
			}
		}
	};

	removeNotesList = (item) => {
		this.setNotesList(this._notesList.filter((element) => element.id !== item.id));
	};

	saveData = async () => {
		await AsyncStorage.setItem('groupList', JSON.stringify(this._groupList));
		await AsyncStorage.setItem('notesList', JSON.stringify(this._notesList));
	};

	loadData = async () => {
		try {
			const groupList = JSON.parse(await AsyncStorage.getItem('groupList'));
			const timestamp = await AsyncStorage.getItem('groupListTimestamp');
			const difference = Date.now() - parseInt(timestamp);

			if (groupList && difference < this._cacheTimeLimit) {
				this.setGroupList(groupList);
			} else {
				await this.fetchGroupList();
			}

			const notesList = JSON.parse(await AsyncStorage.getItem('notesList'));
			if (notesList) {
				this.setNotesList(notesList);
			}
		} catch (error) {
			console.warn('COULDNT RETREIVE DATA...');
		}
	};
}

export default new DataManager();
