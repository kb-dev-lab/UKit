import React from 'react';
import {
	Text,
	TouchableOpacity,
	View,
	Modal,
	ScrollView,
	TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Translator from '../../../../utils/translator';
import SettingsManager from '../../../../utils/SettingsManager';

export default ({ theme, popupVisible, popupClose, selectedCalendar, setCalendar }) => {
	function setDefaultCalendar() {
		setCalendar('UKit');
	}

	const calendars = SettingsManager.getCalendars().filter((cal) => cal.title !== 'UKit');
	const ukitCalendar = SettingsManager.getCalendars().find((cal) => cal.title === 'UKit');

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
								{Translator.get('CALENDAR').toUpperCase()}
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
							{Translator.get('YOUR_CALENDAR')}
						</Text>
						<ScrollView style={{ marginVertical: 8 }}>
							<TouchableOpacity
								onPress={setDefaultCalendar}
								style={theme.popup.radioContainer}>
								<MaterialIcons
									name={
										selectedCalendar === 'UKit' ||
										selectedCalendar === ukitCalendar?.id
											? 'radio-button-on'
											: 'radio-button-off'
									}
									size={24}
									color={theme.popup.radioIconColor}
								/>
								<Text style={theme.popup.radioText}>
									{Translator.get('UKIT_CALENDAR')}
								</Text>
							</TouchableOpacity>

							<Text style={theme.popup.textDescription}>
								{Translator.get('EXISTING_CALENDARS')}
							</Text>

							{calendars.map((calendar, i) => {
								const _setCalendar = () => {
									setCalendar(calendar);
								};

								return (
									<TouchableOpacity
										key={calendar.id}
										onPress={_setCalendar}
										style={theme.popup.radioContainer}>
										<MaterialIcons
											name={
												selectedCalendar === calendar.id
													? 'radio-button-on'
													: 'radio-button-off'
											}
											size={24}
											color={theme.popup.radioIconColor}
										/>
										<Text style={theme.popup.radioText}>{calendar.title}</Text>
									</TouchableOpacity>
								);
							})}
						</ScrollView>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};
