import React, { useRef } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ theme, onPress, leftIcon, leftIconAnimation, leftText, rightText, disabled }) => {
	const rotatingAnimation = useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		if (leftIconAnimation === 'rotate') {
			Animated.loop(
				Animated.timing(rotatingAnimation, {
					duration: 1000,
					toValue: 360,
					useNativeDriver: true,
				}),
			).start();
		} else {
			Animated.timing(rotatingAnimation).stop();
		}
	}, [leftIconAnimation]);

	return (
		<TouchableOpacity
			style={[theme.button, disabled ? { backgroundColor: 'transparent' } : {}]}
			onPress={disabled ? undefined : onPress}>
			<Animated.View
				style={{
					transform: [
						{
							rotateX: rotatingAnimation.interpolate({
								inputRange: [0, 360],
								outputRange: ['0deg', '360deg'],
							}),
						},
					],
				}}>
				<MaterialIcons name={leftIcon} size={24} style={theme.leftIcon} />
			</Animated.View>
			<Text style={theme.buttonMainText}>{leftText}</Text>
			<Text numberOfLines={1} style={[theme.buttonSecondaryText, { flexShrink: 1 }]}>
				{rightText}
			</Text>
			{!disabled && (
				<MaterialIcons name="keyboard-arrow-right" size={24} style={theme.rightIcon} />
			)}
		</TouchableOpacity>
	);
};
