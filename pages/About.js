import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import style from '../Style';
import URLButton from '../components/buttons/URLButton';
import Translator from '../utils/translator';

class About extends React.Component {
    render() {
        const theme = style.Theme[this.props.themeName];

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
                <View style={style.about.view}>
                    <Text style={[style.about.title, { color: theme.font }]}>Ukit Bordeaux v{Constants.manifest.version}</Text>
                    <View style={style.about.content}>
                        <Text style={{ color: theme.font }}>{Translator.get('APPLICATION_HISTORY')}</Text>
                    </View>

                    <Text style={[style.about.title, { color: theme.font }]}>{Translator.get('CONTACT_US')}</Text>
                    <View style={style.about.content}>
                        <URLButton url="https://twitter.com/HackJack_" title="Twitter" theme={theme} />
                        <URLButton url="https://ukit-bordeaux.fr" title={Translator.get('WEBSITE')} theme={theme} />
                        <URLButton url="https://kbdev.io" title={Translator.get('COMPANY_WEBSITE')} theme={theme} />
                    </View>

                    <Text style={[style.about.title, { color: theme.font }]}>{Translator.get('LEGAL_NOTICE')}</Text>
                    <View style={style.about.content}>
                        <URLButton
                            url="https://ukit-bordeaux.fr/policies/privacy"
                            title={Translator.get('CONFIDENTIALITY_POLITIC')}
                            theme={theme}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => ({
    themeName: state.darkMode.themeName,
});

export default connect(mapStateToProps)(About);
