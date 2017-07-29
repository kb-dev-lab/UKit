import React from 'react';
import {View, ListView, ActivityIndicator, Text, TouchableOpacity, SectionList} from 'react-native';
import axios from 'axios';
import style from '../Style';
import CourseRow from "./containers/courseRow";
import moment from 'moment';
import {upperCaseFirstLetter} from '../Utils';
import 'moment/locale/fr';

export default class Week extends React.Component {
    static navigationOptions = {
        title: "Semaine"
    };

    constructor(props) {
        super(props);
        this.state = {
            groupName: this.props.screenProps.groupName,
            week: moment().isoWeek(),
            error: null,
            schedule: null
        };
        this.fetchSchedule();
    }

    fetchSchedule() {
        let groupName = this.state.groupName;
        let data = groupName.split('_');
        axios.get(`https://hackjack.info/et/json.php?type=week&name=${data[0]}&group=${data[1]}&week=${this.state.week}&clean=true`)
            .then((response) => {
                this.setState({schedule: response.data, error: null});
            })
        // .catch((error) => {
        //     console.error(error);
        //     this.setState({schedule: null, error: error});
        // });
    }

    displayWeek() {
        return "Semaine " + this.state.week;
    }

    nextWeek() {
        this.setState({week: this.state.week + 1, schedule: null});
        this.fetchSchedule();
    }

    previousWeek() {
        this.setState({week: this.state.week - 1, schedule: null});
        this.fetchSchedule();
    }

    render() {
        let content;
        if (this.state.schedule === null) {
            if (this.state.error === null) {
                content = <ActivityIndicator style={style.containerView} size="large" animating={true}/>;
            } else {
                content = <Text style={style.schedule.noCourse}>Erreur {JSON.stringify(this.state.error)}</Text>
            }
        } else if (this.state.schedule instanceof Array) {
            let sections = [];
            this.state.schedule.forEach(function(day) {
                let sectionContent = {
                    key: '',
                    data: []
                };
                sectionContent.key = upperCaseFirstLetter(moment.unix(day.dayTimestamp).format('dddd DD/MM/YYYY'));
                sectionContent.data = day.courses;
                sections.push(sectionContent);
            });
            content =
                <View style={style.schedule.contentView}>
                    <SectionList
                        renderItem={({item}) => <CourseRow data={item}/>}
                        renderSectionHeader={({section}) => <Text style={style.weekView.dayTitle}>{section.key}</Text>}
                        sections={sections}
                        keyExtractor={(item, index) => {
                            return String(item.dayNumber) + String(index);
                        }}
                    />
                </View>;
        }
        return (
            <View style={style.schedule.containerView}>
                <View style={style.schedule.titleView}>
                    <Text style={style.schedule.titleText}>{this.displayWeek()}</Text>
                </View>
                <View style={style.schedule.contentView}>
                    {content}
                </View>
                <View style={style.schedule.actionView}>
                    <View style={style.schedule.actionButtonView}>
                        <TouchableOpacity style={style.schedule.actionButton} onPress={() => this.previousWeek()}>
                            <Text style={style.schedule.actionButtonText}>Semaine précédente</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.schedule.actionButtonView}>
                        <TouchableOpacity style={style.schedule.actionButton} onPress={() => this.nextWeek()}>
                            <Text style={style.schedule.actionButtonText}>Semaine suivante</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}