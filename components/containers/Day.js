import React from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, NetInfo, Text, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';

import style from '../../Style';
import CourseRow from './CourseRow';
import { isArraysEquals, upperCaseFirstLetter } from '../../Utils';
import RequestError from './alerts/RequestError';
import ErrorAlert from './alerts/ErrorAlert';

moment.locale('fr');

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelToken: null,
            groupName: this.props.groupName,
            day: moment(this.props.day),
            schedule: null,
            cacheDate: null,
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
        } else if (this.state.day !== prevState.day) {
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

        if (nextProps.day !== prevState.day) {
            nextState.day = nextProps.day;
        }

        return nextState;
    }

    async getCache(id) {
        let cache = await AsyncStorage.getItem(id);
        if (cache !== null) {
            cache = JSON.parse(cache);
            return cache;
        }
        return null;
    }

    fetchSchedule() {
        if (this.state.loading) {
            this.state.cancelToken.cancel('Another request called');
        }

        const cancelToken = axios.CancelToken.source();
        const groupName = this.state.groupName;
        const data = groupName.split('_');
        const date = this.state.day.format('YYYY/MM/DD');
        const id = `${this.state.groupName}@${date}`;
        let dayData = null;
        let cacheDate = null;

        this.setState({ schedule: null, loading: true, cancelToken }, async () => {
            const isConnected = (await NetInfo.getConnectionInfo()) !== 'none';
            if (isConnected) {
                try {
                    const response = await axios.get(
                        `https://hackjack.info/et/json.php?type=day&name=${data[0]}&group=${data[1]}&date=${date}`,
                        {
                            cancelToken: cancelToken.token,
                        }
                    );

                    dayData = response.data;
                    AsyncStorage.setItem(id, JSON.stringify({ dayData, date: moment() }));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        RequestError.handle(error);

                        let cache = await this.getCache(id);
                        dayData = cache.dayData;
                        cacheDate = cache.date;
                    }
                }
            } else {
                const offlineAlert = new ErrorAlert('Pas de connexion internet', ErrorAlert.durations.SHORT);
                offlineAlert.show();

                let cache = await this.getCache(id);
                dayData = cache.dayData;
                cacheDate = cache.date;
            }

            if (dayData != null) {
                let schedule = this.computeSchedule(dayData, this.state.groupName === this.props.savedGroup);
                this.setState({ schedule, loading: false, cancelToken: null, cacheDate });
            }
        });
    }

    computeSchedule(schedule, isFavorite) {
        let regexUE = RegExp('([0-9][A-Z0-9]+) (.+)', 'im');

        return schedule.map((course) => {
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
    }

    displayDate() {
        return upperCaseFirstLetter(this.state.day.format('dddd DD/MM/YYYY'));
    }

    render() {
        const { theme } = this.props;

        let content,
            cacheMessage = null;
        if (this.state.schedule === null) {
            content = <ActivityIndicator style={style.containerView} size="large" animating={true} />;
        } else if (this.state.schedule instanceof Array) {
            if (this.state.day.day() === 0 || this.state.schedule.length === 0) {
                this.state.schedule = [{ schedule: 0, category: 'nocourse' }];
            }
            if (this.state.cacheDate !== null) {
                cacheMessage = (
                    <View>
                        <Text style={style.offline.groups.text}>
                            Affichage hors ligne datant du {moment(this.state.cacheDate).format('DD/MM/YYYY HH:MM')}
                        </Text>
                    </View>
                );
            }
            content = (
                <FlatList
                    data={this.state.schedule}
                    extraData={this.state}
                    renderItem={(item) => <CourseRow data={item.item} theme={theme} navigation={this.props.navigation} />}
                    keyExtractor={(item, index) => item.schedule + String(index)}
                    style={{ backgroundColor: theme.greyBackground }}
                />
            );
        }

        return (
            <View style={[style.schedule.containerView, { backgroundColor: theme.greyBackground }]}>
                <View style={style.schedule.titleView}>
                    <Text style={[style.schedule.titleText, { color: theme.font }]}>{this.displayDate()}</Text>
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

export default connect(mapStateToProps)(Day);
