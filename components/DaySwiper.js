import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
            let size = Platform.OS === 'android' ? 16 : 24;
            return <MaterialCommunityIcons name="calendar" size={size} style={{ color: tintColor }} />;
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
        };
    }

    componentWillMount() {
        setTimeout(() => {
            let days = DayStore.getDays();
            let index = 0;
            for (index; index < days.length; index++) {
                if (this.state.currentDay.isSame(days[index], 'day')) {
                    break;
                }
            }
            this.setState({ index, days });
        });
    }

    render() {
        if (this.state.days.length === 0 || this.state.index === null) {
            return <ActivityIndicator style={style.containerView} size="large" animating={true} />;
        } else {
            return (
                <Swiper
                    ref="daySwiper"
                    showsButtons={false}
                    showsPagination={false}
                    index={this.state.index}
                    loadMinimal={true}
                    loadMinimalSize={7}
                    loop={true}>
                    {this.state.days.map((day, key) => {
                        return (
                            <DayComponent
                                key={key}
                                day={day}
                                groupName={this.state.groupName}
                                nextFunction={(_) => this.refs.daySwiper.scrollBy(1, true)}
                                previousFunction={(_) => this.refs.daySwiper.scrollBy(-1, true)}
                            />
                        );
                    })}
                </Swiper>
            );
        }
    }
}
