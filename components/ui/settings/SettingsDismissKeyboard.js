import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default ({ children }) => (
	<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
		{children}
	</TouchableWithoutFeedback>
);
