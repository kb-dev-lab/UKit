import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import style from '../Style';

class CalendarDay extends React.Component {
    static propTypes = {
        currentDay: PropTypes.instanceOf(moment),
        item: PropTypes.instanceOf(moment),
        onPressItem: PropTypes.func,
        selectedDay: PropTypes.instanceOf(moment),
        theme: PropTypes.object,
    };

    _onPress = () => {
        if (this.props.onPressItem) {
            requestAnimationFrame(() => {
                this.props.onPressItem(this.props.item);
            });
        }
    };

    static getBackgroundColor(props) {
        return props.item.isSame(props.selectedDay, 'day')
            ? props.theme.calendar.selection
            : props.item.isSame(props.currentDay, 'day')
                ? props.theme.calendar.currentDay
                : props.item.day() === 0
                    ? props.theme.calendar.sunday
                    : 'transparent';
    }

    shouldComponentUpdate(nextProps, nextState) {
        return CalendarDay.getBackgroundColor(nextProps) !== CalendarDay.getBackgroundColor(this.props);
    }

    render() {
        const { theme } = this.props;
        
        return (
            <TouchableOpacity
                onPress={this._onPress}
                style={{
                    width: 64,
                    height: 64,
                    paddingHorizontal: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    borderTopRightRadius: 4,
                    borderTopLeftRadius: 4,
                    backgroundColor: CalendarDay.getBackgroundColor(this.props),
                }}>
                <View data-month={this.props.item.month()}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 24,
                            marginBottom: 4,
                            color: this.props.item.isSame(this.props.selectedDay, 'day') ? theme.lightFont : theme.font,
                        }}>
                        {this.props.item.date()}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: this.props.item.isSame(this.props.selectedDay, 'day') ? theme.lightFont : theme.font,
                        }}>
                        {this.props.item.format('ddd')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default CalendarDay;
