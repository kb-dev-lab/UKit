import React from 'react';
import { ActivityIndicator, FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import style from '../../Style';
import CourseRow from './CourseRow';
import { MaterialIcons } from '@expo/vector-icons';
import { upperCaseFirstLetter } from '../../Utils';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

export default class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: this.props.groupName,
            day: moment(this.props.day),
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
        let date = this.state.day.format('YYYY/MM/DD');
        axios
            .get(`https://hackjack.info/et/json.php?type=day&name=${data[0]}&group=${data[1]}&date=${date}`, { cancelToken: this._source.token })
            .then((response) => {
                this.setState({ schedule: response.data, error: null });
            })
            .catch(() => null);
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
            if (this.state.schedule.length === 0) {
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
                        <Text style={[style.schedule.titleText]}>{this.displayDate()}</Text>
                    </View>
                    {nextButton}
                </View>
                <View style={style.schedule.contentView}>{content}</View>
            </View>
        );
    }
}
