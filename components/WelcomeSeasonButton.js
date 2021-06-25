import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../StyleWelcome';
import Translator from '../utils/translator';

const SeasonButton = ({ seasonEntry, selectSeason, getCurrentSeason, theme }) => {
	const currentSeason = getCurrentSeason()?.id;
	const _onPress = () => {
		selectSeason(seasonEntry);
	};
	return (
		<TouchableOpacity
			onPress={_onPress}
			style={
				currentSeason === seasonEntry.id
					? styles[theme].whiteCardButtonSelected
					: styles[theme].whiteCardButton
			}>
			<Text
				style={
					currentSeason === seasonEntry.id
						? styles[theme].whiteCardButtonTextSelected
						: styles[theme].whiteCardButtonText
				}>
				{Translator.get(seasonEntry.title)}
			</Text>
		</TouchableOpacity>
	);
};

export default SeasonButton;
