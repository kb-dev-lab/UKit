import React from 'react';
import { FlatList, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/fr';

import CalendarWeek from './CalendarWeek';
import WeekComponent from './containers/Week';
import style from '../Style';
import SaveButton from './containers/buttons/SaveGroupButton';
import NavigationBar from 'react-native-navbar';

moment.locale('fr');

function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
}

export default class WeekView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let groupName = navigation.state.params.groupName;
        let title = groupName.replace(/_/g, ' ');

        let leftButton = (
            <TouchableHighlight
                onPress={() => {
                    navigation.goBack();
                }}
                underlayColor={style.Theme.secondary}
                style={{
                    paddingLeft: 16,
                    paddingRight: 32,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View>
                    <Ionicons
                        name="ios-arrow-back"
                        size={32}
                        style={{
                            color: 'white',
                            height: 32,
                            width: 32,
                        }}
                    />
                </View>
            </TouchableHighlight>
        );

        let rightButton = (
            <View
                style={{
                    justifyContent: 'space-around',
                    paddingRight: 16,
                    flexDirection: 'row',
                }}>
                <SaveButton groupName={groupName} />
            </View>
        );

        return {
            title,
            header: (
                <View
                    style={{
                        backgroundColor: style.Theme.primary,
                    }}>
                    <NavigationBar
                        title={{ title, tintColor: 'white' }}
                        tintColor={'transparent'}
                        leftButton={leftButton}
                        rightButton={rightButton}
                    />
                </View>
            ),
        };
    };

    constructor(props) {
        super(props);

        const currentWeek = moment().isoWeek();
        const groupName = this.props.navigation.state.params.groupName;
        const weeks = WeekView.generateWeeks();

        this.state = {
            groupName,
            currentWeek: currentWeek,
            currentWeekIndex: weeks.findIndex((e) => e === currentWeek),
            weeks,
            selectedWeek: currentWeek,
        };

        this.viewability = {
            itemVisiblePercentThreshold: 50,
        };

        this.onTodayPress = this.onTodayPress.bind(this);
        this.renderCalendarListItem = this.renderCalendarListItem.bind(this);
        this.onWeekPress = this.onWeekPress.bind(this);
        this.onDayButton = this.onDayButton.bind(this);
    }

    static getCalendarListItemLayout(data, index) {
        return {
            length: style.calendarList.itemSize,
            offset: style.calendarList.itemSize * index,
            index,
        };
    }

    renderCalendarListItem({ item }) {
        return (
            <CalendarWeek
                week={item}
                selectedWeek={this.state.selectedWeek}
                currentWeek={this.state.currentWeek}
                onPressItem={this.onWeekPress}
            />
        );
    }

    static extractCalendarListItemKey(item) {
        return `S${item}`;
    }

    onTodayPress() {
        this.setState(
            {
                selectedWeek: this.state.currentWeek,
            },
            () => {
                if (this.calendarList) {
                    this.calendarList.scrollToIndex({ index: this.state.currentWeekIndex, animated: true });
                }
            }
        );
    }

    onDayButton() {
        this.props.navigation.goBack();
    }

    onWeekPress(item) {
        this.setState({
            selectedWeek: item,
        });
    }

    static generateWeeks() {
        const currentDate = moment();
        const beginningGenerationDate = moment()
            .date(1)
            .month(7);

        if (currentDate.month() > 6) {
            beginningGenerationDate.year(currentDate.year());
        } else {
            beginningGenerationDate.year(currentDate.year() - 1);
        }

        const weeks = [];
        let firstWeek = null;

        for (let i = 0, iMax = 365; i < iMax; i += 7) {
            const week = moment(beginningGenerationDate)
                .add(i, 'd')
                .isoWeek();
            if (week !== firstWeek) {
                if (firstWeek === null) {
                    firstWeek = week;
                }
                weeks.push(week);
            } else {
                break;
            }
        }

        return weeks;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WeekComponent key={this.state.selectedWeek} week={this.state.selectedWeek} groupName={this.state.groupName} />
                <View
                    style={{
                        flexGrow: 0,
                        backgroundColor: 'white',
                        borderTopColor: '#DDDDDD',
                        borderTopWidth: 1,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'stretch',
                            height: 38,
                        }}>
                        <View style={{ position: 'absolute', top: 0, right: 0, left: 0 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 8 }}>Semaine</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.onTodayPress}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
                                <MaterialIcons name="event-note" size={18} />
                                <Text style={{ textAlign: 'center', fontSize: 12, marginLeft: 8 }}>Cette semaine</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 8 }} />
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.onDayButton}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
                                <Text style={{ textAlign: 'center', fontSize: 12, marginRight: 8 }}>Jour</Text>
                                <MaterialCommunityIcons name="calendar" size={18} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        ref={(list) => (this.calendarList = list)}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.weeks}
                        horizontal={true}
                        keyExtractor={WeekView.extractCalendarListItemKey}
                        viewabilityConfig={this.viewability}
                        initialScrollIndex={this.state.currentWeekIndex}
                        getItemLayout={WeekView.getCalendarListItemLayout}
                        extraData={this.state}
                        renderItem={this.renderCalendarListItem}
                    />
                </View>
            </View>
        );
    }
}
