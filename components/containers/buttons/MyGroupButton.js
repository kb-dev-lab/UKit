import React from 'react';
import {View, Text} from 'react-native';
import DrawerButton from './DrawerButton';
import {connect} from 'react-redux';

class MyGroupButton extends React.Component {
    constructor(props) {
        super(props);
        let savedGroup = null;
        if(props.hasOwnProperty('savedGroup')){
            savedGroup = props.savedGroup;
        }
        this.state = {
            savedGroup
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.savedGroup !== nextProps.savedGroup) {
            this.setState({savedGroup: nextProps.savedGroup})
        }
    }

    render() {
        if (this.state.savedGroup === null) {
            return (
                <View style={{paddingLeft: 15}}><Text>Aucun</Text></View>
            );
        } else {
            return (
                <DrawerButton title={this.state.savedGroup.replace('_', ' ')} size={28} textSize={14} icon={'star'} color={"#757575"}
                              tintColor={'transparent'} onPress={_ => this.props.navigate('Group', {name: this.state.savedGroup})}/>
            );
        }
    }

}

const mapStateToProps = (state) => {
    return {
        savedGroup: state.favorite.groupName
    };
};

export default connect(mapStateToProps)(MyGroupButton);