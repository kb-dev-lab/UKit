import React from 'react';
import { Platform, Text, TouchableHighlight, View } from 'react-native';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import NavigationBar from 'react-native-navbar';
import { Fumi } from 'react-native-textinput-effects';
import URLButton from './containers/buttons/URLButton';
import AwesomeButton from 'react-native-awesome-button';

import style from '../Style';

export default class Demo extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let title = 'Demo';
        let leftButton = (
            <TouchableHighlight
                onPress={() => {
                    navigation.openDrawer();
                }}
                style={{
                    justifyContent: 'space-around',
                    paddingLeft: 5,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <MaterialCommunityIcons
                        name="menu"
                        size={32}
                        style={{
                            color: 'white',
                        }}
                    />
                </View>
            </TouchableHighlight>
        );
        return {
            title,
            header: (
                <View
                    style={{
                        backgroundColor: style.colors.blue,
                    }}>
                    <NavigationBar title={{ title, tintColor: 'white' }} tintColor={'transparent'} leftButton={leftButton} />
                </View>
            ),
        };
    };

    constructor(props) {
        super(props);
        let { navigate } = props.navigation;
        this.navigate = navigate;
        this.state = {
            buttonState: 'idle',
            email: '',
            password: '',
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.setState({ buttonState: 'busy' });
        setTimeout(() => {
            if (this.state.email === 'test@u-bordeaux.fr' && this.state.password === 'test') {
                this.setState({ buttonState: 'idle' });
                this.navigate('Group', { name: 'Master1_4TIN701S' });
            } else if (this.state.email === 'test1@u-bordeaux.fr' && this.state.password === 'test1') {
                this.setState({ buttonState: 'idle' });
                this.navigate('Group', { name: 'INF501_A1' });
            } else {
                this.setState({ buttonState: 'error' });
                setTimeout(() => {
                    this.setState({ buttonState: 'idle' });
                }, 1500);
            }
        }, 2500);
    }

    render() {
        return (
            <View style={style.demo.view}>
                <View style={style.demo.titleView}>
                    <Text style={style.demo.title}>Connexion</Text>
                </View>
                <Fumi
                    label={'Adresse email'}
                    labelStyle={style.demo.labelStyle}
                    style={style.demo.rootStyle}
                    inputStyle={style.demo.inputStyle}
                    iconClass={Feather}
                    iconName={'at-sign'}
                    iconColor={'black'}
                    iconSize={20}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    keyboardType={'email-address'}
                    value={this.state.email}
                    onChangeText={(text) => {
                        this.setState({ email: text });
                    }}
                />
                <Fumi
                    label={'Mot de passe'}
                    labelStyle={style.demo.labelStyle}
                    style={[style.demo.rootStyle, { marginBottom: 20 }]}
                    inputStyle={style.demo.inputStyle}
                    iconClass={MaterialCommunityIcons}
                    iconName={'textbox-password'}
                    iconColor={'black'}
                    iconSize={20}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'android' ? 'visible-password' : 'default'}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => {
                        this.setState({ password: text });
                    }}
                />
                <AwesomeButton
                    states={{
                        idle: {
                            text: 'Se connecter',
                            icon: <MaterialIcons name="person" color="rgba(255, 255, 255, .9)" size={25} />,
                            iconAlignment: 'left',
                            backgroundStyle: {
                                backgroundColor: style.colors.blue,
                                minHeight: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 0,
                            },
                            labelStyle: {
                                color: 'white',
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                marginLeft: 10,
                            },
                            onPress: this.handleLogin,
                        },
                        busy: {
                            text: 'Connexion en cours',
                            spinner: true,
                            spinnerProps: {
                                animated: true,
                                color: 'white',
                            },
                            backgroundStyle: {
                                backgroundColor: '#666666',
                                minHeight: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 0,
                            },
                        },
                        error: {
                            text: 'Non valide',
                            backgroundStyle: {
                                backgroundColor: style.colors.darkred,
                                minHeight: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 0,
                            },
                        },
                    }}
                    transitionDuration={400}
                    buttonState={this.state.buttonState}
                />
                <View style={style.demo.content}>
                    <URLButton url="https://idnum.u-bordeaux.fr/" title="Activer mon IDNUM" />
                    <URLButton url="https://idnum.u-bordeaux.fr/" title="Perte d'identifiant ou de mot de passe" />
                    <URLButton url="https://idnum.u-bordeaux.fr/faq" title="Questions fréquentes" />
                </View>
            </View>
        );
    }
}
