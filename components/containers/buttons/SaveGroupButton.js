import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store from 'react-native-simple-store';
import {connect} from 'react-redux';

class SaveGroupButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedGroup: this.props.groupName,
            savedGroup: null
        };
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

const mapStateToProps = (state) => {
    return {
        favorite: {
            groupName: state.savedGroup
        }
    };
};


export default connect(mapStateToProps)(SaveGroupButton);