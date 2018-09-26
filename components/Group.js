import React from 'react';
import { View } from 'react-native';
import NavigationBar from 'react-native-navbar';

import DayView from './DayView';
import style from '../Style';
import NavigationBackground from './containers/ui/NavigationBackground';
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
        this.state = { groupName: this.props.navigation.state.params.name };
    }

    render() {
        return <DayView navigation={this.props.navigation} groupName={this.state.groupName} />;
    }
}
