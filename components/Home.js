import React from 'react';
import {View, Text} from 'react-native';
import style from '../Style';
import {StackNavigator} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Home extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Liste des groupes',
        drawerIcon: ({tintColor}) => (
            <MaterialIcons
                name="search"
                size={24}
                style={{color: tintColor}}
            />
        ),
        title: 'Liste des groupes'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Listes des groupes</Text>
            </View>
        );
    }
}