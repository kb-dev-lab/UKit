import React from 'react';
import { AppContext } from '../utils/DeviceUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	Text,
	TouchableOpacity,
	View,
	Switch,
	Modal,
	FlatList,
	TextInput,
	Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

	removeFilters = (filter) => {
		SettingsManager.removeFilters(filter);
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

	renderFilterItem = ({ item }) => {
		return (
			<TouchableOpacity
				key={item}
				onLongPress={() => this.removeFilters(item)}
				style={{
					backgroundColor: '#EAEAEC',
					padding: 8,
					borderRadius: 16,
					margin: 8,
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<Text
					style={{
						fontSize: 18,
						fontWeight: 'bold',
						color: '#4C5464',
					}}>
					{item}
				</Text>
				<MaterialIcons name="close" size={22} color="#4C546455" />
			</TouchableOpacity>
		);
	};

	render() {
		const themeName = this.context.themeName;
		const theme = style.Theme[themeName].settings;

		return (
			<SafeAreaView style={theme.background}>
				<Text style={theme.separationText}>{Translator.get('DISPLAY').toUpperCase()}</Text>

				<TouchableOpacity style={theme.button} onPress={this.openLanguageDialog}>
					<MaterialIcons name="language" size={24} style={theme.leftIcon} />
					<Text style={theme.buttonMainText}>{Translator.get('LANGUAGE')}</Text>
					<Text style={theme.buttonSecondaryText}>
						{Translator.get(LANGUAGE_LIST[this.state.language])}
					</Text>
					<MaterialIcons name="keyboard-arrow-right" size={24} style={theme.rightIcon} />
				</TouchableOpacity>

				<TouchableOpacity style={theme.button} onPress={this.openFiltersDialog}>
					<MaterialIcons name="filter-list" size={24} style={theme.leftIcon} />
					<Text style={theme.buttonMainText}>{Translator.get('FILTERS')}</Text>
					<Text style={theme.buttonSecondaryText}>...</Text>
					<MaterialIcons name="keyboard-arrow-right" size={24} style={theme.rightIcon} />
				</TouchableOpacity>

				<View style={{ marginTop: 20 }}></View>

				<Text style={theme.separationText}>
					{Translator.get('APP_LAUNCHING').toUpperCase()}
				</Text>

				<TouchableOpacity
					onPress={this.toggleOpenFavSwitchValue}
					style={theme.button}
					disabled={false}>
					<MaterialIcons name="star" size={24} style={theme.leftIcon} />
					<Text style={theme.buttonMainText}>
						{Translator.get('OPEN_ON_FAVOURITE_GROUP')}
					</Text>
					<Switch
						onValueChange={this.toggleOpenFavSwitchValue}
						value={this.state.openFavSwitchValue}
						style={{
							alignSelf: 'center',
							marginLeft: 'auto',
							marginRight: 8,
						}}
						trackColor={theme.switchTrackColor}
						ios_backgroundColor="#FFFFFF"
						thumbColor={
							this.state.openFavSwitchValue
								? theme.switchThumbColor.true
								: theme.switchThumbColor.false
						}
					/>
				</TouchableOpacity>

				<TouchableOpacity style={theme.button} onPress={this.openResetDialog}>
					<MaterialCommunityIcons name="restart" size={24} style={theme.leftIcon} />
					<Text style={theme.buttonMainText}>{Translator.get('RESET_APP')}</Text>
					<MaterialIcons
						name="keyboard-arrow-right"
						size={24}
						style={[theme.rightIcon, { marginLeft: 'auto' }]}
					/>
				</TouchableOpacity>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.languageDialogVisible}
					onRequestClose={this.closeLanguageDialog}>
					<View style={theme.popup.background}>
						<View style={theme.popup.container}>
							<View style={theme.popup.header}>
								<Text style={theme.popup.textHeader}>
									{Translator.get('LANGUAGE').toUpperCase()}
								</Text>
								<TouchableOpacity onPress={this.closeLanguageDialog}>
									<MaterialIcons
										name="close"
										size={32}
										style={theme.popup.closeIcon}
									/>
								</TouchableOpacity>
							</View>

							<Text style={theme.popup.textDescription}>
								{Translator.get('YOUR_LANGUAGE')}
							</Text>

							<View style={{ marginVertical: 8 }}>
								<TouchableOpacity
									onPress={this.setLanguageToFrench}
									style={theme.popup.radioContainer}>
									<MaterialIcons
										name={
											this.state.language === 'fr'
												? 'radio-button-on'
												: 'radio-button-off'
										}
										size={24}
										color={theme.popup.radioIconColor}
									/>
									<Text style={theme.popup.radioText}>
										{Translator.get('FRENCH')}
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={this.setLanguageToEnglish}
									style={theme.popup.radioContainer}>
									<MaterialIcons
										name={
											this.state.language === 'en'
												? 'radio-button-on'
												: 'radio-button-off'
										}
										size={24}
										color={theme.popup.radioIconColor}
									/>
									<Text style={theme.popup.radioText}>
										{Translator.get('ENGLISH')}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.filtersDialogVisible}
					onRequestClose={this.closeFiltersDialog}>
					<View style={theme.popup.background}>
						<View style={theme.popup.container}>
							<View style={theme.popup.header}>
								<Text style={theme.popup.textHeader}>
									{Translator.get('FILTERS').toUpperCase()}
								</Text>
								<TouchableOpacity onPress={this.closeFiltersDialog}>
									<MaterialIcons
										name="close"
										size={32}
										style={theme.popup.closeIcon}
									/>
								</TouchableOpacity>
							</View>

							<Text style={theme.popup.textDescription}>
								Maintenez une UE pour le supprimer de la liste des filters
							</Text>
							<View style={theme.popup.filterListContainer}>
								<FlatList
									keyExtractor={(item) => item}
									data={SettingsManager.getFilters()}
									renderItem={this.renderFilterItem}
									extraData={SettingsManager.getFilters()}
									// numColumns={2}
									horizontal={true}
									ListEmptyComponent={
										<Text style={theme.popup.textDescription}>
											Aucun filtre actuellement
										</Text>
									}
								/>
							</View>
							<Text style={theme.popup.textDescription}>
								{Translator.get('FILTERS_ENTER_CODE')}
							</Text>
							<View style={theme.popup.textInputContainer}>
								<TextInput
									style={theme.popup.textInput}
									onChangeText={this.setFilterTextInput}
									value={this.state.filterTextInput}
									placeholder="4TIN603U"
									placeholderTextColor={theme.popup.textInputPlaceholderColor}
									autoCorrect={false}
									keyboardType={
										Platform.OS === 'ios' ? 'default' : 'visible-password'
									}
								/>
								<TouchableOpacity onPress={this.submitFilterTextInput}>
									<MaterialIcons
										name="add"
										size={32}
										color={theme.popup.textInputIconColor}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.resetDialogVisible}
					onRequestClose={this.closeResetDialog}>
					<View style={theme.popup.background}>
						<View style={theme.popup.container}>
							<View style={theme.popup.header}>
								<Text style={theme.popup.textHeader}>
									{Translator.get('RESET_APP').toUpperCase()}
								</Text>
								<TouchableOpacity onPress={this.closeResetDialog}>
									<MaterialIcons
										name="close"
										size={32}
										style={theme.popup.closeIcon}
									/>
								</TouchableOpacity>
							</View>

							<Text style={theme.popup.textDescription}>
								{Translator.get('RESET_APP_CONFIRMATION')}
							</Text>
							<View style={theme.popup.buttonContainer}>
								<TouchableOpacity
									style={theme.popup.buttonSecondary}
									onPress={this.closeResetDialog}>
									<Text style={theme.popup.buttonTextSecondary}>
										{Translator.get('CANCEL')}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={theme.popup.buttonMain}
									onPress={this.resetApp}>
									<Text style={theme.popup.buttonTextMain}>
										{Translator.get('RESET')}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</SafeAreaView>
		);
	}
}

export default Settings;
