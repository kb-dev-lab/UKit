import React from 'react';

import style from '../Style';
import BackButton from './containers/buttons/BackButton';

export default class Settings extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let title = 'Paramètres';
        let leftButton = <BackButton backAction={navigation.goBack} />;
        return {
            title,
            header: (
                <View
                    style={{
                        backgroundColor: style.Theme.primary,
                    }}>
                    <NavigationBar title={{ title, tintColor: 'white' }} tintColor={'transparent'} leftButton={leftButton} />
                </View>
            ),
        };
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={style.about.view} />
            </View>
        );
    }
}
