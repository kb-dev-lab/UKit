import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import style from '../../Style';

export default class CourseRow extends React.Component {

    constructor(props) {
        super(props);
        let backgroundColor = '#FFF';
        let borderColor = '#FFF';
        let lineColor = '#FFF';
        switch (this.props.data.color) {
            case '#FFFFA8':
                backgroundColor = '#FFECB3';
                borderColor = '#E65100';
                lineColor = '#FF9800';
                break;
            case '#A8FFFF':
                backgroundColor = '#B2EBF2';
                borderColor = '#006064';
                lineColor = '#00BCD4';
                break;
            case '#D3A8BE':
                backgroundColor = '#E1BEE7';
                borderColor = '#4A148C';
                lineColor = '#9D27B0';
                break;
            case '#D3A8A8':
                backgroundColor = '#FFCDD2';
                borderColor = '#B71C1C';
                lineColor = '#F44336';
                break;
            case '#D3A8FF':
                backgroundColor = '#D1C4E9';
                borderColor = '#311B92';
                lineColor = '#673AB7';
                break;
            case '#A8FFA8':
                backgroundColor = '#B2DFDB';
                borderColor = '#004D40';
                lineColor = '#009688';
                break;
            case '#BEA8D3':
            default:
                backgroundColor = '#C5CAE9';
                borderColor = '#1A237E';
                lineColor = '#3F51B5';
                break;
        }
        this.state = {backgroundColor, borderColor, lineColor};
    }

    render() {
        if (this.props.data.category === 'nocourse') {
            return (
                <View style={style.schedule.course.noCourse}>
                    <Text style={style.schedule.course.noCourseText}>Aucun cours ce jour</Text>
                </View>
            );
        }
        else {
            let annotations, staff, subject, room;
            if (this.props.data.annotation.length > 0) {
                annotations = (
                    <View style={style.schedule.course.line}>
                        <Text style={style.schedule.course.header}>Notes : </Text>
                        <Text style={style.schedule.course.content}>{this.props.data.annotation}</Text>
                    </View>
                );
            }
            if (this.props.data.staff !== 'N/C') {
                staff = (
                    <View style={style.schedule.course.line}>
                        <Text style={style.schedule.course.header}>Avec : </Text>
                        <Text style={style.schedule.course.content}>{this.props.data.staff}</Text>
                    </View>
                );
            }
            if (this.props.data.subject !== 'N/C') {
                subject = (
                    <View style={style.schedule.course.line}>
                        <Text style={style.schedule.course.header}>Matière : </Text>
                        <Text style={style.schedule.course.content}>{this.props.data.subject}</Text>
                    </View>
                );
            }
            if (this.props.data.room !== 'N/C') {
                room = (
                    <View style={style.schedule.course.line}>
                        <Text style={style.schedule.course.header}>Salle : </Text>
                        <Text style={style.schedule.course.content}>{this.props.data.room}</Text>
                    </View>
                );
            }

            return (
                <TouchableHighlight onPress={() => {
                }} underlayColor="white">
                    <View
                        style={[style.schedule.course.row, {backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor}]}>
                        <View style={[style.schedule.course.hours, {borderColor: this.state.lineColor}]}>
                            <View>
                                <Text style={style.schedule.course.hoursText}>{this.props.data.starttime}</Text>
                            </View>
                            <View>
                                <Text style={style.schedule.course.hoursText}>{this.props.data.endtime}</Text>
                            </View>
                        </View>

                        <View style={style.schedule.course.contentBlock}>
                            <View>
                                <Text style={style.schedule.course.title}>{this.props.data.category}</Text>
                            </View>
                            {subject}
                            {staff}
                            {room}
                            <View style={style.schedule.course.line}>
                                <Text style={style.schedule.course.header}>Groupes : </Text>
                                <Text style={style.schedule.course.content}>{this.props.data.group}</Text>
                            </View>
                            {annotations}
                        </View>
                    </View>
                </TouchableHighlight>
            );
        }
    }
}