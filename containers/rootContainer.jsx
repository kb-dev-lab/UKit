import React, { useEffect, useState } from 'react';
import { AppState, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';

import StatusBar from '../components/ui/StatusBar';
import Drawer from '../navigation/Drawer';
import { AppContextProvider } from '../utils/DeviceUtils';
import SettingsManager from '../utils/SettingsManager';
import Welcome from '../navigation/WelcomePageStack';
import Style from '../Style';

// See : https://github.com/react-navigation/react-navigation/issues/5568
// if (Platform.OS === 'android') {
//     SafeAreaView.setStatusBarHeight(0);
// }

export default () => {
	const [isFirstLoad, setFirstLoad] = useState(SettingsManager.isFirstLoad());
	const [themeName, setThemeName] = useState(SettingsManager.getTheme());
	const [groupName, setGroupName] = useState(SettingsManager.getGroup());
	const [language, setLanguage] = useState(SettingsManager.getLanguage());
	const [filters, setFilters] = useState(SettingsManager.getFilters());

	function reloadData() {
		SettingsManager.loadCalendars();
	}

	useEffect(() => {
		SettingsManager.on('theme', (newTheme) => {
			setThemeName(newTheme);
		});
		SettingsManager.on('group', (newGroup) => {
			setGroupName(newGroup);
		});
		SettingsManager.on('firstload', (newFistLoad) => {
			setFirstLoad(newFistLoad);
		});
		SettingsManager.on('language', (newLang) => {
			setLanguage(newLang);
		});
		SettingsManager.on('filter', (newFilter) => {
			setFilters(newFilter);
		});

		AppState.addEventListener('change', reloadData);

		return () => AppState.removeEventListener('change', reloadData);
	}, []);

	const theme = Style.Theme[themeName];

	return (
		<RootSiblingParent>
			<SafeAreaProvider>
				<View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
					<AppContextProvider value={{ themeName, groupName, filters }}>
						<StatusBar />
						{isFirstLoad ? <Welcome /> : <Drawer background={theme.background} />}
					</AppContextProvider>
				</View>
			</SafeAreaProvider>
		</RootSiblingParent>
	);
};
