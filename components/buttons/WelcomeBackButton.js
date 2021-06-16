import React from 'react';
import styles from '../../StyleWelcome';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<MaterialIcons style={{
				paddingTop: 5,
				paddingLeft: 5,
			}} name={'arrow-back'} size={32} color={'white'} />
		</TouchableOpacity>
	);
};
