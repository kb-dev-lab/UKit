import React from 'react';
import {View, Text} from 'react-native';
import DrawerButton from './DrawerButton';
import store from 'react-native-simple-store';
import {connect} from 'react-redux';

class MyGroupButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedGroup: null
        };
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('nextProps', nextProps);
        console.log('nextState', nextState);
    }

    setFavoriteGroup(groupName) {
        console.log("setFavoriteGroup", groupName);
        this.setState({savedGroup: groupName});
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

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetFavoriteGroup: (groupName) => {
            dispatch(setFavoriteGroup(groupName));
        }
    };
};

export default connect(undefined, mapDispatchToProps)(MyGroupButton);