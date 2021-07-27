import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchManager from './FetchManager';

class DataManager {
	constructor() {
		this._subscribers = {};
		this._toDoList = [
			{
				id: '1',
				text: 'BLABLA',
				selected: false,
			},
			{
				id: '2',
				text:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique eu urna a feugiat. In euismod hendrerit augue, et ultrices lorem molestie nec. Integer nisi felis, posuere non semper viverra, feugiat quis turpis. Maecenas quis volutpat lectus, eget venenatis eros. ',
				selected: true,
			},
			{
				id: '3',
				text: 'BLABLA',
				selected: true,
			},
		];
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

	getToDoList = () => {
		return this._toDoList;
	};

	setToDoList = (newList) => {
		this._toDoList = [...newList];
		this.notify('toDoList', this._toDoList);
	};

	addToDoList = (item) => {
		this._toDoList.push(item);
		this.notify('toDoList', this._toDoList);
	};

	updateToDoList = (item) => {
		for (const i of this._toDoList) {
			if (i.id === item.id) {
				this._toDoList.i = item;
				this.notify('toDoList', this._toDoList);
				break;
			}
		}
	};

	saveData = async () => {
		await AsyncStorage.setItem('groupList', JSON.stringify(this._groupList));
		await AsyncStorage.setItem('toDoList', JSON.stringify(this._toDoList));
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

			const toDoList = JSON.parse(await AsyncStorage.getItem('toDoList'));
			if (toDoList) {
				this.setToDoList(toDoList);
			}
		} catch (error) {
			console.warn('COULDNT RETREIVE GROUP LIST...');
		}
	};
}

export default new DataManager();
