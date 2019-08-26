import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import style from '../../Style';

import DrawerButton from './DrawerButton';

class MyGroupButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
    }

    componentWillMount() {
        if (this.props.savedGroup !== null) {
            this.props.navigate('Group', { name: this.props.savedGroup });
        }
    }

    _onPress() {
        this.props.navigate('Group', { name: this.props.savedGroup });
    }

    render() {
        const theme = style.Theme[this.props.themeName];

        if (this.props.savedGroup === null) {
            return (
                <View style={{ paddingLeft: 24, paddingVertical: 4 }}>
                    <Text style={{ color: theme.font }}>Aucun</Text>
                </View>
            );
        } else {
            return (
                <DrawerButton
                    title={this.props.savedGroup.replace('_', ' ')}
                    size={28}
                    textSize={14}
                    icon={'star'}
                    color={theme.icon}
                    fontColor={theme.font}
                    onPress={this._onPress}
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
