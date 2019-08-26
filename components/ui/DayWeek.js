import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import PropTypes from 'prop-types';

import { upperCaseFirstLetter } from '../../Utils';
import CourseRow from '../CourseRow';
import style from '../../Style';

export default class DayWeek extends React.Component {
    static propTypes = {
        schedule: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            expand: false,
        };
        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand() {
        requestAnimationFrame(() => {
            this.setState({ expand: !this.state.expand });
        });
    }

    render() {
        const { theme, schedule } = this.props;

        let content = <ActivityIndicator style={style.containerView} size="large" animating={true} />;

        if (schedule.courses.length === 0) {
            content = (
                <View style={style.schedule.course.noCourse}>
                    <Text style={[style.schedule.course.noCourseText, { color: theme.font }]}>Aucun cours ce jour</Text>
                </View>
            );
        } else if (this.state.expand) {
            content = (
                <FlatList
                    key={this.props.schedule.dayNumber}
                    renderItem={({ item }) => <CourseRow data={item} theme={theme} navigation={this.props.navigation} />}
                    data={this.props.schedule.courses}
                    keyExtractor={(item, index) => String(item.dayNumber) + String(index)}
                />
            );
        }

        return (
            <View>
                <TouchableOpacity onPress={this.toggleExpand}>
                    <View
                        style={{
                            marginTop: 4,
                            padding: 10,
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Ionicons
                            name={this.state.expand ? 'ios-arrow-up' : 'ios-arrow-down'}
                            size={24}
                            style={{
                                color: '#000',
                                height: 24,
                                width: 24,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '800',
                            }}>
                            {upperCaseFirstLetter(moment.unix(schedule.dayTimestamp).format('dddd DD/MM/YYYY'))}
                        </Text>
                        <Ionicons
                            name={this.state.expand ? 'ios-arrow-up' : 'ios-arrow-down'}
                            size={24}
                            style={{
                                color: '#000',
                                height: 24,
                                width: 24,
                            }}
                        />
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={!this.state.expand} align="top">
                    {content}
                </Collapsible>
            </View>
        );
    }
}
