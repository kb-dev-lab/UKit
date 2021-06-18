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
		<Stack.Navigator
			initialRouteName="FirstWelcomePage"
			headerMode="none"
			screenOptions={{
				gestureEnabled: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}>
			<Stack.Screen name="FirstWelcomePage">
				{(props) => (
					<FirstWelcomePage {...props} changeState={changeState} getState={getState} />
				)}
			</Stack.Screen>
			<Stack.Screen name="SecondWelcomePage">
				{(props) => (
					<SecondWelcomePage {...props} changeState={changeState} getState={getState} />
				)}
			</Stack.Screen>

			<Stack.Screen name="ThirdWelcomePage">
				{(props) => (
					<ThirdWelcomePage {...props} changeState={changeState} getState={getState} />
				)}
			</Stack.Screen>
			<Stack.Screen name="FourthWelcomePage">
				{(props) => (
					<FourthWelcomePage {...props} changeState={changeState} getState={getState} />
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default () => {

	const [WelcomeSettings, setWelcomeSettings] = useState({
		language: 'fr',
		theme: 'light',
		year: null,
		season: null,
		group: null,
		groupList: [],
		groupListFiltered: [],
		textFilter: '',
	});

	const getState = (param) => {
		return WelcomeSettings[param];
	};

	const changeState = (newState) => {
		setWelcomeSettings(prevState => ({
			...prevState,
			...newState,
		})); 
	};

	useEffect(() => {
		const langSystem = DeviceUtils.languageFromDevice();
		const themeSystem = SettingsManager.getAutomaticTheme();

		SettingsManager.setLanguage(langSystem);
		SettingsManager.setTheme(themeSystem);

		changeState({'language': langSystem});
		changeState({'theme': themeSystem});

		const fetch = async () => {
			const groupList = await fetchGroupList();
			changeState({'groupList': Array.from(new Set(groupList.map((e) => e.name)))});
		};

		fetch();
	}, []);

	return (
		<NavigationContainer>
			<WelcomeNavigator changeState={changeState} getState={getState} />
		</NavigationContainer>
	);
};
