import React, { useEffect, useState } from 'react';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SettingsManager from '../utils/SettingsManager';
import DeviceUtils from '../utils/DeviceUtils';

import FirstWelcomePage from '../pages/WelcomePages/FirstPage';
import SecondWelcomePage from '../pages/WelcomePages/SecondPage';
import ThirdWelcomePage from '../pages/WelcomePages/ThirdPage';
import FourthWelcomePage from '../pages/WelcomePages/FourthPage';
import DataManager from '../utils/DataManager';

const Stack = createNativeStackNavigator();

const WelcomeNavigator = ({ changeState, navigatorState }) => {
	return (
		<Stack.Navigator
			initialRouteName="FirstWelcomePage"
			screenOptions={{
				stackAnimation: 'slide_from_right',
				headerShown: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				cardStyle: { opacity: 1 },
			}}>
			<Stack.Screen name="FirstWelcomePage">
				{(props) => (
					<FirstWelcomePage
						{...props}
						changeState={changeState}
						navigatorState={navigatorState}
					/>
				)}
			</Stack.Screen>
			<Stack.Screen name="SecondWelcomePage">
				{(props) => (
					<SecondWelcomePage
						{...props}
						changeState={changeState}
						navigatorState={navigatorState}
					/>
				)}
			</Stack.Screen>

			<Stack.Screen name="ThirdWelcomePage">
				{(props) => (
					<ThirdWelcomePage
						{...props}
						changeState={changeState}
						navigatorState={navigatorState}
					/>
				)}
			</Stack.Screen>
			<Stack.Screen name="FourthWelcomePage">
				{(props) => (
					<FourthWelcomePage
						{...props}
						changeState={changeState}
						navigatorState={navigatorState}
					/>
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
		groupList: DataManager.getGroupList(),
		groupListFiltered: [],
		textFilter: '',
	});

	const changeState = (newState) => {
		setWelcomeSettings((prevState) => ({
			...prevState,
			...newState,
		}));
	};

	useEffect(() => {
		SettingsManager.on('theme', (newTheme) => {
			changeState({ theme: newTheme });
		});
		SettingsManager.on('language', (newLang) => {
			changeState({ language: newLang });
		});
		SettingsManager.on('group', (newGroup) => {
			changeState({ group: newGroup });
		});
		DataManager.on('groupList', (newGroupList) => {
			changeState({ groupList: newGroupList });
		});

		const langSystem = DeviceUtils.languageFromDevice();
		const themeSystem = SettingsManager.getAutomaticTheme();

		SettingsManager.setLanguage(langSystem);
		SettingsManager.setTheme(themeSystem);
	}, []);

	return (
		<NavigationContainer>
			<WelcomeNavigator changeState={changeState} navigatorState={WelcomeSettings} />
		</NavigationContainer>
	);
};
