import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

class CalendarWeek extends React.Component {
	_onPress = () => {
		if (this.props.onPressItem) {
			requestAnimationFrame(() => {
				this.props.onPressItem(this.props.week);
			});
		}
	};

	static getBackgroundColor(props) {
		return props.week.week === props.selectedWeek.week &&
			props.week.year === props.selectedWeek.year
			? props.theme.calendar.selection
			: props.week.week === props.currentWeek.week &&
			  props.week.year === props.currentWeek.year
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
						{this.props.week.week}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

export default CalendarWeek;
