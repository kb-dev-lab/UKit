import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import Style from '../Style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class About extends React.Component {
    static navigationOptions = {
        drawerLabel: 'À propos',
        drawerIcon: ({tintColor}) => (
            <MaterialIcons
                name="info"
                size={24}
                style={{color: tintColor}}
            />
        )
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
                    <View style={Style.aboutView}>
                        <Text style={Style.aboutTitle}>À propos de l'application</Text>
                        <Text>Cette application a été développée par HackJack dans le cadre du concours HackeTaFac 2017.</Text>
                    </View>
                </View>
            </View>
        );
    }
}