import React from 'react';
import styles, { WelcomeButtonIconColor } from '../../StyleWelcome';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ onPress, buttonText, theme }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles[theme].buttonContainer}>
			<Text style={styles[theme].buttonText}>{buttonText}</Text>
			<MaterialIcons
				name={'chevron-right'}
				size={32}
				color={WelcomeButtonIconColor()}
				style={{
					position: 'absolute',
					alignSelf: 'center',
					right: 10,
				}}
			/>
		</TouchableOpacity>
	);
};
