import React from 'react';
import {View, Text} from 'react-native';
import DrawerButton from './DrawerButton';
import store from 'react-native-simple-store';

export default class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedGroup: null
        };
    }

    componentWillMount() {
        this.getSavedGroup();
    }

    getSavedGroup() {
        store.get("profile").then((profile) => {
                if (profile !== null) {
                    this.setState({savedGroup: profile.group})
                }
            }
        );
    }

    render() {
        if (this.state.savedGroup === null) {
            return (
                <View><Text>Aucun</Text></View>
            );
        } else {
            return (
                <DrawerButton title={this.state.savedGroup} size={28} textSize={14} icon={'star'} color={"#757575"}
                              tintColor={'transparent'} onPress={_ => this.props.navigate('Group', {name: this.state.savedGroup})}/>
            );
        }
    }

}