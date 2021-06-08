import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { setFavoriteGroup } from '../../actions/setFavoriteGroup';
import SettingsManager from '../../utils/SettingsManager';

class SaveGroupButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedGroup: this.props.groupName,
            savedGroup: SettingsManager.getGroup(),
        };
    }

    saveGroup() {
        if (this.isSaved()) {
            this.setState({ savedGroup: null }, () => {
                this.props.dispatchSetFavoriteGroup(null);
                SettingsManager.setGroup(null);
            });
        } else {
            this.setState({ savedGroup: this.state.displayedGroup }, () => {
                this.props.dispatchSetFavoriteGroup(this.state.displayedGroup);
                SettingsManager.setGroup(this.state.displayedGroup);
            });
        }
    }

    isSaved() {
        return !(this.state.savedGroup === null || this.state.savedGroup !== this.state.displayedGroup);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.saveGroup()}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View>
                    <MaterialIcons name={this.isSaved() ? 'star' : 'star-border'} size={30} style={{ color: '#FFFFFF', height: 32, width: 32 }} />
                </View>
            </TouchableOpacity>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetFavoriteGroup: (groupName) => {
            dispatch(setFavoriteGroup(groupName));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        savedGroup: state.favorite.groupName,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveGroupButton);
