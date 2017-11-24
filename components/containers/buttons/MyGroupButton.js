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

    componentWillReceiveProps(nextProps) {
        console.log('willReceive', nextProps);
        if (this.props.savedGroup !== nextProps.savedGroup) {
            nextProps.load();
        }
    }

    render() {
        if (!this.props.hasOwnProperty('savedGroup') || this.props.savedGroup === null) {
            return (
                <View><Text>Aucun</Text></View>
            );
        } else {
            return (
                <DrawerButton title={this.props.savedGroup} size={28} textSize={14} icon={'star'} color={"#757575"}
                              tintColor={'transparent'} onPress={_ => this.props.navigate('Group', {name: this.props.savedGroup})}/>
            );
        }
    }

}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        savedGroup: state.favorite.savedGroup
    };
};

export default connect(mapStateToProps)(MyGroupButton);