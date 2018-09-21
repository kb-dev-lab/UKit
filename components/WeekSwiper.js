import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WeekComponent from './containers/Week';
import moment from 'moment';
import style from '../Style';
import 'moment/locale/fr';
import Swiper from './Swiper';

moment.locale('fr');
const swiperReference = 'weekSwiper';

export default class WeekSwiper extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Semaine',
        tabBarIcon: ({ tintColor }) => {
            return <MaterialCommunityIcons name="calendar-multiple" size={24} style={{ color: tintColor }} />;
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
            currentWeek: parseInt(currentDay.isoWeek()),
            currentDay,
            weeks: [],
            index: null,
            renderedWeeks: [],
        };

        this.onWeekChange = this.onWeekChange.bind(this);
    }

    componentDidMount() {
        let weeks = WeekSwiper.computeWeeks(this.state.currentWeek);

        const renderedWeeks = weeks.map((week, key) => {
            return (
                <WeekComponent
                    key={key}
                    week={week}
                    groupName={this.state.groupName}
                    nextFunction={() => this.refs[swiperReference].scrollBy(1, true)}
                    previousFunction={() => this.refs[swiperReference].scrollBy(-1, true)}
                />
            );
        });
        this.setState({ index: 3, weeks, renderedWeeks });
    }

    static computeWeeks(currentWeek) {
        return [currentWeek - 3, currentWeek - 2, currentWeek - 1, currentWeek, currentWeek + 1, currentWeek + 2, currentWeek + 3];
    }

    onWeekChange(e, state, context) {
        let index = state.index;

        if (index > this.state.index) {
            if (index >= this.state.weeks.length - 2) {
                // TODO : Avoid numbers > 53
                let nextWeek = this.state.weeks[this.state.weeks.length - 1] + 1;

                const weeks = this.state.weeks;
                weeks.push(nextWeek);

                const renderedWeeks = this.state.renderedWeeks;
                renderedWeeks.push(
                    <WeekComponent
                        key={nextWeek}
                        week={nextWeek}
                        groupName={this.state.groupName}
                        nextFunction={() => this.refs[swiperReference].scrollBy(1, true)}
                        previousFunction={() => this.refs[swiperReference].scrollBy(-1, true)}
                    />
                );

                this.setState({ weeks, renderedWeeks, index });
            }
        } else if (index < this.state.index) {
            if (index <= 0) {
                // TODO : Avoid negative numbers
                let previousWeek = this.state.weeks[0] - 1;

                const weeks = this.state.weeks;
                weeks.unshift(previousWeek);

                const renderedWeeks = this.state.renderedWeeks;
                renderedWeeks.unshift(
                    <WeekComponent
                        key={previousWeek}
                        week={previousWeek}
                        groupName={this.state.groupName}
                        nextFunction={() => this.refs[swiperReference].scrollBy(1, true)}
                        previousFunction={() => this.refs[swiperReference].scrollBy(-1, true)}
                    />
                );

                this.setState({ weeks, renderedWeeks, index: 1 });
            }
        }
    }

    render() {
        if (this.state.index !== null) {
            return (
                <View style={{ flex: 1 }}>
                    <Swiper
                        ref={swiperReference}
                        showsButtons={false}
                        showsPagination={true}
                        index={this.state.index}
                        loadMinimal={true}
                        dynamic={true}
                        loadMinimalSize={3}
                        onMomentumScrollEnd={this.onWeekChange}>
                        {this.state.renderedWeeks}
                    </Swiper>
                </View>
            );
        } else {
            return <ActivityIndicator style={style.containerView} size="large" animating={true} />;
        }
    }
}
