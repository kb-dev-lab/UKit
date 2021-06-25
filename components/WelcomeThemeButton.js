import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../StyleWelcome';
import Translator from '../utils/translator';

const ThemeButton = ({ themeEntry, selectTheme, getCurrentTheme, theme }) => {
	const currentTheme = getCurrentTheme();
	const _onPress = () => {
		selectTheme(themeEntry);
	};
	return (
		<TouchableOpacity
			onPress={_onPress}
			style={
				currentTheme === themeEntry.id
					? styles[theme].whiteCardButtonSelected
					: styles[theme].whiteCardButton
			}>
			<Text
				style={
					currentTheme === themeEntry.id
						? styles[theme].whiteCardButtonTextSelected
						: styles[theme].whiteCardButtonText
				}>
				{Translator.get(themeEntry.title)}
			</Text>
		</TouchableOpacity>
	);
};

export default ThemeButton;
