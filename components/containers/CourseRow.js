import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import style from '../../Style';
import OpenMapButton from './buttons/OpenMapButton';

export default class CourseRow extends React.PureComponent {
    constructor(props) {
        super(props);
        let backgroundColor = '#FFF';
        let borderColor = '#FFF';
        let lineColor = '#FFF';

        if (props.theme.courses[props.data.color]) {
            backgroundColor = props.theme.courses[props.data.color].background;
            borderColor = props.theme.courses[props.data.color].border;
            lineColor = props.theme.courses[props.data.color].line;
        } else {
            backgroundColor = props.theme.courses.default.background;
            borderColor = props.theme.courses.default.border;
            lineColor = props.theme.courses.default.line;
        }

        this.state = { backgroundColor, borderColor, lineColor };

        this._onLongPress = this._onLongPress.bind(this);
    }

    _onLongPress(e) {
        requestAnimationFrame(() => {
            console.log({ data: this.props.data });
        });
    }

    render() {
        const { theme } = this.props;

        if (this.props.data.category === 'nocourse') {
            return (
                <View style={style.schedule.course.noCourse}>
                    <Text style={[style.schedule.course.noCourseText, { color: theme.font }]}>Aucun cours ce jour</Text>
                </View>
            );
        } else if (this.props.data.category === 'masked') {
            return null;
        } else {
            let annotations,
                staff,
                subject,
                room,
                group = null;
            let annotationsTitle,
                staffTitle,
                roomTitle,
                groupTitle = null;

            if (this.props.data.room !== 'N/C') {
                roomTitle = <Text style={[style.schedule.course.header, { color: theme.font }]}>Salle </Text>;
                room = this.props.data.room.split(' | ').map((room, key) => {
                    return <OpenMapButton key={key} location={room} theme={theme} />;
                });
            }
            if (this.props.data.staff !== 'N/C') {
                staffTitle = <Text style={[style.schedule.course.header, { color: theme.font }]}>Avec </Text>;
                staff = this.props.data.staff.split(' | ').map((staff, key) => {
                    return (
                        <Text key={key} style={[style.schedule.course.content, { color: theme.accentFont }]}>
                            {staff}
                        </Text>
                    );
                });
            }
            if (this.props.data.subject !== 'N/C') {
                subject = (
                    <View style={style.schedule.course.line}>
                        <Text style={[style.schedule.course.header, { color: theme.font }]}>Matière : </Text>
                        <Text style={[style.schedule.course.content, { color: theme.accentFont }]}>{this.props.data.subject}</Text>
                    </View>
                );
            }
            if (this.props.data.group !== 'N/C') {
                let groups = this.props.data.group.split(' | ');

                groupTitle = (
                    <Text style={{ color: theme.font }}>
                        Groupe
                        {groups.length > 1 ? 's' : ''} :{' '}
                    </Text>
                );
                group = groups.map((group, key) => {
                    return (
                        <Text key={key} style={{ color: theme.accentFont }}>
                            {group}
                        </Text>
                    );
                });
            }
            if (this.props.data.annotation.length > 0) {
                // TODO detect location
                annotationsTitle = <Text style={{ color: theme.font }}>Notes : </Text>;
                annotations = this.props.data.annotation.split('\n').map((annotation, key) => {
                    return (
                        <Text key={key} style={{ color: theme.accentFont }}>
                            {annotation}
                        </Text>
                    );
                });
            }

            return (
                <View style={{ marginVertical: 4 }}>
                    <TouchableHighlight onPress={this._onLongPress} underlayColor={theme.selection}>
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
                                    <Text style={[style.schedule.course.hoursText, { color: theme.font }]}>{this.props.data.starttime}</Text>
                                </View>
                                <View>
                                    <Text style={[style.schedule.course.hoursText, { color: theme.font }]}>{this.props.data.endtime}</Text>
                                </View>
                            </View>

                            <View style={style.schedule.course.contentBlock}>
                                <View style={style.schedule.course.contentType}>
                                    <Text style={[style.schedule.course.title, { color: theme.font }]}>{this.props.data.category}</Text>
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

                                <View style={style.schedule.course.groupsContainer}>
                                    <View style={style.schedule.course.groupsHeader}>{groupTitle}</View>
                                    <View style={style.schedule.course.groupsContent}>{group}</View>
                                </View>

                                <View style={style.schedule.course.groupsContainer}>
                                    <View style={style.schedule.course.groupsHeader}>{annotationsTitle}</View>
                                    <View style={style.schedule.course.groupsContent}>{annotations}</View>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }
    }
}
