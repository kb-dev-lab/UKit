import React from 'react';
import Tabs from '../navigation/ScheduleTabs';
import { Text, TouchableOpacity, View } from 'react-native';
import style from '../Style';
import NavigationBar from 'react-native-navbar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SaveButton from './containers/buttons/SaveGroupButton';

export default class Group extends React.Component {
    static router = Tabs.router;

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
                    paddingLeft: 5,
                    flexDirection: 'row',
                }}>
                <SaveButton groupName={groupName} />
                <View
                    style={{
                        justifyContent: 'space-around',
                    }}>
                    <MaterialCommunityIcons name="dots-vertical" size={30} style={{ color: 'white' }} />
                </View>
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
        return <Tabs navigation={this.props.navigation} screenProps={{ groupName: this.state.groupName }} />;
    }
}
