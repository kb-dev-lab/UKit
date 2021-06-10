import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';

import FirstWelcomePage from '../pages/WelcomePages/FirstPage'
import SecondWelcomePage from '../pages/WelcomePages/SecondPage'
import ThirdWelcomePage from '../pages/WelcomePages/ThirdPage'
import FourthWelcomePage from '../pages/WelcomePages/FourthPage'

export default () => {
	let [fontsLoaded] = useFonts({
		Montserrat_500Medium,
	});

	const [page, setPage] = useState(1);

	const incrementPage = () => {
		setPage(page + 1);
	};

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		switch (page) {
			case 1:
				return <FirstWelcomePage incrementPage={incrementPage} />;
			case 2:
				return <SecondWelcomePage incrementPage={incrementPage} />;
			case 3:
				return <ThirdWelcomePage incrementPage={incrementPage} />;
			case 4:
				return <FourthWelcomePage />;
			default:
				return <View />;
		}
	}
};
