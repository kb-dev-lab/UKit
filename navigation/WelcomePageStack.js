import React, { useEffect, useState } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

import SettingsManager from '../utils/SettingsManager';
import DeviceUtils from '../utils/DeviceUtils';

import FirstWelcomePage from '../pages/WelcomePages/FirstPage';
import SecondWelcomePage from '../pages/WelcomePages/SecondPage';
import ThirdWelcomePage from '../pages/WelcomePages/ThirdPage';
import FourthWelcomePage from '../pages/WelcomePages/FourthPage';

const fetchGroupList = async () => {
	const response = await axios.get('https://hackjack.info/et/json.php?clean=true');
	return response.data;
};

const Stack = createStackNavigator();

const WelcomeNavigator = ({ changeState, getState }) => {
	return (
		<Stack.Navigator initialRouteName="FirstWelcomePage" headerMode="none" screenOptions={{gestureEnabled: false}}>
			<Stack.Screen
				name="FirstWelcomePage"
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}>
				{(props) => (
					<FirstWelcomePage {...props} changeState={changeState} getState={getState} />
				)}
			</Stack.Screen>
			<Stack.Screen
				name="SecondWelcomePage"
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}>
				{(props) => (
					<SecondWelcomePage {...props} changeState={changeState} getState={getState} />
				)}
			</Stack.Screen>

			<Stack.Screen
				name="ThirdWelcomePage"
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}>
				{(props) => (
					<ThirdWelcomePage {...props} changeState={changeState} getState={getState} />
				)}
			</Stack.Screen>
			<Stack.Screen
				name="FourthWelcomePage"
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}>
				{(props) => (
					<FourthWelcomePage {...props} changeState={changeState} getState={getState} />
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default () => {
	let [selectedLanguage, selectLanguage] = useState(null);
	let [selectedTheme, selectTheme] = useState('light');
	let [selectedYear, selectYear] = useState(null);
	let [selectedSeason, selectSeason] = useState(null);
	let [selectedGroup, selectGroup] = useState(null);
	let [groupList, setGroupList] = useState([]);
	let [groupListFiltered, setGroupListFiltered] = useState([]);
	let [textFilter, setTextFilter] = useState('');

	const changeState = (param, value) => {
		switch (param) {
			case 'lang':
				selectLanguage(value);
				break;
			case 'theme':
				selectTheme(value);
				break;
			case 'year':
				selectYear(value);
				break;
			case 'season':
				selectSeason(value);
				break;
			case 'group':
				selectGroup(value);
				break;
			case 'groupList':
				setGroupList(value);
				break;
			case 'groupListFiltered':
				setGroupListFiltered(value);
				break;
			case 'textFilter':
				setTextFilter(value);
				break;
			default:
				break;
		}
	};

	const getState = (param) => {
		switch (param) {
			case 'lang':
				return selectedLanguage;
			case 'theme':
				return selectedTheme;
			case 'year':
				return selectedYear;
			case 'season':
				return selectedSeason;
			case 'group':
				return selectedGroup;
			case 'groupList':
				return groupList;
			case 'groupListFiltered':
				return groupListFiltered;
			case 'textFilter':
				return textFilter;
			default:
				break;
		}
	};

	useEffect(() => {
		const langSystem = DeviceUtils.languageFromDevice();
		const themeSystem = SettingsManager.getAutomaticTheme();

		SettingsManager.setLanguage(langSystem);
		SettingsManager.setTheme(themeSystem);

		changeState('lang', langSystem);
		changeState('theme', themeSystem);

		(async () => {
			const groupList = await fetchGroupList();
			changeState('groupList', Array.from(new Set(groupList.map((e) => e.name))));
		})();
	}, []);

	return (
		<NavigationContainer>
			<WelcomeNavigator changeState={changeState} getState={getState} />
		</NavigationContainer>
	);
};
