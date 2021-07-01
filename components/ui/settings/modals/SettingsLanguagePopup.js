import React from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Translator from '../../../../utils/translator';

export default ({ theme, popupVisible, popupClose, language, setLanguageToFrench, setLanguageToEnglish }) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={popupVisible}
			onRequestClose={popupClose}>
			<View style={theme.popup.background}>
				<View style={theme.popup.container}>
					<View style={theme.popup.header}>
						<Text style={theme.popup.textHeader}>
							{Translator.get('LANGUAGE').toUpperCase()}
						</Text>
						<TouchableOpacity onPress={popupClose}>
							<MaterialIcons name="close" size={32} style={theme.popup.closeIcon} />
						</TouchableOpacity>
					</View>
					<Text style={theme.popup.textDescription}>
						{Translator.get('YOUR_LANGUAGE')}
					</Text>
					<View style={{ marginVertical: 8 }}>
						<TouchableOpacity
							onPress={setLanguageToFrench}
							style={theme.popup.radioContainer}>
							<MaterialIcons
								name={
									language === 'fr'
										? 'radio-button-on'
										: 'radio-button-off'
								}
								size={24}
								color={theme.popup.radioIconColor}
							/>
							<Text style={theme.popup.radioText}>{Translator.get('FRENCH')}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={setLanguageToEnglish}
							style={theme.popup.radioContainer}>
							<MaterialIcons
								name={
									language === 'en'
										? 'radio-button-on'
										: 'radio-button-off'
								}
								size={24}
								color={theme.popup.radioIconColor}
							/>
							<Text style={theme.popup.radioText}>{Translator.get('ENGLISH')}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};
