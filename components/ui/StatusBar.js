import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { AppContext } from '../../utils/DeviceUtils';

const CustomStatusBar = () => {
	const AppContextValues = useContext(AppContext);
	const theme = AppContextValues.themeName;
	return (
		<StatusBar
			barStyle="light-content"
			backgroundColor={theme === 'light' ? '#006F9F' : '#000000'}
		/>
	);
};

export default CustomStatusBar;
