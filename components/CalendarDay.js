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
            ? style.Theme.primary
            : props.item.isSame(props.currentDay, 'day')
                ? '#CCCCCC'
                : props.item.day() === 0
                    ? '#EEEEEE'
                    : 'transparent';
    }

    shouldComponentUpdate(nextProps, nextState) {
        return CalendarDay.getBackgroundColor(nextProps) !== CalendarDay.getBackgroundColor(this.props);
    }

    render() {
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
                            color: this.props.item.isSame(this.props.selectedDay, 'day') ? 'white' : 'black',
                        }}>
                        {this.props.item.date()}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: this.props.item.isSame(this.props.selectedDay, 'day') ? 'white' : 'black',
                        }}>
                        {this.props.item.format('ddd')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default CalendarDay;
