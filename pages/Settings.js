import React from 'react';
import { AppContext } from '../utils/DeviceUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking, ScrollView, Text, View } from 'react-native';
import * as Calendar from 'expo-calendar';

import SettingsSwitchButton from '../components/ui/settings/SettingsSwitchButton';
import SettingsTextHeader from '../components/ui/settings/SettingsTextHeader';
import SettingsDefaultButton from '../components/ui/settings/SettingsDefaultButton';
import SettingsLanguagePopup from '../components/ui/settings/modals/SettingsLanguagePopup';
import SettingsFiltersPopup from '../components/ui/settings/modals/SettingsFiltersPopup';
import SettingsResetPopup from '../components/ui/settings/modals/SettingsResetPopup';

import style from '../Style';
import SettingsManager from '../utils/SettingsManager';
import Translator from '../utils/translator';
import SettingsCalendarPopup from '../components/ui/settings/modals/SettingsCalendarPopup';

const LANGUAGE_LIST = {
	fr: 'FRENCH',
	en: 'ENGLISH',
	es: 'SPANISH',
};

class Settings extends React.Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);

		this.state = {
			calendarDialogVisible: false,
			calendarSyncEnabled: SettingsManager.getCalendarSyncEnabled(),
			calendars: SettingsManager.getCalendars(),
			filterList: SettingsManager.getFilters(),
			filterTextInput: null,
			filtersDialogVisible: false,
			hasCalendarPermission: false,
			isSynchronizingCalendar: SettingsManager.isSynchronizingCalendar(),
			language: SettingsManager.getLanguage(),
			languageDialogVisible: false,
			openFavSwitchValue: SettingsManager.getOpenAppOnFavoriteGroup(),
			resetDialogVisible: false,
			selectedCalendar: SettingsManager.getSyncCalendar(),
		};

		SettingsManager.on('filter', () => {
			this.refreshFiltersList();
		});
	}

	setCalendar = (calendar) => {
		if (calendar === 'UKit') {
			this.setState({ selectedCalendar: calendar });
			SettingsManager.setSyncCalendar(calendar);
		} else {
			this.setState({ selectedCalendar: calendar.id });
			SettingsManager.setSyncCalendar(calendar.id);
		}
	};

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

	setLanguageToSpanish = () => {
		if (this.state.language !== 'es') this.setSelectedLanguage('es');
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

	toggleCalendarSync = async () => {
		if ((await Calendar.getCalendarPermissionsAsync()).status !== 'granted') {
			const { status } = await Calendar.requestCalendarPermissionsAsync();

			if (status !== 'granted') {
				return;
			}
		}

		if (!this.state.calendars.length) {
			await SettingsManager.loadCalendars();
		}

		this.setState(
			{
				calendarSyncEnabled: !this.state.calendarSyncEnabled,
				calendars: SettingsManager.getCalendars(),
			},
			() => {
				SettingsManager.setCalendarSyncEnabled(this.state.calendarSyncEnabled);
			},
		);
	};

	openSystemAppSettings = () => {
		Linking.openSettings();
	};

	setIsSynchronizingCalendar = (newState) => {
		this.setState({
			isSynchronizingCalendar: newState,
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

	openCalendarDialog = () => {
		this.setState({ calendarDialogVisible: true });
	};

	closeCalendarDialog = () => {
		this.setState({ calendarDialogVisible: false });
	};

	resetApp = () => {
		this.closeResetDialog();
		SettingsManager.resetSettings();
	};

	componentDidMount = async () => {
		if ((await Calendar.getCalendarPermissionsAsync()).status === 'granted') {
			this.setState({
				hasCalendarPermission: true,
			});
		} else {
			this.toggleCalendarSync();
		}

		SettingsManager.on('isSynchronizingCalendar', this.setIsSynchronizingCalendar);
	};

	componentWillUnmount = () => {
		SettingsManager.unsubscribe('isSynchronizingCalendar', this.setIsSynchronizingCalendar);
	};

	render() {
		const themeName = this.context.themeName;
		const theme = style.Theme[themeName].settings;
		const calendar = this.state.calendars.find((cal) => this.state.selectedCalendar === cal.id);
		const calendarName = !!calendar
			? calendar.title
			: this.state.selectedCalendar === 'UKit'
			? 'UKit'
			: Translator.get('NOT_FOUND');
		const lastSyncDate = SettingsManager.getLastSyncDate();

		return (
			<SafeAreaView style={theme.background}>
				<ScrollView>
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

					<View style={{ marginTop: 20 }}></View>
					<SettingsTextHeader
						theme={theme}
						text={`[BETA] ${Translator.get('CALENDAR_SYNCHRONIZATION')}`}
					/>

					{this.state.hasCalendarPermission ? (
						<>
							<Text style={[theme.popup.textDescription, { marginHorizontal: 16 }]}>
								{Translator.get('AUTO_SYNC_DESCRIPTION')}
							</Text>

							<Text style={[theme.popup.textDescription, { marginHorizontal: 16 }]}>
								{lastSyncDate
									? `${Translator.get(
											'LAST_SYNCHRONIZATION',
									  )} : ${lastSyncDate.format('LLL')}`
									: Translator.get('NO_SYNCHRONIZATION_DONE')}
							</Text>

							<SettingsSwitchButton
								theme={theme}
								leftIcon="sync-disabled"
								leftText={Translator.get('SYNC_ENABLED')}
								switchOnValueChange={this.toggleCalendarSync}
								switchValue={this.state.calendarSyncEnabled}
							/>

							<SettingsDefaultButton
								theme={theme}
								onPress={this.openCalendarDialog}
								leftIcon="calendar-today"
								leftText={Translator.get('CALENDAR')}
								rightText={calendarName}
							/>

							<SettingsDefaultButton
								theme={theme}
								onPress={SettingsManager.syncCalendar}
								disabled={
									this.state.selectedCalendar !== -1 &&
									this.state.isSynchronizingCalendar
								}
								leftIconAnimation={
									this.state.isSynchronizingCalendar ? 'rotate' : ''
								}
								leftIcon="sync"
								leftText={
									this.state.isSynchronizingCalendar
										? Translator.get('SYNCHRONIZING')
										: Translator.get('FORCE_SYNC')
								}
							/>
						</>
					) : (
						<>
							<Text style={[theme.popup.textDescription, { marginHorizontal: 16 }]}>
								{Translator.get('ENABLE_CALENDAR_PERMISSION_DESCRIPTION')}
							</Text>
							<SettingsDefaultButton
								theme={theme}
								onPress={this.openSystemAppSettings}
								leftIcon="settings"
								leftText={Translator.get('OPEN_SYSTEM_SETTINGS')}
							/>
						</>
					)}

					<View style={{ marginTop: 16 }}></View>

					<SettingsLanguagePopup
						theme={theme}
						popupVisible={this.state.languageDialogVisible}
						popupClose={this.closeLanguageDialog}
						language={this.state.language}
						setLanguageToFrench={this.setLanguageToFrench}
						setLanguageToEnglish={this.setLanguageToEnglish}
						setLanguageToSpanish={this.setLanguageToSpanish}
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

					<SettingsCalendarPopup
						theme={theme}
						popupVisible={this.state.calendarDialogVisible}
						popupClose={this.closeCalendarDialog}
						setCalendar={this.setCalendar}
						selectedCalendar={this.state.selectedCalendar}
					/>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default Settings;
