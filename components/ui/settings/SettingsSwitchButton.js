import React from 'react';
import { Text, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ theme, leftIcon, leftText, switchOnValueChange, switchValue }) => {
	return (
		<TouchableOpacity onPress={switchOnValueChange} style={theme.button}>
			<MaterialIcons name={leftIcon} size={24} style={theme.leftIcon} />
			<Text style={theme.buttonMainText}>{leftText}</Text>
			<Switch
				onValueChange={switchOnValueChange}
				value={switchValue}
				style={{
					alignSelf: 'center',
					marginLeft: 'auto',
					marginRight: 8,
				}}
				trackColor={theme.switchTrackColor}
				ios_backgroundColor="#FFFFFF"
				thumbColor={
					switchValue ? theme.switchThumbColor.true : theme.switchThumbColor.false
				}
			/>
		</TouchableOpacity>
	);
};
