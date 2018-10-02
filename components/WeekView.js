import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';

import CalendarWeek from './CalendarWeek';
import WeekComponent from './containers/Week';
import style from '../Style';
import SaveButton from './containers/buttons/SaveGroupButton';
import NavigationBar from 'react-native-navbar';
import BackButton from './containers/buttons/BackButton';
import NavigationBackground from './containers/ui/NavigationBackground';

moment.locale('fr');

function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
}

class WeekView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let groupName = navigation.state.params.groupName;
        let title = groupName.replace(/_/g, ' ');
        let leftButton = <BackButton backAction={navigation.goBack} />;

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
                <NavigationBackground>
                    <NavigationBar
                        title={{ title, tintColor: 'white' }}
                        tintColor={'transparent'}
                        leftButton={leftButton}
                        rightButton={rightButton}
                    />
                </NavigationBackground>
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
        this.extractCalendarListItemKey = this.extractCalendarListItemKey.bind(this);
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
                theme={style.Theme[this.props.themeName]}
            />
        );
    }

    extractCalendarListItemKey(item) {
        return `S${item}-${this.props.themeName}`;
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
        const theme = style.Theme[this.props.themeName];

        return (
            <View style={{ flex: 1 }}>
                <WeekComponent
                    key={`weekComponent-${this.props.themeName}`}
                    week={this.state.selectedWeek}
                    groupName={this.state.groupName}
                    theme={theme}
                    navigation={this.props.navigation}
                />
                <View
                    style={{
                        flexGrow: 0,
                        backgroundColor: 'white',
                        borderTopColor: theme.border,
                        borderTopWidth: 1,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'stretch',
                            height: 38,
                            backgroundColor: theme.background,
                        }}>
                        <View style={{ position: 'absolute', top: 0, right: 0, left: 0 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 8, color: theme.font }}>Semaine</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.onTodayPress}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
                                <MaterialIcons name="event-note" size={18} style={{ color: theme.icon }} />
                                <Text style={{ textAlign: 'center', fontSize: 12, marginLeft: 8, color: theme.font }}>Cette semaine</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.onDayButton}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
                                <Text style={{ textAlign: 'center', fontSize: 12, marginRight: 8, color: theme.font }}>Jour</Text>
                                <MaterialCommunityIcons name="calendar" size={18} style={{ color: theme.icon }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        ref={(list) => (this.calendarList = list)}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.weeks}
                        horizontal={true}
                        keyExtractor={this.extractCalendarListItemKey}
                        viewabilityConfig={this.viewability}
                        initialScrollIndex={this.state.currentWeekIndex}
                        getItemLayout={WeekView.getCalendarListItemLayout}
                        extraData={this.state}
                        renderItem={this.renderCalendarListItem}
                        style={{ backgroundColor: theme.background }}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    themeName: state.darkMode.themeName,
});

export default connect(mapStateToProps)(WeekView);
