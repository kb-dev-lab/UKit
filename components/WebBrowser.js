import React from 'react';
import { ActivityIndicator, Linking, Platform, TouchableOpacity, View, WebView } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { withNavigation } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import style from '../Style';
import BackButton from './containers/buttons/BackButton';

function treatTitle(str) {
    if (str.length > 18) {
        if (str.charAt(18) === ' ') {
            return `${str.substr(0, 18)}…`;
        }

        return `${str.substr(0, 18)} …`;
    }

    return str;
}

class WebBrowser extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let title = treatTitle(navigation.getParam('title', 'Navigateur web'));
        let leftButton = <BackButton backAction={navigation.goBack} />;

        return {
            title,
            header: (
                <View
                    style={{
                        backgroundColor: style.Theme.primary,
                    }}>
                    <NavigationBar
                        title={{ title, tintColor: 'white' }}
                        tintColor={'transparent'}
                        leftButton={leftButton}
                        style={{
                            alignItems: 'center',
                            flex: 1,
                            flexDirection: 'row',
                        }}
                    />
                </View>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            entrypoint: this.props.navigation.state.params.entrypoint,
            title: null,
            url: '',
            uri: null,
            canGoBack: false,
            canGoForward: false,
            loading: true,
        };
        this.entrypoints = {
            ent: 'https://ent.u-bordeaux.fr',
            email: 'https://webmel.u-bordeaux.fr',
            cas: 'https://cas.u-bordeaux.fr',
            apogee: 'https://apogee.u-bordeaux.fr',
        };

        this.openURL = this.openURL.bind(this);
        this.getUri = this.getUri.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onForward = this.onForward.bind(this);
    }

    componentDidMount() {
        this.getUri();
    }

    getUri() {
        if (this.entrypoints.hasOwnProperty(this.state.entrypoint)) {
            this.setState({ uri: this.entrypoints[this.state.entrypoint] });
        }
    }

    onRefresh() {
        this.refs['WebBrowser'].reload();
    }

    onBack() {
        this.refs['WebBrowser'].goBack();
    }

    onForward() {
        this.refs['WebBrowser'].goForward();
    }

    openURL() {
        Linking.canOpenURL(this.state.url)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + this.state.url);
                } else {
                    return Linking.openURL(this.state.url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }

    static renderLoading() {
        return (
            <View style={{ marginTop: 20 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    render() {
        if (this.state.uri === null) {
            return WebBrowser.renderLoading();
        }

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <WebView
                    style={{}}
                    ref={'WebBrowser'}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    renderLoading={WebBrowser.renderLoading}
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                    <TouchableOpacity disabled={!this.state.canGoBack} onPress={this.onBack}>
                        <MaterialIcons
                            name="navigate-before"
                            size={30}
                            style={{ color: this.state.canGoBack ? style.Theme.primary : 'grey', height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!this.state.canGoForward} onPress={this.onForward}>
                        <MaterialIcons
                            name="navigate-next"
                            size={30}
                            style={{ color: this.state.canGoForward ? style.Theme.primary : 'grey', height: 30, width: 30 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity disabled={this.state.loading} onPress={this.onRefresh}>
                        <MaterialIcons
                            name="refresh"
                            size={30}
                            style={{ color: this.state.loading ? 'grey' : style.Theme.primary, height: 30, width: 30 }}
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
                                <MaterialCommunityIcons
                                    name="apple-safari"
                                    size={30}
                                    style={{ color: style.Theme.primary, height: 30, width: 30 }}
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="google-chrome"
                                    size={30}
                                    style={{ color: style.Theme.primary, height: 30, width: 30 }}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default withNavigation(WebBrowser);
