import React from 'react';
import {Platform, ActivityIndicator, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WeekComponent from './containers/Week';
import moment from 'moment';
import style from '../Style';
import 'moment/locale/fr';
import Swiper from 'react-native-swiper';

moment.locale('fr');

export default class WeekSwiper extends React.Component {
    static navigationOptions = {
        tabBarLabel: "Semaine",
        tabBarIcon: ({tintColor}) => {
            let size = (Platform.OS === 'android') ? 16 : 24;
            return (
                <MaterialCommunityIcons
                    name="calendar-multiple"
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
            week: parseInt(currentDay.isoWeek()),
            currentDay,
            startYear: (currentMonth > 7) ? currentYear : currentYear - 1,
            endYear: (currentMonth > 7) ? currentYear + 1 : currentYear,
            weeks: [],
            index: null
        };
    }

    componentWillMount() {
        setTimeout(_ => this.generateAllWeeks());
    }

    generateAllWeeks() {
        let weeks = [];
        let day = moment().set({year: this.state.startYear, month: 7, date: 20});
        let lastDay = moment().set({year: this.state.endYear, month: 6, date: 31});
        let index = 0;
        let currentIndex = 0;
        while (day.isBefore(lastDay, 'day')) {
            if (day.isSame(this.state.currentDay, 'week')) {
                let isSunday = (day.isoWeekday() === 7);
                if (!isSunday) {
                    currentIndex = index;
                } else {
                    currentIndex = index + 1;
                }
            }
            weeks.push(parseInt(day.isoWeek()));
            index++;

            day = day.add(1, 'weeks');
        }
        this.setState({index: Math.min(currentIndex, index - 1), weeks});
    }

    render() {
        console.log('render');
        if (this.state.weeks.length === 0 || this.state.index === null) {
            return (
                <View style={{flex: 1}}>
                    <ActivityIndicator style={style.containerView} size="large" animating={true}/>
                </View>
            );
        } else {
            console.log('Index found :', this.state.index);
            return (
                <View style={{flex: 1}}>
                    <Swiper ref="weekSwiper"
                            showsButtons={false}
                            showsPagination={false}
                            index={this.state.index}
                            loadMinimal={true}
                            loadMinimalSize={7}
                            loop={true}
                    >
                        {this.state.weeks.map((week, key) => {
                            return (<WeekComponent key={key}
                                                   week={week}
                                                   groupName={this.state.groupName}
                                                   nextFunction={_ => this.refs.weekSwiper.scrollBy(1, true)}
                                                   previousFunction={_ => this.refs.weekSwiper.scrollBy(-1, true)}/>);
                        })}
                    </Swiper>
                </View>
            );
        }
    }
}