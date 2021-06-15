import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SettingsManager from '../utils/SettingsManager';
import DeviceUtils from '../utils/DeviceUtils';

import FirstWelcomePage from '../pages/WelcomePages/FirstPage';
import SecondWelcomePage from '../pages/WelcomePages/SecondPage';
import ThirdWelcomePage from '../pages/WelcomePages/ThirdPage';
import FourthWelcomePage from '../pages/WelcomePages/FourthPage';

const Stack = createStackNavigator();

const WelcomeNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="FirstWelcomePage" headerMode="none">
			<Stack.Screen
				name="FirstWelcomePage"
				component={FirstWelcomePage}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="SecondWelcomePage"
				component={SecondWelcomePage}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="ThirdWelcomePage"
				component={ThirdWelcomePage}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="FourthWelcomePage"
				component={FourthWelcomePage}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
		</Stack.Navigator>
	);
};

export default () => {
	let [fontsLoaded] = useFonts({
		Montserrat_500Medium,
	});

	useEffect(() => {
		if (DeviceUtils.deviceLanguage() === 'fr_FR') {
			SettingsManager.setLanguage('fr');
		} else {
			SettingsManager.setLanguage('en');
		}
		SettingsManager.automaticTheme();
	}, []);

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<NavigationContainer>
				<WelcomeNavigator />
			</NavigationContainer>
		);
	}
};
