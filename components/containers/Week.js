import React from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity, SectionList, Platform} from 'react-native';
import axios from 'axios';
import style from '../../Style';
import CourseRow from "./courseRow";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {upperCaseFirstLetter} from '../../Utils';
import 'moment/locale/fr';

export default class Week extends React.Component {
    static navigationOptions = {
        tabBarLabel: "Semaine",
        tabBarIcon: ({tintColor}) => {
            let size = (Platform.OS === 'android') ? 16 : 24;
            return (
                <MaterialCommunityIcons
                    name="calendar-multiple"
                    size={size}
                    style={{color: tintColor}}
                />
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            groupName: this.props.groupName,
            week: this.props.week,
            error: null,
            schedule: null
        };
        this.mounted = false;
    }

    componentWillMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.fetchSchedule();
    }

    fetchSchedule() {
        let groupName = this.state.groupName;
        let data = groupName.split('_');
        axios.get(`https://hackjack.info/et/json.php?type=week&name=${data[0]}&group=${data[1]}&week=${this.state.week}&clean=true`)
            .then((response) => {
                if (this.mounted) {
                    this.setState({schedule: response.data, error: null});
                }
            });
    }

    displayWeek() {
        return "Semaine " + this.state.week;
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
            this.state.schedule.forEach(function (day) {
                let sectionContent = {
                    key: '',
                    data: []
                };
                sectionContent.key = upperCaseFirstLetter(moment.unix(day.dayTimestamp).format('dddd DD/MM/YYYY'));
                if (day.courses.length === 0) {
                    day.courses = [{dayNumber: day.dayNumber, category: 'nocourse'}];
                }
                sectionContent.data = day.courses;
                sections.push(sectionContent);
            });
            content =
                <View style={style.schedule.contentView}>
                    <SectionList
                        renderItem={({item}) => <CourseRow data={item}/>}
                        renderSectionHeader={({section}) => (
                            <View style={{backgroundColor: style.colors.backgroundGrey, paddingVertical:3}}>
                                <Text style={style.weekView.dayTitle}>{section.key}</Text>
                            </View>)}
                        sections={sections}
                        keyExtractor={(item, index) => String(item.dayNumber) + String(index)}
                    />
                </View>;
        }
        let previousButton, nextButton;
        if (Platform.OS === 'android') {
            previousButton = (<View style={{flex: 1}}></View>);
            nextButton = (<View style={{flex: 1}}></View>);
        } else {
            previousButton = (<TouchableOpacity onPress={() => this.props.previousFunction()} style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center'
            }}>
                <View style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row'
                }}>
                    <MaterialIcons
                        name="navigate-before"
                        size={32}
                        style={{
                            color: 'black'
                        }}
                    />
                </View>
            </TouchableOpacity>);
            nextButton = (<TouchableOpacity onPress={() => this.props.nextFunction()} style={{
                flex: 1,
                alignSelf: "stretch",
                justifyContent: 'center'
            }}>
                <View style={{
                    justifyContent: 'flex-end',
                    flexDirection: 'row'
                }}>
                    <MaterialIcons
                        name="navigate-next"
                        size={32}
                        style={{
                            color: "black"
                        }}
                    />
                </View>
            </TouchableOpacity>);
        }
        return (
            <View style={style.schedule.containerView}>
                <View style={style.schedule.titleView}>
                    {previousButton}
                    <View style={style.schedule.titleTextView}>
                        <Text style={style.schedule.titleText}>{this.displayWeek()}</Text>
                    </View>
                    {nextButton}
                </View>
                <View style={style.schedule.contentView}>
                    {content}
                </View>
            </View>
        );
    }
}