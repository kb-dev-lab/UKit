import React from 'react';
import { View } from 'react-native';

import DayView from './DayView';
import SaveButton from './containers/buttons/SaveGroupButton';
import BackButton from './containers/buttons/BackButton';
import NavBar from './containers/ui/NavBar';

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
            header: <NavBar title={title} rightButton={rightButton} leftButton={leftButton} />,
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
