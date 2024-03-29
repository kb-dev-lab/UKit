import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View, Modal, Text } from 'react-native';
import Toast from 'react-native-root-toast';
import * as Calendar from 'expo-calendar';

import Translator from '../../utils/translator';
import { Platform } from 'react-native';

export default class CalendarNewEventPrompt extends React.Component {
	constructor(props) {
		super(props);
	}

	closePopup = () => this.props.closePopup();

	openPopup = () => this.props.openPopup();

	getCalendarPermissions = async () => {
		const { granted } = await Calendar.getCalendarPermissionsAsync();
		return granted;
	};

	askCalendarPermissions = async () => {
		if (!(await this.getCalendarPermissions())) {
			await Calendar.requestCalendarPermissionsAsync();
		}
	};

	getCalendarId = async () => {
		if (Platform.OS === 'ios') {
			const calendar = await Calendar.getDefaultCalendarAsync();
			return calendar.id;
		} else {
			let id = null;
			const calendars = await Calendar.getCalendarsAsync();
			for (const calendar of calendars) {
				if (calendar.isPrimary) {
					id = calendar.id;
					break;
				}
			}
			if (!id) {
				const calendar = calendars.shift();
				if (calendar) id = calendar.id;
			}
			return id;
		}
	};

	addCalendarEventWithPermissions = async () => {
		try {
			const calendarId = await this.getCalendarId();
			const details = {
				title: this.props.data.subject,
				startDate: new Date(this.props.data.date.start),
				endDate: new Date(this.props.data.date.end),
				timeZone: 'Europe/Paris',
				endTimeZone: 'Europe/Paris',
				notes: this.props.data.schedule + '\n' + this.props.data.description,
			};
			await Calendar.createEventAsync(calendarId, details);
			Toast.show(Translator.get('ADD_TO_CALENDAR_DONE'), {
				duration: Toast.durations.LONG,
				position: Toast.positions.BOTTOM,
			});
		} catch (error) {
			console.warn(error);
			Toast.show(Translator.get('ERROR_WITH_MESSAGE', "Couldn't add event to calendar"), {
				duration: Toast.durations.LONG,
				position: Toast.positions.BOTTOM,
			});
		}
	};

	addCalendarEvent = async () => {
		if (!(await this.getCalendarPermissions())) {
			await this.askCalendarPermissions();
			if (await this.getCalendarPermissions()) {
				await this.addCalendarEventWithPermissions();
				this.closePopup();
			} else {
				this.closePopup();
				Toast.show(Translator.get('ADD_TO_CALENDAR_PERMISSIONS'), {
					duration: Toast.durations.LONG,
					position: Toast.positions.BOTTOM,
				});
			}
		} else {
			await this.addCalendarEventWithPermissions();
			this.closePopup();
		}
	};

	render() {
		const theme = this.props.theme.settings;
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.popupVisible}
				onRequestClose={this.closePopup}>
				<TouchableWithoutFeedback onPress={this.closePopup} accessible={false}>
					<View style={theme.popup.background}>
						<TouchableWithoutFeedback accessible={false}>
							<View style={theme.popup.container}>
								<View style={theme.popup.header}>
									<Text style={theme.popup.textHeader}>
										{Translator.get('ADD_TO_CALENDAR').toUpperCase()}
									</Text>
								</View>
								<Text style={theme.popup.textDescription}>
									{Translator.get(
										'ADD_TO_CALENDAR_DESCRIPTION',
										this.props.data.subject,
									)}
								</Text>
								<View style={theme.popup.buttonContainer}>
									<TouchableOpacity
										style={theme.popup.buttonSecondary}
										onPress={this.closePopup}>
										<Text style={theme.popup.buttonTextSecondary}>
											{Translator.get('CANCEL')}
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={theme.popup.buttonMain}
										onPress={this.addCalendarEvent}>
										<Text style={theme.popup.buttonTextMain}>
											{Translator.get('CONFIRM')}
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}
