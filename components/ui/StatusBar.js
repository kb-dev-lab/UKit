import React from 'react';
import { StatusBar } from 'react-native';
import SettingsManager from '../../utils/SettingsManager';

class CustomStatusBar extends React.PureComponent {
	render() {
		return (
			<StatusBar
				barStyle="light-content"
				backgroundColor={SettingsManager.getTheme() === 'light' ? '#006F9F' : '#000000'}
			/>
		);
	}
}

export default CustomStatusBar;
