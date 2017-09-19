import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import style from '../Style';
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
                <View style={style.about.view}>
                    <Text style={style.about.title}>Ukit</Text>
                    <Text style={style.about.content}>
                        Cette application a été développée par HackJack dans le cadre du concours HackeTaFac 2017.
                    </Text>
                </View>
            </View>
        );
    }
}