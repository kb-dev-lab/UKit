import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Ionicons } from '@expo/vector-icons';

import Tabs from '../navigation/ScheduleTabs';
import style from '../Style';
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
                    justifyContent: 'space-around',
                    paddingLeft: 5,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Ionicons
                        name="ios-arrow-back"
                        size={32}
                        style={{
                            color: 'white',
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}
                    />
                    <View
                        style={{
                            justifyContent: 'space-around',
                            marginLeft: 5,
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                            Retour
                        </Text>
                    </View>
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
            </View>
        );
        return {
            title,
            header: (
                <View
                    style={{
                        backgroundColor: style.colors.blue,
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
