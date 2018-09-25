import React from 'react';
import { Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';

import style from '../Style';
import URLButton from './containers/buttons/URLButton';
import BackButton from './containers/buttons/BackButton';

export default class About extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let title = 'À propos';
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
                <View style={style.about.view}>
                    <Text style={style.about.title}>Ukit Bordeaux v{Expo.Constants.manifest.version}</Text>
                    <View style={style.about.content}>
                        <Text>
                            Cette application a été développée par Jean B. dans le cadre du concours HackeTaFac 2017. Aujourd'hui, elle est
                            maintenue par KBDev SARL.
                        </Text>
                    </View>

                    <Text style={style.about.title}>Nous contacter</Text>
                    <View style={style.about.content}>
                        <URLButton url="https://twitter.com/HackJack_" title="Twitter" />
                        <URLButton url="https://ukit-bordeaux.fr" title="Site web" />
                        <URLButton url="https://kbdev.io" title="Site de l'entreprise" />
                    </View>

                    <Text style={style.about.title}>Mentions légales</Text>
                    <View style={style.about.content}>
                        <URLButton url="https://ukit-bordeaux.fr/policies/privacy" title="Politique de confidentialité" />
                    </View>
                </View>
            </View>
        );
    }
}
