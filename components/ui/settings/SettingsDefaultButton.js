import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ theme, onPress, leftIcon, leftText, rightText }) => {
	return (
		<TouchableOpacity style={theme.button} onPress={onPress}>
			<MaterialIcons name={leftIcon} size={24} style={theme.leftIcon} />
			<Text style={theme.buttonMainText}>{leftText}</Text>
			<Text style={theme.buttonSecondaryText}>{rightText}</Text>
			<MaterialIcons name="keyboard-arrow-right" size={24} style={theme.rightIcon} />
		</TouchableOpacity>
	);
};
