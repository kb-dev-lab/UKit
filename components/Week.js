import React from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

import style from '../Style';
import DayWeek from './ui/DayWeek';
import { isArraysEquals } from '../utils';
import ErrorAlert from './alerts/ErrorAlert';
import RequestError from './alerts/RequestError';
import DeviceUtils from '../utils/DeviceUtils';
import Translator from '../utils/translator';

class Week extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cancelToken: null,
            groupName: this.props.groupName,
            week: this.props.week,
            cacheDate: null,
            schedule: null,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
        };
    }

    componentDidMount() {
        this.fetchSchedule();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.savedGroup !== prevProps.savedGroup) {
            if (this.props.filters.length > 0) {
                this.fetchSchedule();
            }
        } else if (this.state.week !== prevState.week) {
            this.fetchSchedule();
        } else if (!isArraysEquals(this.props.filters, prevProps.filters)) {
            this.fetchSchedule();
        }
    }

    componentWillUnmount() {
        if (this.state.cancelToken) {
            this.state.cancelToken.cancel('Operation canceled due component being unmounted.');
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const nextState = {};

        if (nextProps.week !== prevState.week) {
            nextState.week = nextProps.week;
        }

        return nextState;
    }

    fetchSchedule() {
        if (this.state.loading) {
            this.state.cancelToken.cancel('Another request called');
        }

        const cancelToken = axios.CancelToken.source();
        const groupName = this.state.groupName;
        const data = groupName.split('_');
        const id = `${this.state.groupName}@Week${this.state.week}`;
        let weekData = null;
        let cacheDate = null;

        this.setState({ schedule: null, loading: true, cancelToken }, async () => {
            if (await DeviceUtils.isConnected()) {
                try {
                    const response = await axios.get(
                        `https://hackjack.info/et/json.php?type=week&name=${data[0]}&group=${data[1]}&week=${this.state.week}&clean=true`,
                        {
                            cancelToken: cancelToken.token,
                        }
                    );
                    weekData = response.data;
                    AsyncStorage.setItem(id, JSON.stringify({ weekData, date: moment() }));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        RequestError.handle(error);

                        let cache = await this.getCache(id);
                        weekData = cache.weekData;
                        cacheDate = cache.date;
                    }
                }
            } else {
                const offlineAlert = new ErrorAlert('Pas de connexion internet', ErrorAlert.durations.SHORT);
                offlineAlert.show();

                let cache = await this.getCache(id);
                weekData = cache.weekData;
                cacheDate = cache.date;
            }

            if (weekData != null) {
                this.setState({ schedule: weekData, loading: false, cancelToken: null, cacheDate });
            }
        });
    }

    displayWeek() {
        return Translator.get('WEEK') + ' ' + this.state.week;
    }

    computeSchedule(schedule, isFavorite) {
        let regexUE = RegExp('([0-9][A-Z0-9]+) (.+)', 'im');

        schedule.courses = schedule.courses.map((course) => {
            if (course.subject && course.subject !== 'N/C') {
                let match = regexUE.exec(course.subject);
                if (match && match.length === 3) {
                    course.UE = match[1];
                    course.subject = `${match[2]}`;
                } else {
                    course.UE = null;
                }
            }
            if (isFavorite && course.UE !== null && this.props.filters instanceof Array && this.props.filters.includes(course.UE)) {
                course = { schedule: 0, category: 'masked' };
            }
            return course;
        });
        return schedule;
    }

    render() {
        const { theme } = this.props;
        let content,
            cacheMessage = null;

        if (this.state.schedule === null) {
            content = <ActivityIndicator style={style.containerView} size="large" animating={true} />;
        } else if (this.state.schedule instanceof Array) {
            let isFavorite = this.state.groupName === this.props.savedGroup;

            if (this.state.cacheDate !== null) {
                cacheMessage = (
                    <View>
                        <Text style={style.offline.groups.text}>
                            {Translator.get('OFFLINE_DISPLAY_FROM_DATE', moment(this.state.cacheDate).format('lll'))}
                        </Text>
                    </View>
                );
            }

            content = (
                <ScrollView>
                    {this.state.schedule.map((schedule, index) => {
                        return (
                            <DayWeek
                                key={index}
                                schedule={this.computeSchedule(schedule, isFavorite)}
                                navigation={this.props.navigation}
                                theme={theme}
                            />
                        );
                    })}
                </ScrollView>
            );
        }

        return (
            <View style={[style.schedule.containerView, { backgroundColor: theme.greyBackground }]}>
                <View style={style.schedule.titleView}>
                    <View style={style.schedule.titleTextView}>
                        <Text style={[style.schedule.titleText, { color: theme.font }]}>{this.displayWeek()}</Text>
                    </View>
                </View>
                {cacheMessage}
                <View style={style.schedule.contentView}>{content}</View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        savedGroup: state.favorite.groupName,
        filters: state.filters.filters,
    };
};

export default connect(mapStateToProps)(Week);
