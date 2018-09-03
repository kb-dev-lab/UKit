import React from 'react';
import { ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DayComponent from './containers/Day';
import moment from 'moment';
import style from '../Style';
import 'moment/locale/fr';
import Swiper from 'react-native-swiper';
import DayStore from '../stores/DayStore';

moment.locale('fr');

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

        this.state = {
            groupName,
            currentDay: currentDay,
            index: null,
            days: [],
            renderedDays: [],
        };

        this.onDayChange = this.onDayChange.bind(this);
    }

    componentDidMount() {
        const days = DaySwiper.computeDays(this.state.currentDay);

        const renderedDays = days.map((day) => {
            return (
                <DayComponent
                    key={day.dayOfYear()}
                    day={day}
                    groupName={this.state.groupName}
                    nextFunction={() => this.refs.daySwiper.scrollBy(1, true)}
                    previousFunction={() => this.refs.daySwiper.scrollBy(-1, true)}
                />
            );
        });

        this.setState({ index: 2, days, renderedDays });
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
        let nextDay = this.getNextDay(currentDay);
        let previousDay = this.getPreviousDay(currentDay);

        return [this.getPreviousDay(previousDay), previousDay, currentDay, nextDay, this.getNextDay(nextDay)];
    }

    onDayChange(e, state) {
        let index = state.index;

        if (index > this.state.index) {
            if (index >= this.state.days.length - 1) {
                let nextDay = this.state.days[this.state.days.length - 1].clone();

                nextDay.add(1, 'days');
                if (nextDay.isoWeekday() === 7) {
                    nextDay.add(1, 'days');
                }

                const days = this.state.days;
                days.push(nextDay);

                const renderedDays = this.state.renderedDays;
                renderedDays.push(
                    <DayComponent
                        key={nextDay.dayOfYear()}
                        day={nextDay}
                        groupName={this.state.groupName}
                        nextFunction={() => this.refs.daySwiper.scrollBy(1, true)}
                        previousFunction={() => this.refs.daySwiper.scrollBy(-1, true)}
                    />
                );

                this.setState({ days, renderedDays, index });
            } else {
                this.setState({ index });
            }
        } else if (index < this.state.index) {
            this.setState({ index });
        }
    }

    render() {
        if (this.state.index !== null) {
            return (
                <Swiper
                    ref="daySwiper"
                    showsButtons={false}
                    showsPagination={true}
                    index={this.state.index}
                    loadMinimal={true}
                    loadMinimalSize={1}
                    loop={false}
                    onMomentumScrollEnd={this.onDayChange}>
                    {this.state.renderedDays}
                </Swiper>
            );
        } else {
            return <ActivityIndicator style={style.containerView} size="large" animating={true} />;
        }
    }
}
