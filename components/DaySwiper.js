import React from 'react';
import { ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DayComponent from './containers/Day';
import moment from 'moment';
import style from '../Style';
import 'moment/locale/fr';
import Swiper from './Swiper';
// import Swiper from 'react-native-swiper';
// import DayStore from '../stores/DayStore';

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
        this.onIndexChange = this.onIndexChange.bind(this);
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

    onIndexChange(index) {
        // console.log({ index, stateIndex: this.state.index });
    }

    onDayChange(e, state, context) {
        let index = state.index;

        if (index > this.state.index) {
            if (index >= this.state.days.length - 2) {
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
            if (index <= 1) {
                let previousDays = this.state.days[0].clone();

                previousDays.subtract(1, 'days');
                if (previousDays.isoWeekday() === 7) {
                    previousDays.subtract(1, 'days');
                }

                const days = this.state.days;
                days.unshift(previousDays);

                const renderedDays = this.state.renderedDays;
                renderedDays.unshift(
                    <DayComponent
                        key={previousDays.dayOfYear()}
                        day={previousDays}
                        groupName={this.state.groupName}
                        nextFunction={() => this.refs.daySwiper.scrollBy(1, true)}
                        previousFunction={() => this.refs.daySwiper.scrollBy(-1, true)}
                    />
                );

                this.setState({ days, renderedDays, index: 2 });
            } else {
                this.setState({ index: index });
            }
        } else {
            console.log('NOTHING');
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
                    loadMinimalSize={3}
                    loop={false}
                    dynamic={true}
                    onMomentumScrollEnd={this.onDayChange}>
                    {this.state.renderedDays}
                </Swiper>
            );
        } else {
            return <ActivityIndicator style={style.containerView} size="large" animating={true} />;
        }
    }
}
