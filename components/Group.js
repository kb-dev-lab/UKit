import React from 'react';
import Tabs from '../navigation/ScheduleTabs';
import { Platform, StatusBar, Text, TouchableHighlight, View } from 'react-native';
import style from '../Style';
import NavigationBar from 'react-native-navbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SaveButton from './containers/buttons/SaveGroupButton';

export default class Group extends React.Component {

    static navigationOptions = ({navigation}) => {
        let groupName = navigation.state.params.name;
        let title = groupName.replace(/_/g, " ");
        let leftButton = (
            <TouchableHighlight onPress={_ => {
                navigation.goBack();
            }} underlayColor={style.hintColors.blue} style={{
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
        let rightButton = (
            <View style={{
                justifyContent: 'space-around',
                paddingLeft: 5,
                flexDirection: "row"
            }}>
                <SaveButton groupName={groupName}/>
                <View style={{
                    justifyContent: 'space-around'
                }}>
                    <MaterialCommunityIcons
                        name="dots-vertical"
                        size={30}
                        style={{color: "white"}}
                    />
                </View>
            </View>
        );
        return {
            title,
            header: (
                <View
                    style={{
                        paddingTop: (Platform.OS === "android") ? StatusBar.currentHeight : 0,
                        backgroundColor: style.colors.blue
                    }}>
                    <NavigationBar
                        title={{title, tintColor: "white"}}
                        tintColor={"transparent"}
                        leftButton={leftButton}
                        rightButton={rightButton}
                    />
                </View>
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = { groupName: this.props.navigation.state.params.name };
    }

    render() {
        return (
            <Tabs screenProps={{groupName: this.state.groupName}}/>
        );
    }
}