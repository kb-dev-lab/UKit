import React from 'react';
import Tabs from '../navigation/ScheduleTabs';

export default class Group extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.name.replace(/_/g, " Groupe ")
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            groupName: this.props.navigation.state.params.name
        };
    }

    render() {
        return (
            <Tabs screenProps={{groupName: this.state.groupName}}/>
        );
    }
}