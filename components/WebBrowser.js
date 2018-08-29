import React from 'react';
import { ActivityIndicator, Platform, StatusBar, Text, TouchableHighlight, TouchableOpacity, View, WebView } from 'react-native';
import style from '../Style';
import NavigationBar from 'react-native-navbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default class WebBrowser extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let title = 'Navigateur web';
        let leftButton = (
            <TouchableHighlight
                onPress={(_) => {
                    navigation.goBack();
                }}
                underlayColor={style.hintColors.green}
                style={{
                    justifyContent: 'space-around',
                    paddingLeft: 5,
                }}>
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                    <Ionicons
                        name="ios-close-outline"
                        size={54}
                        style={{
                            color: 'white',
                        }}
                    />
                </View>
            </TouchableHighlight>
        );
        let rightButton = (
            <View
                style={{
                    justifyContent: 'space-around',
                    paddingLeft: 5,
                    flexDirection: 'row',
                }}>
                <View
                    style={{
                        justifyContent: 'space-around',
                    }}>
                    <MaterialCommunityIcons name="dots-vertical" size={30} style={{ color: 'white' }} />
                </View>
            </View>
        );
        return {
            title,
            header: (
                <View
                    style={{
                        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                        backgroundColor: style.colors.blue,
                    }}>
                    <NavigationBar
                        title={{ title, tintColor: 'white' }}
                        tintColor={'transparent'}
                        leftButton={leftButton}
                        rightButton={rightButton}
                    />
                </View>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            entrypoint: this.props.navigation.state.params.entrypoint,
            title: '',
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
    }

    componentWillMount() {
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

    renderLoading() {
        return (
            <View style={{ marginTop: 20 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    render() {
        if (this.state.uri === null) {
            return this.renderLoading();
        }

        let js = '';
        if (this.state.entrypoint === 'cas') {
            js = `
            setTimeout(() => {
                window.postMessage(String(document.cookie))
            },0);
            `;
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <WebView
                    style={{}}
                    ref={'WebBrowser'}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    onMessage={(e) => {
                        console.log(e.nativeEvent.data);
                    }}
                    injectedJavaScript={js}
                    renderLoading={() => this.renderLoading()}
                    onNavigationStateChange={(e) => {
                        if (!e.loading) {
                            this.setState({ url: e.url, title: e.title, canGoBack: e.canGoBack, loading: e.loading });
                        }
                    }}
                    source={{ uri: this.state.uri }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                    <TouchableOpacity disabled={!this.state.canGoBack} onPress={this.onBack.bind(this)}>
                        <SimpleLineIcons name="arrow-left" size={30} style={{ color: this.state.canGoBack ? 'black' : 'grey' }} />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!this.state.canGoForward} onPress={this.onForward.bind(this)}>
                        <SimpleLineIcons name="arrow-right" size={30} style={{ color: this.state.canGoForward ? 'black' : 'grey' }} />
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center' }}>
                        <Text>{this.state.title}</Text>
                    </View>

                    <TouchableOpacity disabled={this.state.loading} onPress={this.onRefresh.bind(this)}>
                        <SimpleLineIcons name="refresh" size={30} style={{ color: this.state.loading ? 'grey' : 'black' }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
