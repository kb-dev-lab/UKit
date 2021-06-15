import React from 'react';
import styles from '../../StyleWelcome';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ onPress, buttonText }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles('buttonContainer')}>
			<Text style={styles('buttonText')}>{buttonText}</Text>
            {/* <MaterialIcons name={'chevron-right'} size={32} /> */}
		</TouchableOpacity>
	);
};
