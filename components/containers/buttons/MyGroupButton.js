import React from 'react';
import {View, Text} from 'react-native';
import DrawerButton from './DrawerButton';
import {connect} from 'react-redux';

class MyGroupButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedGroup: null
        };
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

const mapStateToProps = (state) => {
    return {
        savedGroup: state.favorite.savedGroup
    };
};

export default connect(mapStateToProps)(MyGroupButton);