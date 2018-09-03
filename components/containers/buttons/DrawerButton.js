import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class DrawerButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: this.props.icon,
            size: parseInt(this.props.size),
            textSize: parseInt(this.props.textSize),
            color: this.props.color,
            tintColor: this.props.tintColor,
            title: this.props.title,
            onPress: this.props.onPress,
        };
    }

    render() {
        let icon = <View />;
        if (this.props.icon !== null) {
            icon = <MaterialIcons name={this.state.icon} size={this.state.size} style={{ color: this.state.color }} />;
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    this.state.onPress();
                }}>
                <View
                    style={{
                        justifyContent: 'space-around',
                        paddingLeft: 15,
                        height: 42,
                        paddingVertical: 3,
                        backgroundColor: this.state.tintColor,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        {icon}
                        <View style={{ paddingLeft: 30 }}>
                            <Text style={{ fontSize: this.state.textSize, color: '#202020' }}>{this.props.title}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
