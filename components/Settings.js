import React from 'react';
import NavigationBar from 'react-native-navbar';
import { Keyboard, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import PopupDialog, { DialogButton, DialogTitle, FadeAnimation } from 'react-native-popup-dialog';

import style from '../Style';

import BackButton from './containers/buttons/BackButton';
import SettingsCategoryHeader from './containers/ui/settings/SettingsCategoryHeader';
import SettingsDividerLong from './containers/ui/settings/SettingsDividerLong';
import SettingsEditText from './containers/ui/settings/SettingsEditText';
import SettingsDividerShort from './containers/ui/settings/SettingsDividerShort';
import SettingsSwitch from './containers/ui/settings/SettingsSwitch';

const colors = {
    iosSettingsBackground: 'rgb(235,235,241)',
    white: '#FFFFFF',
    monza: '#C70039',
    switchEnabled: Platform.OS === 'android' ? '#C70039' : null,
    switchDisabled: Platform.OS === 'android' ? '#efeff3' : null,
    switchOnTintColor: Platform.OS === 'android' ? 'rgba(199, 0, 57, 0.6)' : null,
    blueGem: '#27139A',
};

const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

const styles = StyleSheet.create({
    actionsContainer: {
        borderTopColor: '#919191',
        borderTopWidth: 0.5,
        flexDirection: 'row',
        paddingVertical: 0,
        margin: 0,
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 4,
    },
    navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
    },
    navigationTitle: {
        padding: 10,
    },
    navigationButton: {
        padding: 10,
    },
    navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
    },
    navigator: {
        flex: 1,
    },
});

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

    constructor(props) {
        super(props);

        this.state = {
            filters: '',
            advancedFilters: '',
            openAppOnFavoriteGroup: true,
        };

        this.openFiltersDialog = this.openFiltersDialog.bind(this);
        this.openAdvancedFiltersDialog = this.openAdvancedFiltersDialog.bind(this);
        this.closeFiltersDialog = this.closeFiltersDialog.bind(this);
        this.closeAdvancedFiltersDialog = this.closeAdvancedFiltersDialog.bind(this);
        this.saveFilters = this.saveFilters.bind(this);
        this.saveAdvancedFilters = this.saveAdvancedFilters.bind(this);
    }

    openFiltersDialog() {
        this.filtersDialog.show();
    }

    openAdvancedFiltersDialog() {
        this.advancedFiltersDialog.show();
    }

    closeFiltersDialog() {
        Keyboard.dismiss();
        this.filtersDialog.dismiss();
    }

    closeAdvancedFiltersDialog() {
        Keyboard.dismiss();
        this.advancedFiltersDialog.dismiss();
    }

    saveFilters() {
        Keyboard.dismiss();
        this.closeFiltersDialog();
    }

    saveAdvancedFilters() {
        Keyboard.dismiss();
        this.closeAdvancedFiltersDialog();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SettingsCategoryHeader title={'Affichage'} />
                <SettingsDividerLong />
                <SettingsEditText onPress={this.openFiltersDialog} title="Filtres" valuePlaceholder="..." value={this.state.filters} />
                <SettingsDividerShort />
                <SettingsEditText
                    onPress={this.openAdvancedFiltersDialog}
                    title="Filtres avancés"
                    valuePlaceholder="..."
                    value={this.state.advancedFilters}
                />
                <SettingsDividerLong />
                <SettingsCategoryHeader title={'Démarrage'} titleStyle={{ color: colors.monza }} />
                <SettingsDividerLong />
                <SettingsSwitch
                    onSaveValue={(value) => {
                        this.setState({
                            openAppOnFavoriteGroup: value,
                        });
                    }}
                    title={'Ouvrir sur le groupe favori'}
                    value={this.state.openAppOnFavoriteGroup}
                    thumbTintColor={this.state.openAppOnFavoriteGroup ? colors.switchEnabled : colors.switchDisabled}
                />
                <SettingsDividerLong />

                <PopupDialog
                    dialogStyle={{ position: 'absolute', top: 20 }}
                    ref={(dialog) => {
                        this.filtersDialog = dialog;
                    }}
                    actions={[
                        <View style={styles.actionsContainer} key="filtersActions">
                            <DialogButton
                                buttonStyle={{
                                    marginVertical: 0,
                                    borderRightColor: '#919191',
                                    borderRightWidth: 0.5,
                                }}
                                textContainerStyle={{ paddingVertical: 10 }}
                                text="Annuler"
                                textStyle={{ color: colors.monza, fontWeight: '400' }}
                                onPress={this.closeFiltersDialog}
                            />
                            <DialogButton
                                buttonStyle={{
                                    marginVertical: 0,
                                    borderLeftColor: '#919191',
                                    borderLeftWidth: 0.5,
                                }}
                                textContainerStyle={{ paddingVertical: 10 }}
                                text="Sauvegarder"
                                textStyle={{ fontWeight: '100', color: style.colors.blue }}
                                onPress={this.saveFilters}
                            />
                        </View>,
                    ]}
                    height={200}
                    dialogTitle={<DialogTitle title="Filtres" />}>
                    <View style={styles.dialogContentView}>
                        <View>
                            <Text>Entrez ci-dessous les codes des UE que vous ne voulez afficher.</Text>
                            <Text>Séparer les codes des UE par des virgules et respectez la casse.</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: '#FFFFFF',
                                borderColor: '#000000',
                                borderWidth: 1,
                                marginVertical: 4,
                                marginHorizontal: 8,
                                padding: 4,
                                alignItems: 'stretch',
                                justifyContent: 'flex-start',
                                width: '100%',
                            }}>
                            <TextInput
                                autoCorrect={false}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(filters) => this.setState({ filters })}
                                value={this.state.filters}
                                editable={true}
                                style={{ textAlignVertical: 'top' }}
                            />
                        </View>
                    </View>
                </PopupDialog>
                <PopupDialog
                    ref={(dialog) => {
                        this.advancedFiltersDialog = dialog;
                    }}
                    actions={[
                        <View style={styles.actionsContainer} key="advancedFiltersActions">
                            <DialogButton
                                buttonStyle={{
                                    marginVertical: 0,
                                    borderRightColor: '#919191',
                                    borderRightWidth: 0.5,
                                    backgroundColor: 'orange',
                                }}
                                textContainerStyle={{ paddingVertical: 10 }}
                                text="Sauvegarder"
                                onPress={this.saveAdvancedFilters}
                            />
                            <DialogButton
                                buttonStyle={{
                                    marginVertical: 0,
                                    backgroundColor: 'grey',
                                }}
                                textContainerStyle={{ paddingVertical: 10 }}
                                text="Annuler"
                                onPress={this.closeAdvancedFiltersDialog}
                            />
                        </View>,
                    ]}
                    dialogTitle={<DialogTitle title="Filtres avancés" />}>
                    <View style={styles.dialogContentView}>
                        <Text>Pas encore disponible.</Text>
                    </View>
                </PopupDialog>
            </View>
        );
    }
}
