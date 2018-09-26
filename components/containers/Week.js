import React from 'react';
import { ActivityIndicator, Platform, ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'moment/locale/fr';

import style from '../../Style';
import DayWeek from './ui/DayWeek';

export default class Week extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Semaine',
        tabBarIcon: ({ tintColor }) => {
            let size = Platform.OS === 'android' ? 16 : 24;
            return <MaterialCommunityIcons name="calendar-multiple" size={size} style={{ color: tintColor }} />;
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            cancelToken: null,
            groupName: this.props.groupName,
            week: this.props.week,
            error: null,
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
        if (this.state.week !== prevState.week) {
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

        this.setState({ schedule: null, loading: true, cancelToken }, () => {
            const groupName = this.state.groupName;
            const data = groupName.split('_');

            axios
                .get(`https://hackjack.info/et/json.php?type=week&name=${data[0]}&group=${data[1]}&week=${this.state.week}&clean=true`, {
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

    displayWeek() {
        return 'Semaine ' + this.state.week;
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
            content = <ScrollView>
                    <DayWeek schedule={this.state.schedule[0]} theme={theme} />
                    <DayWeek schedule={this.state.schedule[1]} theme={theme} />
                    <DayWeek schedule={this.state.schedule[2]} theme={theme} />
                    <DayWeek schedule={this.state.schedule[3]} theme={theme} />
                    <DayWeek schedule={this.state.schedule[4]} theme={theme} />
                    <DayWeek schedule={this.state.schedule[5]} theme={theme} />
                </ScrollView>;
        }

        return (
            <View style={[style.schedule.containerView, { backgroundColor: theme.greyBackground }]}>
                <View style={style.schedule.titleView}>
                    <View style={style.schedule.titleTextView}>
                        <Text style={[style.schedule.titleText, { color: theme.font }]}>{this.displayWeek()}</Text>
                    </View>
                </View>
                <View style={style.schedule.contentView}>{content}</View>
            </View>
        );
    }
}
