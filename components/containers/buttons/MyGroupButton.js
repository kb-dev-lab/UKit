import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import style from '../../../Style';

import DrawerButton from './DrawerButton';

class MyGroupButton extends React.Component {
    constructor(props) {
        super(props);
        let savedGroup = null;

        if (this.props.savedGroup) {
            savedGroup = this.props.savedGroup;
        }
        this.state = {
            savedGroup,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.savedGroup !== nextProps.savedGroup) {
            this.setState({ savedGroup: nextProps.savedGroup });
        }
    }

    componentWillMount() {
        if (this.state.savedGroup !== null) {
            this.props.navigate('Group', { name: this.state.savedGroup });
        }
    }

    render() {
        const theme = style.Theme[this.props.themeName];

        if (this.state.savedGroup === null) {
            return (
                <View style={{ paddingLeft: 24, paddingVertical: 4 }}>
                    <Text style={{ color: theme.font }}>Aucun</Text>
                </View>
            );
        } else {
            return (
                <DrawerButton
                    title={this.state.savedGroup.replace('_', ' ')}
                    size={28}
                    textSize={14}
                    icon={'star'}
                    color={theme.icon}
                    fontColor={theme.font}
                    onPress={() => this.props.navigate('Group', { name: this.state.savedGroup })}
                />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        savedGroup: state.favorite.groupName,
        themeName: state.darkMode.themeName,
    };
};

export default connect(mapStateToProps)(MyGroupButton);
