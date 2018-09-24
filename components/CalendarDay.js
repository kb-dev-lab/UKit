import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import style from '../Style';

class CalendarDay extends React.PureComponent {
    _onPress = () => {
        if (this.props.onPressItem) {
            this.props.onPressItem(this.props.item);
        }
    };

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
                    backgroundColor: this.props.item.isSame(this.props.selectedDay, 'day')
                        ? style.Theme.primary
                        : this.props.item.isSame(this.props.currentDay, 'day')
                            ? '#CCCCCC'
                            : this.props.item.day() === 0
                                ? '#EEEEEE'
                                : 'transparent',
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
