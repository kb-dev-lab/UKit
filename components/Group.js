import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Ionicons } from '@expo/vector-icons';

import DayView from './DayView';
import style from '../Style';
import SaveButton from './containers/buttons/SaveGroupButton';

export default class Group extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let groupName = navigation.state.params.name;
        let title = groupName.replace(/_/g, ' ');

        let leftButton = (
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    paddingLeft: 16,
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
            </TouchableOpacity>
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
        this.state = { groupName: this.props.navigation.state.params.name };
    }

    render() {
        return <DayView navigation={this.props.navigation} screenProps={{ groupName: this.state.groupName }} />;
    }
}
