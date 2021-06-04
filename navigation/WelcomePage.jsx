import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Switch } from 'react-native'

import SettingsManager from '../utils/SettingsManager';

// some code from: https://reactnative.dev/docs/switch to test out features

const style = StyleSheet.create({
    button: {
        backgroundColor: "red",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 50
    }
})


export default () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View>
            <Text>
                Welcome to UKit WelcomePage!
            </Text>
            <TouchableOpacity
                style={style.button}
                onPress={() => { SettingsManager.setFirstLoad(false); }}
            >
                <Text>Press Here to save your settings</Text>
            </TouchableOpacity>

            <View style={style.container}>
                <Text>Choose the App's Theme</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>

    )
}