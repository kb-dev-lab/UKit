import React from 'react';
import {Platform, View, ActivityIndicator} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DayComponent from './Day';
import moment from 'moment';
import style from '../Style';
import 'moment/locale/fr';
import Swiper from 'react-native-swiper';

moment.locale('fr');

export default class DaySwiper extends React.Component {
    static navigationOptions = {
        tabBarLabel: "Jour",
        tabBarIcon: ({tintColor}) => {
            let size = (Platform.OS === 'android') ? 16 : 24;
            return (
                <MaterialCommunityIcons
                    name="calendar"
                    size={size}
                    style={{color: tintColor}}
                />
            )
        }
    };

    constructor(props) {
        super(props);
        let currentDay = moment();
        if (currentDay.isoWeekday() === 7) {
            currentDay = currentDay.add(1, 'days');
        }
        let currentMonth = currentDay.month();
        let currentYear = currentDay.year();
        let groupName = this.props.screenProps.groupName;
        this.state = {
            groupName,
            currentDay: currentDay,
            index: null,
            startYear: (currentMonth > 7) ? currentYear : currentYear - 1,
            endYear: (currentMonth > 7) ? currentYear + 1 : currentYear,
            scrollEnabled: true,
            days: []
        };
        this.mounted = false;
    }

    componentWillMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        setTimeout(_ => this.generateAllDays());
    }

    generateAllDays() {
        let days = [];
        let day = moment().set({year: this.state.startYear, month: 7, date: 20});
        let index = 0;
        let currentIndex = 0;
        while (!(day.date() === 31 && day.month() === 6 && day.year() === this.state.endYear)) {
            let isSunday = (day.isoWeekday() === 7);
            if (day.isSame(this.state.currentDay, 'day')) {
                if (!isSunday) {
                    currentIndex = index;
                } else {
                    currentIndex = index + 1;
                }
            }
            if (!isSunday) {
                days.push(day.clone());
                index++;
            }
            day = day.add(1, 'days');
        }
        if (this.mounted) {
            this.setState({index: Math.min(currentIndex, index - 1), days});
        }
    }

    render() {
        if (this.state.days.length === 0 || this.state.index === null) {
            return (<ActivityIndicator style={style.containerView} size="large" animating={true}/>);
        } else {
            return (
                <Swiper ref="daySwiper"
                        showsButtons={false}
                        showsPagination={false}
                        index={this.state.index}
                        loadMinimal={true}
                        loadMinimalSize={7}
                        loop={true}
                >
                    {this.state.days.map((day, key) => {
                        return (<DayComponent key={key}
                                              day={day}
                                              groupName={this.state.groupName}
                                              nextFunction={_ => this.refs.daySwiper.scrollBy(1, false)}
                                              previousFunction={_ => this.refs.daySwiper.scrollBy(-1, false)}/>);
                    })}
                </Swiper>
            );
        }
    }
}