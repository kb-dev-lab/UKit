import React from 'react';
import Tabs from '../navigation/ScheduleTabs';
import {StatusBar, View, Text, TouchableHighlight, Platform} from 'react-native';
import style from '../Style';
import NavigationBar from 'react-native-navbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Group extends React.Component {

    static navigationOptions = ({navigation}) => {
        let title = navigation.state.params.name.replace(/_/g, " ");
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
                        leftButton={
                            <TouchableHighlight onPress={_ => {
                                navigation.goBack();
                            }} underlayColor={"transparent"} style={{
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
                        }
                        rightButton={
                            <View style={{
                                justifyContent: 'space-around',
                                paddingLeft: 5
                            }}>
                                <MaterialCommunityIcons
                                    name="dots-vertical"
                                    size={32}
                                    style={{color: "white"}}
                                />
                            </View>
                        }
                    />
                </View>
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            groupName: this.props.navigation.state.params.name
        };
    }

    render() {
        return (
            <Tabs screenProps={{groupName: this.state.groupName}}/>
        );
    }
}