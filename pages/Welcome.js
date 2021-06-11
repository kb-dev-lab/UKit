import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import axios from 'axios';

import FirstWelcomePage from '../pages/WelcomePages/FirstPage';
import SecondWelcomePage from '../pages/WelcomePages/SecondPage';
import ThirdWelcomePage from '../pages/WelcomePages/ThirdPage';
import FourthWelcomePage from '../pages/WelcomePages/FourthPage';

const fetchGroupList = async () => {
	const response = await axios.get('https://hackjack.info/et/json.php?clean=true');
	return response.data;
};

export default () => {
	let [fontsLoaded] = useFonts({
		Montserrat_500Medium,
	});

	const [page, setPage] = useState(1);
	const [groupList, setGroupList] = useState(null);

	useEffect(() => {
		(async () => {
			data = await fetchGroupList();
			setGroupList(data);
		})();
	}, []);

	const incrementPage = () => {
		setPage(page + 1);
	};

	if (!fontsLoaded || !groupList) {
		return <AppLoading />;
	} else {
		switch (page) {
			case 1:
				return <FirstWelcomePage incrementPage={incrementPage} />;
			case 2:
				return <SecondWelcomePage incrementPage={incrementPage} groupList={groupList} />;
			case 3:
				return <ThirdWelcomePage incrementPage={incrementPage} />;
			case 4:
				return <FourthWelcomePage />;
			default:
				return <View />;
		}
	}
};
