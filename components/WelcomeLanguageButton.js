import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../StyleWelcome';
import Translator from '../utils/translator';

const LanguageButton = ({ languageEntry, selectLanguage, getCurrentLanguage, theme }) => {
	const currentLanguage = getCurrentLanguage();
	const _onPress = () => {
		selectLanguage(languageEntry);
	};
	return (
		<TouchableOpacity
			onPress={_onPress}
			style={
				currentLanguage === languageEntry.id
					? styles[theme].whiteCardButtonSelected
					: styles[theme].whiteCardButton
			}>
			<Text
				style={
					currentLanguage === languageEntry.id
						? styles[theme].whiteCardButtonTextSelected
						: styles[theme].whiteCardButtonText
				}>
				{Translator.get(languageEntry.title)}
			</Text>
		</TouchableOpacity>
	);
};

export default LanguageButton;
