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

import SettingsManager from '../utils/SettingsManager';
import Translator from '../utils/translator';

const style = {
	light: {
		background: {
			flex: 1,
			backgroundColor: '#F0F0F0',
		},
		separationText: {
			color: '#4C5464',
			fontSize: 18,
			fontWeight: 'bold',
			marginTop: 12,
			marginLeft: 12,
		},
		button: {
			backgroundColor: '#FFFFFF',
			borderRadius: 15,
			marginHorizontal: 12,
			marginTop: 15,
			paddingVertical: 15,
			flexDirection: 'row',
			alignContent: 'center',
		},
		buttonMainText: {
			fontWeight: '500',
			color: '#4C5464',
			fontSize: 18,
			marginHorizontal: 15,
			alignSelf: 'center',
		},
		buttonSecondaryText: {
			fontWeight: '500',
			color: '#838FA6',
			fontSize: 18,
			marginLeft: 'auto',
			alignSelf: 'center',
		},
		leftIcon: {
			marginLeft: 15,
			color: '#4C5464',
			alignSelf: 'center',
		},
		rightIcon: {
			alignSelf: 'center',
			color: '#4C5464',
			marginHorizontal: 5,
		},
		popup: {
			background: {
				flex: 1,
				justifyContent: 'center',
				backgroundColor: '#000000B3',
			},
			container: {
				backgroundColor: '#FFFFFF',
				borderRadius: 20,
				padding: 15,
				marginHorizontal: 35,
			},
			header: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			},
			textHeader: {
				fontWeight: 'bold',
				fontSize: 18,
				color: '#4C5464',
			},
			textDescription: {
				marginTop: 15,
				fontSize: 16,
				color: '#4C5464C0',
			},
			buttonContainer: {
				flexDirection: 'row',
				justifyContent: 'space-around',
				marginTop: 50,
			},
			buttonSecondary: {
				flex: 1,
				backgroundColor: '#D2D4D8',
				borderRadius: 10,
				paddingVertical: 10,
				marginHorizontal: 5,
				alignItems: 'center',
			},
			buttonMain: {
				flex: 1,
				backgroundColor: '#4C5464',
				borderRadius: 10,
				paddingVertical: 10,
				marginHorizontal: 5,
				alignItems: 'center',
			},
			buttonTextSecondary: {
				fontSize: 18,
				color: '#777474',
			},
			buttonTextMain: {
				fontSize: 18,
				color: '#FFFFFF',
			},
			closeIcon: {
				color: '#D2D4D8',
			},
			radioContainer: {
				flexDirection: 'row',
				alignContent: 'center',
				marginTop: 16,
			},
			radioIconColor: '#4C5464',
			radioText: {
				fontSize: 18,
				marginLeft: 16,
				color: '#4C5464',
			},
			filterListContainer: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
			},
			textInputContainer: {
				flexDirection: 'row',
				alignItems: 'center',
				marginHorizontal: 5,
				marginTop: 15,
				justifyContent: 'flex-end',
			},
			textInput: {
				borderWidth: 2,
				borderColor: '#4C5464',
				borderRadius: 15,
				padding: 5,
				flex: 1,
				marginRight: 5,
				color: '#4C5464',
			},
			textInputIconColor: '#4C5464',
		},
	},
	dark: {
		background: {
			flex: 1,
			backgroundColor: '#451C47',
		},
		separationText: {
			color: '#D9D9D9',
			fontSize: 18,
			fontWeight: 'bold',
			marginTop: 12,
			marginLeft: 12,
		},
		button: {
			backgroundColor: '#674669',
			borderRadius: 15,
			marginHorizontal: 12,
			marginTop: 15,
			paddingVertical: 15,
			flexDirection: 'row',
			alignContent: 'center',
		},
		buttonMainText: {
			fontWeight: '500',
			color: '#D9D9D9',
			fontSize: 18,
			marginHorizontal: 15,
			alignSelf: 'center',
		},
		buttonSecondaryText: {
			fontWeight: '500',
			color: '#B1A5B2',
			fontSize: 18,
			marginLeft: 'auto',
			alignSelf: 'center',
		},
		leftIcon: {
			marginLeft: 15,
			color: '#D9D9D9',
			alignSelf: 'center',
		},
		rightIcon: {
			alignSelf: 'center',
			color: '#D9D9D9',
			marginHorizontal: 5,
		},
		popup: {
			background: {
				flex: 1,
				justifyContent: 'center',
				backgroundColor: '#000000B3',
			},
			container: {
				backgroundColor: '#674669',
				borderRadius: 20,
				padding: 15,
				marginHorizontal: 35,
				marginVertical: 100,
			},
			header: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			},
			textHeader: {
				fontWeight: 'bold',
				fontSize: 18,
				color: '#FFFFFF',
			},
			textDescription: {
				marginTop: 15,
				fontSize: 16,
				color: '#D9D1D9',
			},
			buttonContainer: {
				flexDirection: 'row',
				justifyContent: 'space-around',
				marginTop: 50,
			},
			buttonSecondary: {
				flex: 1,
				backgroundColor: '#B3A3B4',
				borderRadius: 10,
				paddingVertical: 10,
				marginHorizontal: 5,
				alignItems: 'center',
			},
			buttonMain: {
				flex: 1,
				backgroundColor: '#FFFFFF',
				borderRadius: 10,
				paddingVertical: 10,
				marginHorizontal: 5,
				alignItems: 'center',
			},
			buttonTextSecondary: {
				fontSize: 18,
				color: '#484148',
			},
			buttonTextMain: {
				fontSize: 18,
				color: '#404040',
			},
			closeIcon: {
				color: '#8D748E',
			},
			radioContainer: {
				flexDirection: 'row',
				alignContent: 'center',
				marginVertical: 8,
			},
			radioIconColor: '#D9D9D9',
			radioText: {
				fontSize: 18,
				marginLeft: 16,
				color: '#D9D9D9',
			},
			filterListContainer: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
			},
			textInputContainer: {
				flexDirection: 'row',
				alignItems: 'center',
				marginHorizontal: 5,
				marginTop: 15,
				justifyContent: 'flex-end',
			},
			textInput: {
				borderWidth: 2,
				borderColor: '#D9D9D9',
				borderRadius: 15,
				padding: 5,
				flex: 1,
				marginRight: 5,
				color: '#D9D9D9',
			},
			textInputIconColor: '#D9D9D9',
		},
	},
};

