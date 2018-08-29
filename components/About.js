import React from 'react';
import { Platform, StatusBar, Text, TouchableHighlight, View } from 'react-native';
import style from '../Style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import URLButton from './containers/buttons/URLButton';

export default class About extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let title = 'À propos';
        let leftButton = (
            <TouchableHighlight
                onPress={() => {
                    navigation.goBack();
                }}
                underlayColor={style.hintColors.blue}
                style={{
                    justifyContent: 'space-around',
                    paddingLeft: 5,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Ionicons
                        name="ios-arrow-back"
                        size={32}
                        style={{
                            color: 'white',
                        }}
                    />
                    <View
                        style={{
                            justifyContent: 'space-around',
                            marginLeft: 5,
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                            Retour
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
        return {
            title,
            header: (
                <View
                    style={{
                        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                        backgroundColor: style.colors.blue,
                    }}>
                    <NavigationBar title={{ title, tintColor: 'white' }} tintColor={'transparent'} leftButton={leftButton} />
                </View>
            ),
        };
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={style.about.view}>
                    <Text style={style.about.title}>Ukit</Text>
                    <View style={style.about.content}>
                        <Text>Cette application a été développée par Jean B. dans le cadre du concours HackeTaFac 2017.</Text>
                    </View>

                    <Text style={style.about.title}>Me retrouver</Text>
                    <View style={style.about.content}>
                        <URLButton url="https://twitter.com/HackJack_" title="Twitter" />
                        <URLButton url="https://github.com/Jack3113" title="Github" />
                        <URLButton url="https://hackjack.info" title="Site web" />
                    </View>
                </View>
            </View>
        );
    }
}
