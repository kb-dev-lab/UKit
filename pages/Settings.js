import React from 'react';
import { AppContext } from '../utils/DeviceUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

import SettingsSwitchButton from '../components/ui/settings/SettingsSwitchButton';
import SettingsTextHeader from '../components/ui/settings/SettingsTextHeader';
import SettingsDefaultButton from '../components/ui/settings/SettingsDefaultButton';
import SettingsLanguagePopup from '../components/ui/settings/modals/SettingsLanguagePopup';
import SettingsFiltersPopup from '../components/ui/settings/modals/SettingsFiltersPopup';
import SettingsResetPopup from '../components/ui/settings/modals/SettingsResetPopup';

import style from '../Style';
import SettingsManager from '../utils/SettingsManager';
import Translator from '../utils/translator';

const LANGUAGE_LIST = {
	fr: 'FRENCH',
	en: 'ENGLISH',
};

class Settings extends React.Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);

		this.state = {
			openFavSwitchValue: SettingsManager.getOpenAppOnFavoriteGroup(),
			language: SettingsManager.getLanguage(),
			languageDialogVisible: false,
			filtersDialogVisible: false,
			resetDialogVisible: false,
			filterList: SettingsManager.getFilters(),
			filterTextInput: null,
		};

		SettingsManager.on('filter', () => {
			this.refreshFiltersList();
		});
	}

	setSelectedLanguage = (newLang) => {
		this.setState({ language: newLang });
		SettingsManager.setLanguage(newLang);
	};

	setLanguageToFrench = () => {
		if (this.state.language !== 'fr') this.setSelectedLanguage('fr');
	};

	setLanguageToEnglish = () => {
		if (this.state.language !== 'en') this.setSelectedLanguage('en');
	};

	refreshFiltersList = () => {
		this.setState({ filterList: SettingsManager.getFilters() });
	};

	addFilters = (filter) => {
		SettingsManager.addFilters(filter.toUpperCase());
	};

	toggleOpenFavSwitchValue = () => {
		this.setState({ openFavSwitchValue: !this.state.openFavSwitchValue }, () => {
			SettingsManager.setOpenAppOnFavoriteGroup(this.state.openFavSwitchValue);
		});
	};

	setFilterTextInput = (input) => {
		this.setState({ filterTextInput: input.toUpperCase() });
	};

	submitFilterTextInput = () => {
		if (this.state.filterTextInput) this.addFilters(this.state.filterTextInput);
	};

	openLanguageDialog = () => {
		this.setState({ languageDialogVisible: true });
	};

	closeLanguageDialog = () => {
		this.setState({ languageDialogVisible: false });
	};

	openFiltersDialog = () => {
		this.setState({ filtersDialogVisible: true });
	};

	closeFiltersDialog = () => {
		this.setState({ filtersDialogVisible: false });
	};

	openResetDialog = () => {
		this.setState({ resetDialogVisible: true });
	};

	closeResetDialog = () => {
		this.setState({ resetDialogVisible: false });
	};

	resetApp = () => {
		this.closeResetDialog();
		SettingsManager.resetSettings();
	};

	render() {
		const themeName = this.context.themeName;
		const theme = style.Theme[themeName].settings;

		return (
			<SafeAreaView style={theme.background}>
				<SettingsTextHeader theme={theme} text={Translator.get('DISPLAY')} />
				<SettingsDefaultButton
					theme={theme}
					onPress={this.openLanguageDialog}
					leftIcon="language"
					leftText={Translator.get('LANGUAGE')}
					rightText={Translator.get(LANGUAGE_LIST[this.state.language])}
				/>
				<SettingsDefaultButton
					theme={theme}
					onPress={this.openFiltersDialog}
					leftIcon="filter-list"
					leftText={Translator.get('FILTERS')}
					rightText="..."
				/>
				<View style={{ marginTop: 20 }}></View>
				<SettingsTextHeader theme={theme} text={Translator.get('APP_LAUNCHING')} />
				<SettingsSwitchButton
					theme={theme}
					leftIcon="star"
					leftText={Translator.get('OPEN_ON_FAVOURITE_GROUP')}
					switchOnValueChange={this.toggleOpenFavSwitchValue}
					switchValue={this.state.openFavSwitchValue}
				/>
				<SettingsDefaultButton
					theme={theme}
					onPress={this.openResetDialog}
					leftIcon="autorenew"
					leftText={Translator.get('RESET_APP')}
				/>

				<SettingsLanguagePopup
					theme={theme}
					popupVisible={this.state.languageDialogVisible}
					popupClose={this.closeLanguageDialog}
					language={this.state.language}
					setLanguageToFrench={this.setLanguageToFrench}
					setLanguageToEnglish={this.setLanguageToEnglish}
				/>

				<SettingsFiltersPopup
					theme={theme}
					popupVisible={this.state.filtersDialogVisible}
					popupClose={this.closeFiltersDialog}
					filterList={this.state.filterList}
					filterTextInput={this.state.filterTextInput}
					setFilterTextInput={this.setFilterTextInput}
					submitFilterTextInput={this.submitFilterTextInput}
				/>

				<SettingsResetPopup
					theme={theme}
					popupVisible={this.state.resetDialogVisible}
					popupClose={this.closeResetDialog}
					resetApp={this.resetApp}
				/>
			</SafeAreaView>
		);
	}
}

export default Settings;
