import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchManager from './FetchManager';

class DataManager {
	constructor() {
		this._groupList = [];
		this._subscribers = {};
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

	saveData = () => {
		AsyncStorage.setItem('groupList', JSON.stringify(this._groupList));
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
		} catch (error) {
			console.warn('COULDNT RETREIVE GROUP LIST...');
		}
	};
}

export default new DataManager();
