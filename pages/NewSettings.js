import React from 'react';
import { AppContext } from '../utils/DeviceUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View, Switch, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from 'react-native-dialog';

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
				color: '#D2D4D8'
			}
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
				color: '#8D748E'
			}
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
			resetDialogVisible: false,
		};
	}

	setSelectedLanguage = (newLang) => {
		this.setState({ language: newLang });
	};

	toggleOpenFavSwitchValue = () => {
		this.setState({ openFavSwitchValue: !this.state.openFavSwitchValue }, () => {
			SettingsManager.setOpenAppOnFavoriteGroup(this.state.openFavSwitchValue);
		});
	};

	openLanguageDialog = () => {
		this.setState({ languageDialogVisible: true });
	};

	closeLanguageDialog = () => {
		this.setState({ languageDialogVisible: false });
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
		const theme = SettingsManager.getTheme();

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

				<TouchableOpacity
					style={style[theme].button}
					onPress={() => console.log('pressed')}>
					<MaterialIcons name="filter-list" size={24} style={style[theme].leftIcon} />
					<Text style={style[theme].buttonMainText}>Filtre</Text>
					<Text style={style[theme].buttonSecondaryText}>...</Text>
					<MaterialIcons
						name="keyboard-arrow-right"
						size={24}
						style={style[theme].rightIcon}
					/>
				</TouchableOpacity>

				<View style={{ marginTop: 20 }}></View>

				<Text style={style[theme].separationText}>DEMARRAGE</Text>

				<TouchableOpacity
					style={style[theme].button}
					onPress={() => console.log('pressed')}
					disabled={true}>
					<MaterialIcons name="star" size={24} style={style[theme].leftIcon} />
					<Text style={style[theme].buttonMainText}>Ouvrir sur le groupe favori</Text>
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
					<Text style={style[theme].buttonMainText}>Réinitialiser l'application</Text>
					<MaterialIcons
						name="keyboard-arrow-right"
						size={24}
						style={[style[theme].rightIcon, { marginLeft: 'auto' }]}
					/>
				</TouchableOpacity>

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
									<MaterialIcons name="close" size={32} style={style[theme].popup.closeIcon} />
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

				<Dialog.Container
					visible={this.state.languageDialogVisible}
					onBackdropPress={this.closeLanguageDialog}>
					<Dialog.Title>{Translator.get('LANGUAGE')}</Dialog.Title>
					<Dialog.Description>{Translator.get('YOUR_LANGUAGE')}</Dialog.Description>
					<Dialog.Button
						onPress={() => console.log('pressed')}
						label={Translator.get('FRENCH')}
					/>
					<Dialog.Button
						onPress={() => console.log('pressed')}
						label={Translator.get('ENGLISH')}
					/>
				</Dialog.Container>
			</SafeAreaView>
		);
	}
}

export default Settings;
