import React from 'react';
import {View, Text, StatusBar, Platform, TouchableHighlight} from 'react-native';
import style from '../Style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';

export default class About extends React.Component {

    static navigationOptions = ({navigation}) => {
        let title = 'À propos';
        let leftButton = (
            <TouchableHighlight onPress={_ => {
                navigation.goBack();
            }} underlayColor={style.hintColors.green} style={{
                justifyContent: 'space-around',
                paddingLeft: 5
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Ionicons
                        name="ios-arrow-back"
                        size={32}
                        style={{
                            color: "white"
                        }}
                    />
                    <View style={{
                        justifyContent: 'space-around',
                        marginLeft: 5
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: "white"
                        }}>Retour</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
        return {
            title,
            header: (
                <View
                    style={{
                        paddingTop: (Platform.OS === "android") ? StatusBar.currentHeight : 0,
                        backgroundColor: style.colors.green
                    }}>
                    <NavigationBar
                        title={{title, tintColor: "white"}}
                        tintColor={"transparent"}
                        leftButton={leftButton}
                    />
                </View>
            )
        }
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