import React from 'react';
import {View, ListView, ActivityIndicator, Text, Button} from 'react-native';
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
        this.state = {
            groupName: this.props.screenProps.groupName,
            day: moment(),
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
                this.setState({schedule: response.data});
            });
    }

    displayDate() {
        return upperCaseFirstLetter(this.state.day.format('dddd DD/MM/YYYY'));
    }

    nextDay() {
        this.setState({day: this.state.day.add(1, 'days'), schedule: null});
        this.fetchSchedule();

    }

    previousDay() {
        this.setState({day: this.state.day.subtract(1, 'days'), schedule: null});
        this.fetchSchedule();

    }

    render() {
        if (this.state.schedule === null) {
            return (
                <View style={style.schedule.containerView}>
                    <View style={style.schedule.titleView}>
                        <Text style={style.schedule.titleText}>{this.displayDate()}</Text>
                    </View>
                    <View style={style.schedule.contentView}>
                        <ActivityIndicator style={style.containerView} size="large" animating={true}/>
                    </View>
                    <View style={style.schedule.actionView}>
                        <Button style={style.schedule.actionButton} onPress={() => this.previousDay()} title="Jour précédent"/>
                        <Button style={style.schedule.actionButton} onPress={() => this.nextDay()} title="Jour suivant"/>
                    </View>
                </View>
            );
        } else if (this.state.schedule instanceof Array) {
            if (this.state.schedule.length === 0) {
                return (
                    <View style={style.schedule.containerView}>
                        <View style={style.schedule.titleView}>
                            <Text style={style.schedule.titleText}>{this.displayDate()}</Text>
                        </View>
                        <View style={style.schedule.contentView}>
                            <Text style={style.schedule.noCourse}>Pas de cours</Text>
                        </View>
                        <View style={style.schedule.actionView}>
                            <Button style={style.schedule.actionButton} onPress={() => this.previousDay()} title="Jour précédent"/>
                            <Button style={style.schedule.actionButton} onPress={() => this.nextDay()} title="Jour suivant"/>
                        </View>
                    </View>
                );
            } else {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                return (
                    <View style={style.schedule.containerView}>
                        <View style={style.schedule.titleView}>
                            <Text style={style.schedule.titleText}>{this.displayDate()}</Text>
                        </View>
                        <View style={style.schedule.contentView}>
                            <ListView
                                dataSource={ds.cloneWithRows(this.state.schedule)}
                                pageSize={10}
                                renderRow={(row, j, index) => <CourseRow data={row} index={parseInt(index)}/>}
                            />
                        </View>
                        <View style={style.schedule.actionView}>
                            <Button style={style.schedule.actionButton} onPress={() => this.previousDay()} title="Jour précédent"/>
                            <Button style={style.schedule.actionButton} onPress={() => this.nextDay()} title="Jour suivant"/>
                        </View>
                    </View>
                );
            }
        }
    }
}