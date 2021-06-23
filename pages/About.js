import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import style from '../Style';
import URLButton from '../components/buttons/URLButton';
import Translator from '../utils/translator';
import { AppContext } from '../utils/DeviceUtils';
import URL from '../utils/URL';

class About extends React.Component {
    static contextType = AppContext;
    render() {
        const theme = style.Theme[this.context.themeName];

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
                <View style={style.about.view}>
                    <Text style={[style.about.title, { color: theme.font }]}>Ukit Bordeaux v{Constants.manifest.version}</Text>
                    <View style={style.about.content}>
                        <Text style={{ color: theme.font }}>{Translator.get('APPLICATION_HISTORY')}</Text>
                    </View>

                    <Text style={[style.about.title, { color: theme.font }]}>{Translator.get('CONTACT_US')}</Text>
                    <View style={style.about.content}>
                        <URLButton url={URL['TWITTER']} title="Twitter" theme={theme} />
                        <URLButton url={URL['UKIT_WEBSITE']} title={Translator.get('WEBSITE')} theme={theme} />
                        <URLButton url={URL['KBDEV_WEBSITE']} title={Translator.get('COMPANY_WEBSITE')} theme={theme} />
                    </View>

                    <Text style={[style.about.title, { color: theme.font }]}>{Translator.get('LEGAL_NOTICE')}</Text>
                    <View style={style.about.content}>
                        <URLButton
                            url={URL['LEGAL_NOTICE']}
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
