import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/fr';

import DayComponent from './containers/Day';
import style from '../Style';
import Swiper from './Swiper';

moment.locale('fr');

function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
}

export default class DaySwiper extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Jour',
        tabBarIcon: ({ tintColor }) => {
            return <MaterialCommunityIcons name="calendar" size={24} style={{ color: tintColor }} />;
        },
    };

    constructor(props) {
        super(props);

        let currentDay = moment();
        if (currentDay.isoWeekday() === 7) {
            currentDay = currentDay.add(1, 'days');
        }

        let groupName = this.props.screenProps.groupName;

        const days = this.generateDays();

        this.state = {
            groupName,
            currentDay: currentDay,
            currentDayIndex: days.findIndex((e) => e.isSame(currentDay)),
            index: null,
            days: [],
            renderedDays: [],
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

        this.onDayChange = this.onDayChange.bind(this);
        this.checkViewableItems = this.checkViewableItems.bind(this);
    }

    componentDidMount() {
        const days = DaySwiper.computeDays(this.state.currentDay);

        const renderedDays = days.map((day) => {
            return <DayComponent key={day.dayOfYear()} day={day} groupName={this.state.groupName} />;
        });

        this.setState({ index: 4, days, renderedDays });
    }

    static getNextDay(day) {
        let nextDay = day.clone();

        nextDay.add(1, 'days');
        if (nextDay.isoWeekday() === 7) {
            nextDay.add(1, 'days');
        }

        return nextDay;
    }

    static getPreviousDay(day) {
        let previousDay = day.clone();

        previousDay.subtract(1, 'days');
        if (previousDay.isoWeekday() === 7) {
            previousDay.subtract(1, 'days');
        }

        return previousDay;
    }

    static computeDays(currentDay) {
        let dayPlus1 = this.getNextDay(currentDay);
        let dayPlus2 = this.getNextDay(dayPlus1);
        let dayPlus3 = this.getNextDay(dayPlus2);

        let dayMinus1 = this.getPreviousDay(currentDay);
        let dayMinus2 = this.getPreviousDay(dayMinus1);
        let dayMinus3 = this.getPreviousDay(dayMinus2);

        return [
            this.getPreviousDay(dayMinus3),
            dayMinus3,
            dayMinus2,
            dayMinus1,
            currentDay,
            dayPlus1,
            dayPlus2,
            dayPlus3,
            this.getNextDay(dayPlus3),
        ];
    }

    onDayChange(e, state, context) {
        let index = state.index;

        if (index > this.state.index) {
            if (index >= this.state.days.length - 2) {
                let nextDay = DaySwiper.getNextDay(this.state.days[this.state.days.length - 1]);

                const days = this.state.days;
                days.push(nextDay);

                const renderedDays = this.state.renderedDays;
                renderedDays.push(<DayComponent key={nextDay.dayOfYear()} day={nextDay} groupName={this.state.groupName} />);

                this.setState({ days, renderedDays, index });
            }
        } else if (index < this.state.index) {
            if (index <= 0) {
                let previousDays = DaySwiper.getPreviousDay(this.state.days[0]);

                const days = this.state.days;
                days.unshift(previousDays);

                const renderedDays = this.state.renderedDays;
                renderedDays.unshift(<DayComponent key={previousDays.dayOfYear()} day={previousDays} groupName={this.state.groupName} />);

                this.setState({ days, renderedDays, index: 1 });
            }
        }
    }

    generateDays() {
        const currentDate = moment();
        const beginningGenerationDate = moment()
            .day(1)
            .month(7);

        if (currentDate.month() > 7) {
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

        for (let i = 0, iMax = info.viewableItems.length; i < iMax; i++) {
            const date = moment(info.viewableItems[i].item);

            if (date.month() < this.state.shownMonth.number) {
                this.setState({
                    shownMonth: {
                        number: date.month(),
                        string: capitalize(date.format('MMMM')),
                    },
                });

                return;
            }
        }

        const date = moment(info.viewableItems[0].item);

        if (date.month() > this.state.shownMonth.number) {
            this.setState({
                shownMonth: {
                    number: date.month(),
                    string: capitalize(date.format('MMMM')),
                },
            });
        }
    }

    render() {
        if (this.state.index !== null) {
            return (
                <View style={{ flex: 1 }}>
                    <DayComponent key={this.state.days[0].dayOfYear()} day={this.state.days[0]} groupName={this.state.groupName} />;
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: 'white',
                            borderTopColor: '#DDDDDD',
                            borderTopWidth: 1,
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 8 }}>{this.state.shownMonth.string}</Text>
                        <FlatList
                            data={this.generateDays()}
                            horizontal={true}
                            keyExtractor={(item, index) => `${item.date()}-${item.month()}`}
                            viewabilityConfig={this.viewability}
                            onViewableItemsChanged={this.checkViewableItems}
                            initialScrollIndex={this.state.currentDayIndex}
                            getItemLayout={(data, index) => ({ length: 64, offset: 64 * index, index })}
                            extraData={this.state}
                            renderItem={({ item }) => (
                                <View
                                    data-month={item.month()}
                                    style={{
                                        width: 64,
                                        height: 64,
                                        paddingHorizontal: 16,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                        borderTopRightRadius: 4,
                                        borderTopLeftRadius: 4,
                                        backgroundColor: item.isSame(this.state.selectedDay, 'day')
                                            ? style.Theme.primary
                                            : item.isSame(this.state.currentDay)
                                                ? '#CCCCCC'
                                                : 'transparent',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            marginBottom: 4,
                                            color: item.isSame(this.state.selectedDay, 'day') ? 'white' : 'black',
                                        }}>
                                        {item.date()}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: item.isSame(this.state.selectedDay, 'day') ? 'white' : 'black' }}>
                                        {item.format('ddd')}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            );
        } else {
            return <ActivityIndicator style={style.containerView} size="large" animating={true} />;
        }
    }
}
