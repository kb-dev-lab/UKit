import React from 'react';
import { StatusBar } from 'react-native';
import { AppContext } from '../../utils/DeviceUtils';
import SettingsManager from '../../utils/SettingsManager';

class CustomStatusBar extends React.PureComponent {
	render() {
		return (
			<AppContext.Consumer>
				{() => (
					<StatusBar barStyle="light-content" backgroundColor={SettingsManager.getTheme() === 'light' ? '#006F9F' : '#000000' } />
				)}
			</AppContext.Consumer>
		);
	}
}

export default CustomStatusBar;
