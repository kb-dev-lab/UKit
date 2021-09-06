import React from 'react';
import { Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Translator from '../../../../utils/translator';

export default ({ theme, popupVisible, popupClose, resetApp }) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={popupVisible}
			onRequestClose={popupClose}>
			<TouchableWithoutFeedback onPress={popupClose}>
				<View style={theme.popup.background}>
					<View style={theme.popup.container}>
						<View style={theme.popup.header}>
							<Text style={theme.popup.textHeader}>
								{Translator.get('RESET_APP').toUpperCase()}
							</Text>
							<TouchableOpacity onPress={popupClose}>
								<MaterialIcons
									name="close"
									size={32}
									style={theme.popup.closeIcon}
								/>
							</TouchableOpacity>
						</View>
						<Text style={theme.popup.textDescription}>
							{Translator.get('RESET_APP_CONFIRMATION')}
						</Text>
						<View style={theme.popup.buttonContainer}>
							<TouchableOpacity
								style={theme.popup.buttonSecondary}
								onPress={popupClose}>
								<Text style={theme.popup.buttonTextSecondary}>
									{Translator.get('CANCEL')}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={theme.popup.buttonMain} onPress={resetApp}>
								<Text style={theme.popup.buttonTextMain}>
									{Translator.get('RESET')}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};
