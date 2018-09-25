import React from 'react';
import { View } from 'react-native';
import NavigationBar from 'react-native-navbar';

import DayView from './DayView';
import style from '../Style';
import SaveButton from './containers/buttons/SaveGroupButton';
import BackButton from './containers/buttons/BackButton';

export default class Group extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let groupName = navigation.state.params.name;
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
        return <DayView navigation={this.props.navigation} groupName={this.state.groupName} />;
    }
}
