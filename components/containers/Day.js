import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';

import style from '../../Style';
import CourseRow from './CourseRow';
import { isArraysEquals, upperCaseFirstLetter } from '../../Utils';

moment.locale('fr');

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelToken: null,
            groupName: this.props.groupName,
            day: moment(this.props.day),
            error: null,
            schedule: null,
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

    fetchSchedule() {
        if (this.state.loading) {
            this.state.cancelToken.cancel('Another request called');
        }

        const cancelToken = axios.CancelToken.source();

        this.setState({ schedule: null, loading: true, cancelToken }, () => {
            const groupName = this.state.groupName;
            const data = groupName.split('_');
            const date = this.state.day.format('YYYY/MM/DD');

            axios
                .get(`https://hackjack.info/et/json.php?type=day&name=${data[0]}&group=${data[1]}&date=${date}`, {
                    cancelToken: cancelToken.token,
                })
                .then((response) => {
                    let schedule = this.computeSchedule(response.data, this.state.groupName === this.props.savedGroup);
                    this.setState({ schedule, error: null, loading: false, cancelToken: null });
                })
                .catch((e) => {
                    if (!axios.isCancel(e)) {
                        this.setState({ error: e, loading: false, cancelToken: null });
                    }
                });
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

        let content;
        if (this.state.schedule === null) {
            if (this.state.error === null) {
                content = <ActivityIndicator style={style.containerView} size="large" animating={true} />;
            } else {
                content = <Text style={[style.schedule.noCourse, { color: theme.font }]}>Erreur {JSON.stringify(this.state.error)}</Text>;
            }
        } else if (this.state.schedule instanceof Array) {
            if (this.state.day.day() === 0 || this.state.schedule.length === 0) {
                this.state.schedule = [{ schedule: 0, category: 'nocourse' }];
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
