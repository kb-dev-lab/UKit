import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/fr';

import CalendarDay from './CalendarDay';
import DayComponent from './containers/Day';
import style from '../Style';

moment.locale('fr');

function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
}

export default class DayView extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Jour',
        tabBarIcon: ({ tintColor }) => {
            return <MaterialCommunityIcons name="calendar" size={24} style={{ color: tintColor }} />;
        },
    };

    constructor(props) {
        super(props);

        const currentDay = moment();
        const days = DayView.generateDays();

        this.state = {
            groupName: this.props.groupName,
            currentDay: currentDay,
            currentDayIndex: days.findIndex((e) => e.isSame(currentDay, 'day')),
            shownMonth: {
                number: currentDay.month(),
                string: capitalize(currentDay.format('MMMM')),
            },
            days,
            selectedDay: currentDay,
        };

        this.viewability = {
            itemVisiblePercentThreshold: 50,
        };

        this.checkViewableItems = this.checkViewableItems.bind(this);
        this.onTodayPress = this.onTodayPress.bind(this);
        this.onDayPress = this.onDayPress.bind(this);
        this.renderCalendarListItem = this.renderCalendarListItem.bind(this);
        this.onWeekPress = this.onWeekPress.bind(this);
    }

    static getCalendarListItemLayout(data, index) {
        return {
            length: style.calendarList.itemSize,
            offset: style.calendarList.itemSize * index,
            index,
        };
    }

    renderCalendarListItem({ item }) {
        return <CalendarDay item={item} selectedDay={this.state.selectedDay} currentDay={this.state.currentDay} onPressItem={this.onDayPress} />;
    }

    static extractCalendarListItemKey(item) {
        return `${item.date()}-${item.month()}`;
    }

    onTodayPress() {
        this.setState(
            {
                selectedDay: this.state.currentDay,
            },
            () => {
                if (this.calendarList) {
                    this.calendarList.scrollToIndex({ index: this.state.currentDayIndex, animated: true });
                }
            }
        );
    }

    onWeekPress() {
        this.props.navigation.navigate('Week', { groupName: this.state.groupName });
    }

    onDayPress(dayItem) {
        this.setState({
            selectedDay: dayItem,
        });
    }

    static generateDays() {
        const currentDate = moment();
        const beginningGenerationDate = moment()
            .date(1)
            .month(7);

        if (currentDate.month() > 6) {
            beginningGenerationDate.year(currentDate.year());
        } else {
            beginningGenerationDate.year(currentDate.year() - 1);
        }

        const days = [];

        for (let i = 0, iMax = 365; i < iMax; i++) {
            days.push(moment(beginningGenerationDate).add(i, 'd'));
        }

        return days;
    }

    checkViewableItems(info) {
        if (!info.viewableItems.length) {
            return;
        }

        const date = moment(info.viewableItems[0].item);

        if (date.month() !== this.state.shownMonth.number) {
            this.setState({
                shownMonth: {
                    number: date.month(),
                    string: capitalize(date.format('MMMM')),
                },
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <DayComponent key={this.state.days[0].dayOfYear()} day={this.state.selectedDay} groupName={this.state.groupName} />
                <View
                    style={{
                        flexGrow: 0,
                        backgroundColor: 'white',
                        borderTopColor: '#DDDDDD',
                        borderTopWidth: 1,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'stretch',
                            height: 38,
                        }}>
                        <View style={{ position: 'absolute', top: 0, right: 0, left: 0 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 8 }}>{this.state.shownMonth.string}</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.onTodayPress}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
                                <MaterialIcons name="event-note" size={18} />
                                <Text style={{ textAlign: 'center', fontSize: 12, marginLeft: 8 }}>Aujourd'hui</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 8 }} />
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.onWeekPress}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
                                <Text style={{ textAlign: 'center', fontSize: 12, marginRight: 8 }}>Semaine</Text>
                                <MaterialCommunityIcons name="calendar-range" size={18} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        ref={(list) => (this.calendarList = list)}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.days}
                        horizontal={true}
                        keyExtractor={DayView.extractCalendarListItemKey}
                        viewabilityConfig={this.viewability}
                        onViewableItemsChanged={this.checkViewableItems}
                        initialScrollIndex={this.state.currentDayIndex}
                        getItemLayout={DayView.getCalendarListItemLayout}
                        extraData={this.state}
                        renderItem={this.renderCalendarListItem}
                    />
                </View>
            </View>
        );
    }
}
