import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../StyleWelcome';
import Translator from '../utils/translator';

const YearButton = ({ yearEntry, selectYear, getCurrentYear, theme }) => {
	const currentYear = getCurrentYear()?.id;
	const _onPress = () => {
		selectYear(yearEntry);
	};
	return (
		<TouchableOpacity
			onPress={_onPress}
			style={
				currentYear === yearEntry.id
					? styles[theme].whiteCardButtonSelected
					: styles[theme].whiteCardButton
			}>
			<Text
				style={
					currentYear === yearEntry.id
						? styles[theme].whiteCardButtonTextSelected
						: styles[theme].whiteCardButtonText
				}>
				{Translator.get(yearEntry.title)}
			</Text>
		</TouchableOpacity>
	);
};

export default YearButton;
