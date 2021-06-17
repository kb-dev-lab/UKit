import React from 'react';
import styles from '../../StyleWelcome';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ onPress, visible }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={!visible}
			style={{ opacity: visible ? 1 : 0, alignSelf: 'flex-start' }}>
			<MaterialIcons
				style={{
					paddingTop: 10,
					paddingLeft: 5,
				}}
				name={'arrow-back'}
				size={32}
				color={'white'}
			/>
		</TouchableOpacity>
	);
};
