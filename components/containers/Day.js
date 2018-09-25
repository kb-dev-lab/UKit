import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';

import style from '../../Style';
import CourseRow from './CourseRow';
import { upperCaseFirstLetter } from '../../Utils';

moment.locale('fr');

export default class Day extends React.Component {
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
        if (this.state.day !== prevState.day) {
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
                    this.setState({ schedule: response.data, error: null, loading: false, cancelToken: null });
                })
                .catch((e) => {
                    if (!axios.isCancel(e)) {
                        this.setState({ error: e, loading: false, cancelToken: null });
                    }
                });
        });
    }

    displayDate() {
        return upperCaseFirstLetter(this.state.day.format('dddd DD/MM/YYYY'));
    }

    render() {
        let content;
        if (this.state.schedule === null) {
            if (this.state.error === null) {
                content = <ActivityIndicator style={style.containerView} size="large" animating={true} />;
            } else {
                content = <Text style={style.schedule.error}>Erreur {this.state.error.response.status}</Text>;
            }
        } else if (this.state.schedule instanceof Array) {
            if (this.state.day.day() === 0 || this.state.schedule.length === 0) {
                this.state.schedule = [{ schedule: 0, category: 'nocourse' }];
            }
            content = (
                <FlatList
                    data={this.state.schedule}
                    extraData={this.state}
                    renderItem={(item) => <CourseRow data={item.item} />}
                    keyExtractor={(item, index) => item.schedule + String(index)}
                />
            );
        }

        return (
            <View style={style.schedule.containerView}>
                <View style={style.schedule.titleView}>
                    <Text style={[style.schedule.titleText]}>{this.displayDate()}</Text>
                </View>
                <View style={style.schedule.contentView}>{content}</View>
            </View>
        );
    }
}
