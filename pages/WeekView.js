import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';

import CalendarWeek from '../components/CalendarWeek';
import WeekComponent from '../components/Week';
import style from '../Style';
import Translator from '../utils/translator';
import { AppContext } from '../utils/DeviceUtils';

const isEqualsObject = (obj1, ojb2) => {
	// objects must be in the same order
	return Object.entries(obj1).toString() === Object.entries(ojb2).toString();
};

const findIndexOfObject = (objectList, object) => {
	for (let i = 0; i < objectList.length; i++) {
		const element = objectList[i];
		if (isEqualsObject(element, object)) {
			return i;
		}
	}
	return -1;
};

class WeekView extends React.Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);

		const currentDate = moment();
		const currentWeek = { week: currentDate.isoWeek(), year: currentDate.year() };
		const groupName = this.props.route.params.groupName;
		const weeks = WeekView.generateWeeks();

		this.state = {
			groupName,
			currentWeek: currentWeek,
			currentWeekIndex: findIndexOfObject(weeks, currentWeek),
			weeks,
			selectedWeek: currentWeek,
		};

		this.viewability = {
			itemVisiblePercentThreshold: 50,
		};
	}

	static getCalendarListItemLayout = (data, index) => {
		return {
			length: style.calendarList.itemSize,
			offset: style.calendarList.itemSize * index,
			index,
		};
	};

	renderCalendarListItem = ({ item }) => {
		return (
			<CalendarWeek
				week={item}
				selectedWeek={this.state.selectedWeek}
				currentWeek={this.state.currentWeek}
				onPressItem={this.onWeekPress}
				theme={style.Theme[this.context.themeName]}
			/>
		);
	};

	extractCalendarListItemKey = (item) => {
		return `S${item.week}-${this.context.themeName}`;
	};

	onTodayPress = () => {
		this.setState(
			{
				selectedWeek: this.state.currentWeek,
			},
			() => {
				if (this.calendarList) {
					this.calendarList.scrollToIndex({
						index: this.state.currentWeekIndex,
						animated: true,
					});
				}
			},
		);
	};

	onDayButton = () => {
		this.props.navigation.goBack();
	};

	onWeekPress = (item) => {
		this.setState({
			selectedWeek: item,
		});
	};

	static generateWeeks = () => {
		const currentDate = moment();
		const beginningGenerationDate = moment()
			.date(1)
			.month(7);

		if (currentDate.month() > 6) {
			beginningGenerationDate.year(currentDate.year());
		} else {
			beginningGenerationDate.year(currentDate.year() - 1);
		}

		const weeks = [];
		let firstWeek = null;

		for (let i = 0, iMax = 365; i < iMax; i += 7) {
			const date = moment(beginningGenerationDate).add(i, 'd');
			const week = date.isoWeek();
			const year = date.year();
			if (week !== firstWeek) {
				if (firstWeek === null) {
					firstWeek = week;
				}
				weeks.push({ week, year });
			} else {
				break;
			}
		}

		return weeks;
	};

	render() {
		const theme = style.Theme[this.context.themeName];

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: theme.greyBackground }}>
				<WeekComponent
					key={`weekComponent-${this.context.themeName}`}
					week={this.state.selectedWeek}
					groupName={this.state.groupName}
					theme={theme}
					navigation={this.props.navigation}
					filtersList={this.context.filters}
				/>
				<View
					style={{
						flexGrow: 0,
						backgroundColor: 'white',
						borderTopColor: theme.border,
						borderTopWidth: 1,
					}}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'stretch',
							height: 38,
							backgroundColor: theme.courseBackground,
						}}>
						<View style={{ position: 'absolute', top: 0, right: 0, left: 0 }}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 18,
									marginVertical: 8,
									color: theme.font,
								}}>
								{Translator.get('WEEK')}
							</Text>
						</View>
						<TouchableOpacity
							style={{ flexDirection: 'row', alignItems: 'center' }}
							onPress={this.onTodayPress}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginHorizontal: 16,
								}}>
								<MaterialIcons
									name="event-note"
									size={18}
									style={{ color: theme.icon }}
								/>
								<Text
									style={{
										textAlign: 'center',
										fontSize: 12,
										marginLeft: 8,
										color: theme.font,
									}}>
									{Translator.get('THIS_WEEK')}
								</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={{ flexDirection: 'row', alignItems: 'center' }}
							onPress={this.onDayButton}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginHorizontal: 16,
								}}>
								<Text
									style={{
										textAlign: 'center',
										fontSize: 12,
										marginRight: 8,
										color: theme.font,
									}}>
									{Translator.get('DAY')}
								</Text>
								<MaterialCommunityIcons
									name="calendar"
									size={18}
									style={{ color: theme.icon }}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<View>
						<FlatList
							ref={(list) => (this.calendarList = list)}
							showsHorizontalScrollIndicator={false}
							data={this.state.weeks}
							horizontal={true}
							keyExtractor={this.extractCalendarListItemKey}
							viewabilityConfig={this.viewability}
							initialScrollIndex={this.state.currentWeekIndex}
							getItemLayout={WeekView.getCalendarListItemLayout}
							extraData={this.state}
							renderItem={this.renderCalendarListItem}
							style={{ backgroundColor: theme.courseBackground }}
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

export default WeekView;
