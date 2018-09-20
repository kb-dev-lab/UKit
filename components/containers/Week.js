import React from 'react';
import { ActivityIndicator, Platform, FlatList, SectionList, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import style from '../../Style';
import CourseRow from './CourseRow';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { upperCaseFirstLetter } from '../../Utils';
import 'moment/locale/fr';

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
            groupName: this.props.groupName,
            week: this.props.week,
            error: null,
            schedule: null,
        };

        this._source = axios.CancelToken.source();
    }

    componentDidMount() {
        this.fetchSchedule();
    }

    componentWillUnmount() {
        this._source.cancel('Operation canceled due component being unmounted.');
    }

    fetchSchedule() {
        let groupName = this.state.groupName;
        let data = groupName.split('_');
        axios
            .get(`https://hackjack.info/et/json.php?type=week&name=${data[0]}&group=${data[1]}&week=${this.state.week}&clean=true`, {
                cancelToken: this._source.token,
            })
            .then((response) => {
                this.setState({ schedule: response.data, error: null });
            })
            .catch(() => null);
    }

    displayWeek() {
        return 'Semaine ' + this.state.week;
    }

    openDay(day) {
        const { navigate } = this.props.navigation;
        navigate('Day', { groupName: this.state.groupName });
    }

    render() {
        let content;

        if (this.state.schedule === null) {
            if (this.state.error === null) {
                content = <ActivityIndicator style={style.containerView} size="large" animating={true} />;
            } else {
                content = <Text style={style.schedule.noCourse}>Erreur {JSON.stringify(this.state.error)}</Text>;
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
                                return <CourseRow data={item} />;
                            }
                            return (
                                <View style={{ backgroundColor: style.colors.backgroundGrey, paddingVertical: 3 }}>
                                    <TouchableOpacity>
                                        <Text style={style.weekView.dayTitle}>{item.content}</Text>
                                    </TouchableOpacity>
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
            <TouchableOpacity
                onPress={() => this.props.previousFunction()}
                style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                }}>
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
            </TouchableOpacity>
        );
        const nextButton = (
            <TouchableOpacity
                onPress={() => this.props.nextFunction()}
                style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                }}>
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
            </TouchableOpacity>
        );

        return (
            <View style={style.schedule.containerView}>
                <View style={style.schedule.titleView}>
                    {previousButton}
                    <View style={style.schedule.titleTextView}>
                        <Text style={style.schedule.titleText}>{this.displayWeek()}</Text>
                    </View>
                    {nextButton}
                </View>
                <View style={style.schedule.contentView}>{content}</View>
            </View>
        );
    }
}
