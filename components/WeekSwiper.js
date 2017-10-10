import React from 'react';
import {Platform, ActivityIndicator, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WeekComponent from './containers/Week';
import moment from 'moment';
import style from '../Style';
import 'moment/locale/fr';
import Swiper from 'react-native-swiper';
import WeekStore from "../stores/WeekStore";

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
        let groupName = this.props.screenProps.groupName;

        this.state = {
            groupName,
            week: parseInt(currentDay.isoWeek()),
            currentDay,
            weeks: [],
            index: null
        };
    }

    componentWillMount() {
        setTimeout(() => {
            let weeks = WeekStore.getWeeks();
            let index = 0;
            for (index; index < weeks.length; index++) {
                if (parseInt(this.state.currentDay.isoWeek()) === weeks[index]) {
                    break;
                }
            }
            this.setState({index, weeks});
        });
    }

    render() {
        if (this.state.weeks.length === 0 || this.state.index === null) {
            return (
                <View style={{flex: 1}}>
                    <ActivityIndicator style={style.containerView} size="large" animating={false}/>
                </View>
            );
        } else {
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