const switchTrackColor = {
	light: { false: '#767577', true: '#767577' },
	dark: { false: '#D9D9D9', true: '#D9D9D9' },
};

const thumbColor = {
	light: { false: '#F0F0F0', true: '#F0F0F0' },
	dark: { false: '#4C5464', true: '#4C5464' },
};

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
					borderRadius: 15,
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
		const theme = this.context.themeName;

		return (
			<SafeAreaView style={style[theme].background}>
				<Text style={style[theme].separationText}>
					{Translator.get('DISPLAY').toUpperCase()}
				</Text>

				<TouchableOpacity style={style[theme].button} onPress={this.openLanguageDialog}>
					<MaterialIcons name="language" size={24} style={style[theme].leftIcon} />
					<Text style={style[theme].buttonMainText}>{Translator.get('LANGUAGE')}</Text>
					<Text style={style[theme].buttonSecondaryText}>
						{Translator.get(LANGUAGE_LIST[this.state.language])}
					</Text>
					<MaterialIcons
						name="keyboard-arrow-right"
						size={24}
						style={style[theme].rightIcon}
					/>
				</TouchableOpacity>

				<TouchableOpacity style={style[theme].button} onPress={this.openFiltersDialog}>
					<MaterialIcons name="filter-list" size={24} style={style[theme].leftIcon} />
					<Text style={style[theme].buttonMainText}>{Translator.get('FILTERS')}</Text>
					<Text style={style[theme].buttonSecondaryText}>...</Text>
					<MaterialIcons
						name="keyboard-arrow-right"
						size={24}
						style={style[theme].rightIcon}
					/>
				</TouchableOpacity>

				<View style={{ marginTop: 20 }}></View>

				<Text style={style[theme].separationText}>
					{Translator.get('APP_LAUNCHING').toUpperCase()}
				</Text>

				<TouchableOpacity
					onPress={this.toggleOpenFavSwitchValue}
					style={style[theme].button}
					disabled={false}>
					<MaterialIcons name="star" size={24} style={style[theme].leftIcon} />
					<Text style={style[theme].buttonMainText}>
						{Translator.get('OPEN_ON_FAVOURITE_GROUP')}
					</Text>
					<Switch
						onValueChange={this.toggleOpenFavSwitchValue}
						value={this.state.openFavSwitchValue}
						style={{
							alignSelf: 'center',
							marginLeft: 'auto',
							marginRight: 10,
						}}
						trackColor={switchTrackColor[theme]}
						ios_backgroundColor="#FFFFFF"
						thumbColor={
							this.state.openFavSwitchValue
								? thumbColor[theme].true
								: thumbColor[theme].false
						}
					/>
				</TouchableOpacity>

				<TouchableOpacity style={style[theme].button} onPress={this.openResetDialog}>
					<MaterialCommunityIcons
						name="restart"
						size={24}
						style={style[theme].leftIcon}
					/>
					<Text style={style[theme].buttonMainText}>{Translator.get('RESET_APP')}</Text>
					<MaterialIcons
						name="keyboard-arrow-right"
						size={24}
						style={[style[theme].rightIcon, { marginLeft: 'auto' }]}
					/>
				</TouchableOpacity>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.languageDialogVisible}
					onRequestClose={this.closeLanguageDialog}>
					<View style={style[theme].popup.background}>
						<View style={style[theme].popup.container}>
							<View style={style[theme].popup.header}>
								<Text style={style[theme].popup.textHeader}>
									{Translator.get('LANGUAGE').toUpperCase()}
								</Text>
								<TouchableOpacity onPress={this.closeLanguageDialog}>
									<MaterialIcons
										name="close"
										size={32}
										style={style[theme].popup.closeIcon}
									/>
								</TouchableOpacity>
							</View>

							<Text style={style[theme].popup.textDescription}>
								{Translator.get('YOUR_LANGUAGE')}
							</Text>

							<View style={{ marginVertical: 8 }}>
								<TouchableOpacity
									onPress={this.setLanguageToFrench}
									style={style[theme].popup.radioContainer}>
									<MaterialIcons
										name={
											this.state.language === 'fr'
												? 'radio-button-on'
												: 'radio-button-off'
										}
										size={24}
										color={style[theme].popup.radioIconColor}
									/>
									<Text style={style[theme].popup.radioText}>
										{Translator.get('FRENCH')}
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={this.setLanguageToEnglish}
									style={style[theme].popup.radioContainer}>
									<MaterialIcons
										name={
											this.state.language === 'en'
												? 'radio-button-on'
												: 'radio-button-off'
										}
										size={24}
										color={style[theme].popup.radioIconColor}
									/>
									<Text style={style[theme].popup.radioText}>
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
					<View style={style[theme].popup.background}>
						<View style={style[theme].popup.container}>
							<View style={style[theme].popup.header}>
								<Text style={style[theme].popup.textHeader}>
									{Translator.get('FILTERS').toUpperCase()}
								</Text>
								<TouchableOpacity onPress={this.closeFiltersDialog}>
									<MaterialIcons
										name="close"
										size={32}
										style={style[theme].popup.closeIcon}
									/>
								</TouchableOpacity>
							</View>

							<Text style={style[theme].popup.textDescription}>
								Maintenez une UE pour le supprimer de la liste des filters
							</Text>
							<View style={{ marginTop: 16 }}></View>
							<View style={style[theme].popup.filterListContainer}>
								<FlatList
									keyExtractor={(item) => item}
									data={SettingsManager.getFilters()}
									renderItem={this.renderFilterItem}
									extraData={SettingsManager.getFilters()}
									// numColumns={2}
									horizontal={true}
									ListEmptyComponent={
										<Text style={style[theme].popup.textDescription}>
											Aucun filtre actuellement
										</Text>
									}
								/>
							</View>
							<View style={style[theme].popup.textInputContainer}>
								<TextInput
									style={style[theme].popup.textInput}
									onChangeText={this.setFilterTextInput}
									value={this.state.filterTextInput}
									placeholder="Entrez ci-dessous les codes des UE que vous ne voulez afficher."
									autoCorrect={false}
									keyboardType={
										Platform.OS === 'ios' ? 'default' : 'visible-password'
									}
								/>
								<TouchableOpacity onPress={this.submitFilterTextInput}>
									<MaterialIcons name="add" size={32} color={style[theme].popup.textInputIconColor}/>
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
					<View style={style[theme].popup.background}>
						<View style={style[theme].popup.container}>
							<View style={style[theme].popup.header}>
								<Text style={style[theme].popup.textHeader}>
									{Translator.get('RESET_APP').toUpperCase()}
								</Text>
								<TouchableOpacity onPress={this.closeResetDialog}>
									<MaterialIcons
										name="close"
										size={32}
										style={style[theme].popup.closeIcon}
									/>
								</TouchableOpacity>
							</View>

							<Text style={style[theme].popup.textDescription}>
								{Translator.get('RESET_APP_CONFIRMATION')}
							</Text>
							<View style={style[theme].popup.buttonContainer}>
								<TouchableOpacity
									style={style[theme].popup.buttonSecondary}
									onPress={this.closeResetDialog}>
									<Text style={style[theme].popup.buttonTextSecondary}>
										{Translator.get('CANCEL')}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={style[theme].popup.buttonMain}
									onPress={this.resetApp}>
									<Text style={style[theme].popup.buttonTextMain}>
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
