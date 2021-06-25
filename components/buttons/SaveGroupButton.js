import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
                SettingsManager.setGroup(null);
            });
        } else {
            this.setState({ savedGroup: this.state.displayedGroup }, () => {
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


export default SaveGroupButton;
