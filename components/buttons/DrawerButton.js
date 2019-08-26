import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default (props) => {
    let icon = <View />;
    if (props.icon !== null) {
        icon = <MaterialIcons name={props.icon} size={props.size} style={{ color: props.color }} />;
    }
    return (
        <TouchableOpacity
            onPress={() => {
                props.onPress();
            }}>
            <View
                style={{
                    justifyContent: 'space-around',
                    paddingLeft: 15,
                    height: 42,
                    paddingVertical: 3,
                    backgroundColor: props.tintColor,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    {icon}
                    <View style={{ paddingLeft: 30 }}>
                        <Text style={{ fontSize: props.textSize, color: props.fontColor }}>{props.title}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
