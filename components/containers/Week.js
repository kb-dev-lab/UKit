import React from 'react';
import { ActivityIndicator, FlatList, Platform, Text, View } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/fr';

import style from '../../Style';
import CourseRow from './CourseRow';
import { upperCaseFirstLetter } from '../../Utils';

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

    openDay(day) {
        const { navigate } = this.props.navigation;

        navigate('Day', { groupName: this.state.groupName });
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
            let courses = this.state.schedule.reduce((allCourses, day) => {
                let content = [
                    {
                        category: false,
                        type: 'header',
                        content: upperCaseFirstLetter(moment.unix(day.dayTimestamp).format('dddd DD/MM/YYYY')),
                        schedule: 'header' + day.dayTimestamp,
                    },
                ];
                if (day.courses.length === 0) {
                    day.courses = [{ dayNumber: day.dayNumber, schedule: 'nocourse', category: 'nocourse' }];
                }

                return allCourses.concat(content.concat(day.courses));
            }, []);

            content = (
                <View style={style.schedule.contentView}>
                    <FlatList
                        renderItem={({ item }) => {
                            if (item.category) {
                                return <CourseRow data={item} theme={theme} />;
                            }

                            return (
                                <View style={{ backgroundColor: theme.greyBackground, paddingVertical: 4 }}>
                                    <Text style={[style.weekView.dayTitle, { color: theme.font }]}>{item.content}</Text>
                                </View>
                            );
                        }}
                        data={courses}
                        initialNumToRender={20}
                        onEndReachedThreshold={0.5}
                        keyExtractor={(item, index) => String(item.dayNumber) + String(index) + item.schedule}
                    />
                </View>
            );
        }
        const previousButton = (
            <View
                style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                }}>
                <MaterialIcons
                    name="navigate-before"
                    size={32}
                    style={{
                        color: 'black',
                    }}
                />
            </View>
        );
        const nextButton = (
            <View
                style={{
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                }}>
                <MaterialIcons
                    name="navigate-next"
                    size={32}
                    style={{
                        color: 'black',
                    }}
                />
            </View>
        );

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
