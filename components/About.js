import React from 'react';
import { Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';

import style from '../Style';
import URLButton from './containers/buttons/URLButton';
import BackButton from './containers/buttons/BackButton';
import NavigationBackground from './containers/headers/NavigationBackground';

class About extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let title = 'À propos';
        let leftButton = <BackButton backAction={navigation.goBack} />;
        return {
            title,
            header: (
                <NavigationBackground>
                    <NavigationBar title={{ title, tintColor: 'white' }} tintColor={'transparent'} leftButton={leftButton} />
                </NavigationBackground>
            ),
        };
    };

    render() {
        const theme = style.Theme[this.props.themeName];

        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <View style={style.about.view}>
                    <Text style={[style.about.title, { color: theme.font }]}>Ukit Bordeaux v{Expo.Constants.manifest.version}</Text>
                    <View style={style.about.content}>
                        <Text style={{ color: theme.font }}>
                            Cette application a été développée par Jean B. dans le cadre du concours HackeTaFac 2017. Aujourd'hui, elle est
                            maintenue par KBDev SARL.
                        </Text>
                    </View>

                    <Text style={[style.about.title, { color: theme.font }]}>Nous contacter</Text>
                    <View style={style.about.content}>
                        <URLButton url="https://twitter.com/HackJack_" title="Twitter" theme={theme} />
                        <URLButton url="https://ukit-bordeaux.fr" title="Site web" theme={theme} />
                        <URLButton url="https://kbdev.io" title="Site de l'entreprise" theme={theme} />
                    </View>

                    <Text style={[style.about.title, { color: theme.font }]}>Mentions légales</Text>
                    <View style={style.about.content}>
                        <URLButton url="https://ukit-bordeaux.fr/policies/privacy" title="Politique de confidentialité" theme={theme} />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    themeName: state.darkMode.themeName,
});

export default connect(mapStateToProps)(About);
