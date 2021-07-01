import React from 'react';
import { Text } from 'react-native';

export default ({ theme, text }) => {
	return <Text style={theme.separationText}>{text.toUpperCase()}</Text>;
};
