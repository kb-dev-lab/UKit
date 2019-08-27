import React from 'react';
import { View } from 'react-native';

import DayView from './DayView';
import SaveButton from '../components/buttons/SaveGroupButton';
import BackButton from '../components/buttons/BackButton';
import NavBarHelper from '../components/NavBarHelper';
import Translator from '../utils/translator';

export default class Group extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const groupName = navigation.state.params.name;
        const title = groupName.replace(/_/g, ' ');

        const leftButton = <BackButton backAction={navigation.goBack} />;
        const rightButton = (
            <View
                style={{
                    justifyContent: 'space-around',
                    paddingRight: 16,
                    flexDirection: 'row',
                }}>
                <SaveButton groupName={groupName} />
            </View>
        );

        return NavBarHelper({
            title,
            headerLeft: leftButton,
            headerRight: rightButton,
            themeName: screenProps.themeName,
        });
    };

    constructor(props) {
        super(props);
        this.state = { groupName: this.props.navigation.state.params.name };
    }

    render() {
        return <DayView navigation={this.props.navigation} groupName={this.state.groupName} />;
    }
}
