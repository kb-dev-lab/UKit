import React from 'react';
import {View, FlatList, ActivityIndicator, Text, TouchableHighlight} from 'react-native';
import axios from 'axios';
import style from '../Style';
import CourseRow from "./containers/courseRow";
import moment from 'moment';
import {upperCaseFirstLetter} from '../Utils';
import 'moment/locale/fr';

moment.locale('fr');

export default class Day extends React.Component {
    static navigationOptions = {
        title: "Jour"
    };

    constructor(props) {
        super(props);
        let day = moment();
        if (day.day() === 6) {
            day = day.add(1, 'days');
        }
        this.state = {
            groupName: this.props.screenProps.groupName,
            day: day,
            error: null,
            schedule: null
        };
        this.fetchSchedule();
    }

    fetchSchedule() {
        let groupName = this.state.groupName;
        let data = groupName.split('_');
        let date = this.state.day.format('YYYY/MM/DD');
        axios.get(`https://hackjack.info/et/json.php?type=day&name=${data[0]}&group=${data[1]}&date=${date}`)
            .then((response) => {
                this.setState({schedule: response.data, error: null});
            }).catch((error) => {
            console.error(error);
            this.setState({schedule: null, error: error});
        });
    }

    displayDate() {
        return upperCaseFirstLetter(this.state.day.format('dddd DD/MM/YYYY'));
    }

    nextDay() {
        let incrementDay = 1;
        if (this.state.day.day() === 6) {
            incrementDay = 2;
        }
        this.setState({day: this.state.day.add(incrementDay, 'days'), schedule: null});
        this.fetchSchedule();
    }

    previousDay() {
        let decrementDay = 1;
        if (this.state.day.day() === 1) {
            decrementDay = 2;
        }
        this.setState({day: this.state.day.subtract(decrementDay, 'days'), schedule: null});
        this.fetchSchedule();
    }

    render() {
        let content;
        if (this.state.schedule === null) {
            if (this.state.error === null) {
                content = <ActivityIndicator style={style.containerView} size="large" animating={true}/>;
            } else {
                content = <Text style={style.schedule.error}>Erreur {this.state.error.response.status}</Text>
            }
        } else if (this.state.schedule instanceof Array) {
            if (this.state.schedule.length === 0) {
                this.state.schedule = [{schedule: 0, category: 'nocourse'}];
            }
                content = <FlatList
                    data={this.state.schedule}
                    extraData={this.state}
                    renderItem={(item) => <CourseRow data={item.item}/>}
                    keyExtractor={(item, index) => item.schedule + String(index)}
                />;
        }
        return (
            <View style={style.schedule.containerView}>
                <View style={style.schedule.titleView}>
                    <Text style={style.schedule.titleText}>{this.displayDate()}</Text>
                </View>
                <View style={style.schedule.contentView}>
                    {content}
                </View>
                <View style={style.schedule.actionView}>
                    <View style={style.schedule.actionButtonView}>
                        <TouchableHighlight underlayColor="#333" style={style.schedule.actionButton} onPress={() => this.previousDay()}>
                            <Text style={style.schedule.actionButtonText}>Jour précédent</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={style.schedule.actionButtonView}>
                        <TouchableHighlight underlayColor="#333" style={style.schedule.actionButton}
                                             onPress={() => this.nextDay()}>
                            <Text style={style.schedule.actionButtonText}>Jour suivant</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}