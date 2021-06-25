import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import style from '../Style';

class CalendarWeek extends React.Component {
	static propTypes = {
		currentWeek: PropTypes.number,
		onPressItem: PropTypes.func,
		selectedWeek: PropTypes.number,
		week: PropTypes.number,
		theme: PropTypes.object,
	};

	_onPress = () => {
		if (this.props.onPressItem) {
			requestAnimationFrame(() => {
				this.props.onPressItem(this.props.week);
			});
		}
	};

	static getBackgroundColor(props) {
		return props.week === props.selectedWeek
			? props.theme.calendar.selection
			: props.week === props.currentWeek
			? props.theme.calendar.currentDay
			: 'transparent';
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			CalendarWeek.getBackgroundColor(nextProps) !==
			CalendarWeek.getBackgroundColor(this.props)
		);
	}

	render() {
		const { theme } = this.props;
		return (
			<TouchableOpacity
				onPress={this._onPress}
				style={{
					width: 64,
					height: 64,
					paddingHorizontal: 16,
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
					borderTopRightRadius: 4,
					borderTopLeftRadius: 4,
					backgroundColor: CalendarWeek.getBackgroundColor(this.props),
				}}>
				<View data-month={this.props.item}>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 24,
							marginBottom: 4,
							color:
								this.props.week === this.props.selectedWeek
									? theme.lightFont
									: theme.font,
						}}>
						{this.props.week}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

export default CalendarWeek;
