import React from 'react';
import NavigationBar from 'react-native-navbar';
import { Dimensions, Keyboard, Platform, Text, TextInput, View } from 'react-native';
import PopupDialog, { DialogButton, DialogTitle, FadeAnimation } from 'react-native-popup-dialog';
import { connect } from 'react-redux';

import style from '../Style';

import BackButton from './containers/buttons/BackButton';
import SettingsCategoryHeader from './containers/ui/settings/SettingsCategoryHeader';
import SettingsDividerLong from './containers/ui/settings/SettingsDividerLong';
import SettingsEditText from './containers/ui/settings/SettingsEditText';
import SettingsDividerShort from './containers/ui/settings/SettingsDividerShort';
import SettingsSwitch from './containers/ui/settings/SettingsSwitch';
import { setFilters } from '../actions/setFilters';

const colors = {
    iosSettingsBackground: 'rgb(235,235,241)',
    white: '#FFFFFF',
    monza: '#C70039',
    switchEnabled: Platform.OS === 'android' ? '#009385' : null,
    switchDisabled: Platform.OS === 'android' ? '#efeff3' : null,
    switchOnTintColor: Platform.OS === 'android' ? 'rgba(199, 0, 57, 0.6)' : null,
    blueGem: '#27139A',
};

const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

class Settings extends React.Component {
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

        let { height } = Dimensions.get('window');

        let savedGroup = null;
        let initialFilters = '';
        let initialAdvancedFilters = '';
        let filters = '';
        let advancedFilters = '';
        let openAppOnFavoriteGroup = true;

        if (this.props.savedGroup) {
            savedGroup = this.props.savedGroup;
        }
        if (this.props.filters) {
            filters = Settings.unserializeFilters(this.props.filters);
            initialFilters = filters;
        }

        this.state = {
            savedGroup,
            height,
            initialFilters,
            initialAdvancedFilters,
            filters,
            advancedFilters,
            openAppOnFavoriteGroup,
        };

        this.openFiltersDialog = this.openFiltersDialog.bind(this);
        this.openAdvancedFiltersDialog = this.openAdvancedFiltersDialog.bind(this);
        this.closeFiltersDialog = this.closeFiltersDialog.bind(this);
        this.closeAdvancedFiltersDialog = this.closeAdvancedFiltersDialog.bind(this);
        this.saveFilters = this.saveFilters.bind(this);
        this.saveAdvancedFilters = this.saveAdvancedFilters.bind(this);
        this.onDismissFilters = this.onDismissFilters.bind(this);
        this.onDismissAdvancedFilters = this.onDismissAdvancedFilters.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.savedGroup !== nextProps.savedGroup) {
            this.setState({ savedGroup: nextProps.savedGroup });
        }
        if (this.state.filters !== nextProps.filters) {
            let newFilters = Settings.unserializeFilters(nextProps.filters);
            this.setState({ initialFilters: newFilters, filters: newFilters });
        }
    }

    /**
     *
     * @param filters {array}
     */
    static unserializeFilters(filters) {
        return filters.join(',');
    }

    static serializeFilters(filters) {
        let split = filters.split(',');
        return split.map((ue) => ue.trim());
    }

    saveFiltersData() {
        this.setState({ initialFilters: this.state.filters }, () => {
            this.props.dispatchSetFilters(Settings.serializeFilters(this.state.filters));
        });
    }

    openFiltersDialog() {
        this.filtersDialog.show();
    }

    openAdvancedFiltersDialog() {
        this.advancedFiltersDialog.show();
    }

    closeFiltersDialog() {
        this.filtersDialog.dismiss();
    }

    closeAdvancedFiltersDialog() {
        this.advancedFiltersDialog.dismiss();
    }

    saveFilters() {
        this.saveFiltersData();
        this.closeFiltersDialog();
    }

    saveAdvancedFilters() {
        this.closeAdvancedFiltersDialog();
    }

    onDismissFilters() {
        Keyboard.dismiss();
        this.setState({ filters: this.state.initialFilters });
    }

    onDismissAdvancedFilters() {
        Keyboard.dismiss();
        this.setState({ advancedFilters: this.state.initialAdvancedFilters });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SettingsCategoryHeader title={'Affichage'} />
                <SettingsDividerLong />
                <SettingsEditText onPress={this.openFiltersDialog} title="Filtres" valuePlaceholder="..." value={this.state.filters} />
                <SettingsDividerShort />
                <SettingsEditText
                    disabled={true}
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
                    onDismissed={this.onDismissFilters}
                    actions={[
                        <View style={style.settings.actionsContainer} key="filtersActions">
                            <DialogButton
                                buttonStyle={{
                                    marginVertical: 0,
                                    borderRightColor: '#919191',
                                    borderRightWidth: 0.5,
                                    flex: 1,
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
                                    flex: 1,
                                }}
                                textContainerStyle={{ paddingVertical: 10 }}
                                text="Sauvegarder"
                                textStyle={{ fontWeight: '100', color: style.colors.blue }}
                                onPress={this.saveFilters}
                            />
                        </View>,
                    ]}
                    height={this.state.height / 2 - 55}
                    dialogTitle={<DialogTitle title="Filtres" />}>
                    <View style={style.settings.dialogContentView}>
                        <View>
                            <Text>Entrez ci-dessous les codes des UE que vous ne voulez afficher.</Text>
                            <Text>Séparer les codes des UE par des virgules et respectez la casse.</Text>
                        </View>
                        <View style={style.settings.textInputContainer}>
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
                    onDismissed={this.onDismissAdvancedFilters}
                    actions={[
                        <View style={style.settings.actionsContainer} key="advancedFiltersActions">
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
                    <View style={style.settings.dialogContentView}>
                        <Text>Pas encore disponible.</Text>
                    </View>
                </PopupDialog>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        savedGroup: state.favorite.groupName,
        filters: state.filters.filters,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetFilters: (filters) => {
            dispatch(setFilters(filters));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
