import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

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
                ue,
                group = null;
            let annotationsTitle,
                staffTitle,
                roomTitle,
                ueTitle,
                groupTitle = null;

            if (this.props.data.UE) {
                ueTitle = (
                    <View style={style.schedule.course.iconHeader}>
                        <FontAwesome name="book" size={18} style={{ width: 18, height: 18, color: theme.font }} />
                    </View>
                );

                ue = <Text style={{ color: theme.font }}>{this.props.data.UE}</Text>;
            }

            if (this.props.data.room !== 'N/C') {
                roomTitle = (
                    <View style={style.schedule.course.iconHeader}>
                        <Entypo name="location" size={14} style={{ width: 14, height: 14, color: theme.font }} />
                    </View>
                );
                room = this.props.data.room.split(' | ').map((room, key) => {
                    return <OpenMapButton key={key} location={room} theme={theme} />;
                });
            }

            if (this.props.data.staff !== 'N/C') {
                staffTitle = (
                    <View style={style.schedule.course.iconHeader}>
                        <MaterialCommunityIcons name="voice" size={18} style={{ width: 18, height: 18, color: theme.font }} />
                    </View>
                );
                staff = this.props.data.staff.split(' | ').map((staff, key) => {
                    return (
                        <Text key={key} style={[style.schedule.course.content, { color: theme.font }]}>
                            {staff}
                        </Text>
                    );
                });
            }
            if (this.props.data.subject !== 'N/C') {
                subject = (
                    <View style={{ flex: 1 }}>
                        <Text
                            style={[
                                style.schedule.course.content,
                                style.schedule.course.title,
                                {
                                    textAlign: 'left',
                                    color: theme.font,
                                },
                            ]}>
                            {this.props.data.subject}
                        </Text>
                    </View>
                );
            }
            if (this.props.data.group !== 'N/C') {
                let groups = this.props.data.group.split(' | ');

                groupTitle = (
                    <View style={style.schedule.course.iconHeader}>
                        <MaterialCommunityIcons name="account-multiple" size={18} style={{ width: 18, height: 18, color: theme.font }} />
                    </View>
                );
                group = groups.map((group, key) => {
                    return (
                        <Text key={key} style={{ color: theme.font }}>
                            {group}
                        </Text>
                    );
                });
            }
            if (this.props.data.annotation.length > 0) {
                // TODO detect location
                annotationsTitle = (
                    <View style={style.schedule.course.iconHeader}>
                        <MaterialIcons name="speaker-notes" size={18} style={{ width: 18, height: 18, color: theme.font }} />
                    </View>
                );
                annotations = this.props.data.annotation.split('\n').map((annotation, key) => {
                    return (
                        <Text key={key} style={{ color: theme.font }}>
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
                                    {subject}
                                    <View>
                                        <Text style={[style.schedule.course.title, { color: theme.font }]}>{this.props.data.category}</Text>
                                    </View>
                                </View>

                                <View style={style.schedule.course.line}>
                                    {ueTitle}
                                    <View style={style.schedule.course.container}>{ue}</View>
                                </View>

                                <View style={style.schedule.course.line}>
                                    {staffTitle}
                                    <View style={style.schedule.course.container}>{staff}</View>
                                </View>

                                <View style={[style.schedule.course.groupsContainer, { alignItems: 'flex-start' }]}>
                                    {roomTitle}
                                    <View style={style.schedule.course.groupsContent}>{room}</View>
                                </View>

                                <View style={style.schedule.course.groupsContainer}>
                                    {groupTitle}
                                    <View style={style.schedule.course.groupsContent}>{group}</View>
                                </View>

                                <View style={style.schedule.course.groupsContainer}>
                                    {annotationsTitle}
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
