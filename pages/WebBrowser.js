import React from 'react';
import { ActivityIndicator, Linking, Platform, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigation } from '@react-navigation/compat';
import SafeAreaView from 'react-native-safe-area-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import BackButton from '../components/buttons/BackButton';
import NavBarHelper from '../components/NavBarHelper';
import style from '../Style';
import Translator from '../utils/translator';

function treatTitle(str) {
    if (str.length > 18) {
        if (str.charAt(18) === ' ') {
            return `${str.substr(0, 18)}…`;
        }

        return `${str.substr(0, 18)} …`;
    }

    return str;
}

const entrypoints = {
    ent: 'https://ent.u-bordeaux.fr',
    email: 'https://webmel.u-bordeaux.fr',
    cas: 'https://cas.u-bordeaux.fr',
    apogee: 'https://apogee.u-bordeaux.fr',
};

class WebBrowser extends React.Component {
    static navigationOptions = ({ navigation, route, screenProps }) => {
        let title = treatTitle(route.params?.title ?? Translator.get('WEB_BROWSER'));
        let leftButton = <BackButton backAction={navigation.goBack} />;

        return NavBarHelper({
            headerLeft: leftButton,
            title,
            themeName: screenProps.themeName,
        });
    };

    constructor(props) {
        super(props);

        let uri = 'https://ukit-bordeaux.fr';
        if (this.props.route.params) {
            const { entrypoint, href } = this.props.route.params;
            if (entrypoint) {
                if (entrypoints[entrypoint]) {
                    uri = entrypoints[entrypoint];
                }
            } else if (href) {
                uri = href;
            }
        }

        this.state = {
            entrypoint: this.props.route.params.entrypoint,
            title: null,
            url: '',
            uri,
            canGoBack: false,
            canGoForward: false,
            loading: true,
        };

        this.openURL = this.openURL.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onForward = this.onForward.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }

    onRefresh() {
        this.webBrowser.reload();
    }

    onBack() {
        this.webBrowser.goBack();
    }

    onForward() {
        this.webBrowser.goForward();
    }

    openURL() {
        Linking.canOpenURL(this.state.url)
            .then((supported) => {
                if (!supported) {
                    console.warn("Can't handle url: " + this.state.url);
                } else {
                    return Linking.openURL(this.state.url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }

    renderLoading() {
        const theme = style.Theme[this.props.themeName];

        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.greyBackground }}>
                <ActivityIndicator size="large" color={theme.iconColor} />
            </View>
        );
    }

    render() {
        if (this.state.uri === null) {
            return this.renderLoading();
        }

        const theme = style.Theme[this.props.themeName];

        let javascript = null;
        if (Platform.OS !== 'ios') {
            javascript = 'window.scrollTo(0,0);';
        }

        return (
            <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: theme.background }}>
                <WebView
                    ref={(webBrowser) => (this.webBrowser = webBrowser)}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    renderLoading={this.renderLoading}
                    injectedJavaScript={javascript}
                    onNavigationStateChange={(e) => {
                        if (!e.loading) {
                            this.setState({ url: e.url, title: e.title, canGoBack: e.canGoBack, loading: e.loading }, () => {
                                if (!!this.state.title) {
                                    this.props.navigation.setParams({ title: this.state.title });
                                }
                            });
                        }
                    }}
                    source={{ uri: this.state.uri }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        backgroundColor: theme.background,
                    }}>
                    <TouchableOpacity disabled={!this.state.canGoBack} onPress={this.onBack}>
                        <MaterialIcons
                            name="navigate-before"
                            size={30}
                            style={{ color: this.state.canGoBack ? theme.icon : 'grey', height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!this.state.canGoForward} onPress={this.onForward}>
                        <MaterialIcons
                            name="navigate-next"
                            size={30}
                            style={{ color: this.state.canGoForward ? theme.icon : 'grey', height: 30, width: 30 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity disabled={this.state.loading} onPress={this.onRefresh}>
                        <MaterialIcons
                            name="refresh"
                            size={30}
                            style={{ color: this.state.loading ? 'grey' : theme.icon, height: 30, width: 30 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.openURL}
                        style={{
                            paddingRight: 16,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View>
                            {Platform.OS === 'ios' ? (
                                <MaterialCommunityIcons name="apple-safari" size={25} style={{ color: theme.icon, height: 25, width: 25 }} />
                            ) : (
                                <MaterialCommunityIcons name="google-chrome" size={25} style={{ color: theme.icon, height: 25, width: 25 }} />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => ({
    themeName: state.darkMode.themeName,
});

export default connect(mapStateToProps)(withNavigation(WebBrowser));
