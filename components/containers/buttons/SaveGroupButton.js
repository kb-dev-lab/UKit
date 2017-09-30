import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store from 'react-native-simple-store';

export default class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedGroup: this.props.groupName,
            savedGroup: null
        };
        this.mounted = false;
    }

    componentWillMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.getSavedGroup();
    }

    getSavedGroup() {
        store.get("profile").then((profile) => {
                if (this.mounted && profile !== null) {
                    this.setState({savedGroup: profile.group})
                }
            }
        );
    }

    saveGroup() {
        if (this.isSaved()) {
            store.update('profile', {group: null}).then(
                this.setState({savedGroup: null}));
        } else {
            store.update('profile', {group: this.state.displayedGroup}).then(
                this.setState({savedGroup: this.state.displayedGroup}));
        }
    }

    isSaved() {
        return !(this.state.savedGroup === null || this.state.savedGroup !== this.state.displayedGroup);
    }

    render() {
        return (
            <TouchableHighlight
                onPress={_ => this.saveGroup()}
                underlayColor={"transparent"}
                style={{
                    justifyContent: 'space-around',
                    paddingLeft: 5
                }}>
                <View style={{
                    justifyContent: 'space-around',
                    paddingHorizontal: 5
                }}>
                    <MaterialIcons
                        name={this.isSaved() ? "star" : "star-border"}
                        size={30}
                        style={{color: "white"}}
                    />
                </View>
            </TouchableHighlight>
        );
    }
}