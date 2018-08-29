import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import style from '../../Style';
import OpenMapButton from './buttons/OpenMapButton';

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
        this.state = { backgroundColor, borderColor, lineColor };
    }

    render() {
        if (this.props.data.category === 'nocourse') {
            return (
                <View style={style.schedule.course.noCourse}>
                    <Text style={style.schedule.course.noCourseText}>Aucun cours ce jour</Text>
                </View>
            );
        } else {
            let annotations, staff, subject, room, group;
            let annotationsTitle, staffTitle, roomTitle, groupTitle;

            if (this.props.data.annotation.length > 0) {
                annotationsTitle = <Text style={style.schedule.course.header}>Notes : </Text>;
                annotations = this.props.data.annotation.split('\n').map((annotation, key) => {
                    return (
                        <Text key={key} style={style.schedule.course.content}>
                            {annotation}
                        </Text>
                    );
                });
            }
            if (this.props.data.staff !== 'N/C') {
                staffTitle = <Text style={style.schedule.course.header}>Avec : </Text>;
                staff = this.props.data.staff.split(' | ').map((staff, key) => {
                    return (
                        <Text key={key} style={style.schedule.course.content}>
                            {staff}
                        </Text>
                    );
                });
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
                roomTitle = <Text style={style.schedule.course.header}>Salle : </Text>;
                room = this.props.data.room.split(' | ').map((room, key) => {
                    return <OpenMapButton key={key} location={room} />;
                });
            }
            if (this.props.data.group !== 'N/C') {
                groupTitle = <Text style={style.schedule.course.header}>Groupe : </Text>;
                group = this.props.data.group.split(' | ').map((group, key) => {
                    return (
                        <Text key={key} style={style.schedule.course.content}>
                            {group}
                        </Text>
                    );
                });
            }

            return (
                <TouchableHighlight onPress={() => {}} underlayColor="white">
                    <View
                        style={[
                            style.schedule.course.row,
                            {
                                backgroundColor: this.state.backgroundColor,
                                borderColor: this.state.borderColor,
                            },
                        ]}>
                        <View style={[style.schedule.course.hours, { borderColor: this.state.lineColor }]}>
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

                            <View style={style.schedule.course.line}>
                                {staffTitle}
                                <View style={style.schedule.course.container}>{staff}</View>
                            </View>

                            <View style={style.schedule.course.line}>
                                {roomTitle}
                                <View style={style.schedule.course.container}>{room}</View>
                            </View>

                            <View style={style.schedule.course.line}>
                                {groupTitle}
                                <View style={style.schedule.course.container}>{group}</View>
                            </View>

                            <View style={style.schedule.course.line}>
                                {annotationsTitle}
                                <View style={style.schedule.course.container}>{annotations}</View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        }
    }
}
