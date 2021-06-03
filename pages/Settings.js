import React from 'react';
import { Dimensions, Keyboard, Platform, Text, TextInput, View, Picker } from 'react-native';
import PopupDialog, { DialogButton, DialogTitle, FadeAnimation } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { setFilters } from '../actions/setFilters';
import { setLanguage } from '../actions/setLanguage';
import SettingsCategoryHeader from '../components/ui/settings/SettingsCategoryHeader';
import SettingsDividerLong from '../components/ui/settings/SettingsDividerLong';
import SettingsEditText from '../components/ui/settings/SettingsEditText';
import SettingsDividerShort from '../components/ui/settings/SettingsDividerShort';
import SettingsSwitch from '../components/ui/settings/SettingsSwitch';
import style from '../Style';
import Translator from '../utils/translator';

const colors = {
    white: '#FFFFFF',
    monza: '#C70039',
    switchEnabled: Platform.OS === 'android' ? '#009385' : null,
    switchDisabled: Platform.OS === 'android' ? '#efeff3' : null,
    switchOnTintColor: Platform.OS === 'android' ? 'rgba(199, 0, 57, 0.6)' : null,
    blueGem: '#27139A',
};

const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

class Settings extends React.Component {
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
            language: Translator.getLanguage(),
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const nextState = {};

        if (prevState.savedGroup !== nextProps.savedGroup) {
            nextState.savedGroup = nextProps.savedGroup;
        }
        
        if (prevState.filters !== nextProps.filters) {
            let newFilters = Settings.unserializeFilters(nextProps.filters);

            nextState.initialFilters = newFilters;
            nextState.filters = newFilters;
        }

        return nextState;
    }

    /**
     *
     * @param filters {array}
     */
    static unserializeFilters(filters) {
        return filters.join(',');
    }

    static serializeFilters(filters) {
        if (filters === '') {
            return [];
        }
        let split = filters.split(',');
        return split.map((ue) => ue.trim());
    }

    saveFiltersData = () => {
        this.setState({ initialFilters: this.state.filters }, () => {
            this.props.dispatchSetFilters(Settings.serializeFilters(this.state.filters));
        });
    };

    openFiltersDialog = () => {
        this.filterInput.focus();
        this.filtersDialog.show();
    };

    openLanguagePicker = () => {
        this.languageDialog.show();
    };

    openAdvancedFiltersDialog = () => {
        this.advancedFiltersDialog.show();
    };

    closeFiltersDialog = () => {
        this.filtersDialog.dismiss();
    };

    closeAdvancedFiltersDialog = () => {
        this.advancedFiltersDialog.dismiss();
    };

    closeLanguageDialog = () => {
        this.languageDialog.dismiss();
    };

    saveFilters = () => {
        this.saveFiltersData();
        this.closeFiltersDialog();
    };

    saveAdvancedFilters = () => {
        this.closeAdvancedFiltersDialog();
    };

    saveLanguage = () => {
        this.closeLanguageDialog();
        this.props.dispatchSetLanguage(this.state.language);
    };

    onDismissFilters = () => {
        Keyboard.dismiss();
        this.setState({ filters: this.state.initialFilters });
    };

    onDismissAdvancedFilters = () => {
        Keyboard.dismiss();
        this.setState({ advancedFilters: this.state.initialAdvancedFilters });
    };

    render() {
        const theme = style.Theme[this.props.themeName];

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.settings.background }}>
                <SettingsCategoryHeader title={Translator.get('DISPLAY')} titleStyle={{ color: theme.settings.title }} />
                <SettingsDividerLong />
                <SettingsEditText
                    onPress={this.openLanguagePicker}
                    title={Translator.get('LANGUAGE')}
                    valuePlaceholder="..."
                    value={Translator.getLanguageString()}
                    titleStyle={{ color: theme.settings.sectionText }}
                    valueStyle={{ color: theme.settings.sectionText }}
                    containerStyle={{ backgroundColor: theme.settings.section }}
                />
                <SettingsDividerShort />
                <SettingsEditText
                    onPress={this.openFiltersDialog}
                    title={Translator.get('FILTERS')}
                    valuePlaceholder="..."
                    value={this.state.filters}
                    titleStyle={{ color: theme.settings.sectionText }}
                    valueStyle={{ color: theme.settings.sectionText }}
                    containerStyle={{ backgroundColor: theme.settings.section }}
                />
                <SettingsDividerShort />
                <SettingsEditText
                    disabled={true}
                    title={Translator.get('ADVANCED_FILTERS')}
                    valuePlaceholder="..."
                    titleStyle={{ color: theme.settings.sectionText }}
                    valueStyle={{ color: theme.settings.sectionText }}
                    containerStyle={{ backgroundColor: theme.settings.section }}
                    value={this.state.advancedFilters}
                />
                <SettingsDividerLong />
                <SettingsCategoryHeader title={Translator.get('APP_LAUNCHING')} titleStyle={{ color: theme.settings.title }} />
                <SettingsDividerLong />
                <SettingsSwitch
                    disabled={true}
                    onSaveValue={(value) => {
                        this.setState({
                            openAppOnFavoriteGroup: value,
                        });
                    }}
                    title={Translator.get('OPEN_ON_FAVOURITE_GROUP')}
                    titleStyle={{ color: theme.settings.sectionText }}
                    valueStyle={{ color: theme.settings.sectionText }}
                    containerStyle={{ backgroundColor: theme.settings.section }}
                    value={this.state.openAppOnFavoriteGroup}
                    disabledOverlayStyle={{ backgroundColor: theme.settings.disabledOverlay }}
                    thumbColor={this.state.openAppOnFavoriteGroup ? colors.switchEnabled : colors.switchDisabled}
                />
                <SettingsDividerLong />

                <PopupDialog
                    dialogStyle={{ position: 'absolute', top: 20, backgroundColor: theme.background }}
                    width={0.9}
                    ref={(dialog) => {
                        this.filtersDialog = dialog;
                    }}
                    onDismissed={this.onDismissFilters}
                    actions={[
                        <View style={[style.settings.actionsContainer, { borderTopColor: theme.border }]} key="filtersActions">
                            <DialogButton
                                buttonStyle={{
                                    marginVertical: 0,
                                    borderRightColor: theme.border,
                                    borderRightWidth: 0.5,
                                    flex: 1,
                                }}
                                textContainerStyle={{ paddingVertical: 10 }}
                                text={Translator.get('CANCEL')}
                                textStyle={{ color: colors.monza, fontWeight: '400' }}
                                onPress={this.closeFiltersDialog}
                            />
                            <DialogButton
                                buttonStyle={{
                                    marginVertical: 0,
                                    borderLeftColor: theme.border,
                                    borderLeftWidth: 0.5,
                                    flex: 1,
                                }}
                                textContainerStyle={{ paddingVertical: 10 }}
                                text={Translator.get('SAVE')}
                                textStyle={{ fontWeight: '500', color: style.colors.green }}
                                onPress={this.saveFilters}
                            />
                        </View>,
                    ]}
                    height={this.state.height / 2 - 55}>
                    <View
                        style={{
                            backgroundColor: theme.collapsableBackground,
                            padding: 16,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            display: 'flex',
                        }}>
                        <Text style={{ color: theme.font }}>{Translator.get('FILTERS')}</Text>
                    </View>
                    <View style={style.settings.dialogContentView}>
                        <View style={{ marginVertical: 4 }}>
                            <Text style={{ color: theme.font, fontSize: 12 }}>{Translator.get('FILTERS_ENTER_CODE')}</Text>
                            <Text style={{ color: theme.font, fontSize: 12 }}>{Translator.get('FILTERS_SEPARATE_CODE')}</Text>
                        </View>
                        <View style={[style.settings.textInputContainer, { borderColor: theme.secondary }]}>
                            <TextInput
                                ref={(textInput) => (this.filterInput = textInput)}
                                autoCorrect={false}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(filters) => this.setState({ filters })}
                                value={this.state.filters}
                                editable={true}
                                underlineColorAndroid="transparent"
                                style={{ textAlignVertical: 'top', color: theme.font }}
                            />
                        </View>
                    </View>
                </PopupDialog>
                <PopupDialog
                    dialogStyle={{ position: 'absolute', top: 20, backgroundColor: theme.background }}
                    width={0.9}
                    ref={(dialog) => {
                        this.languageDialog = dialog;
                    }}
                    onDismissed={this.closeLanguageDialog}
                    actions={[
                        <View style={[style.settings.actionsContainer, { borderTopColor: theme.border }]} key="filtersActions">
                            <DialogButton
                                buttonStyle={{
                                    marginVertical: 0,
                                    borderRightColor: theme.border,
                                    borderRightWidth: 0.5,
                                    flex: 1,
                                }}
                                textContainerStyle={{ paddingVertical: 10 }}
                                text={Translator.get('CANCEL')}
                                textStyle={{ color: colors.monza, fontWeight: '400' }}
                                onPress={this.closeLanguageDialog}
                            />
                            <DialogButton
                                buttonStyle={{
                                    marginVertical: 0,
                                    borderLeftColor: theme.border,
                                    borderLeftWidth: 0.5,
                                    flex: 1,
                                }}
                                textContainerStyle={{ paddingVertical: 10 }}
                                text={Translator.get('SAVE')}
                                textStyle={{ fontWeight: '500', color: style.colors.green }}
                                onPress={this.saveLanguage}
                            />
                        </View>,
                    ]}>
                    <View
                        style={{
                            backgroundColor: theme.collapsableBackground,
                            padding: 16,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            display: 'flex',
                        }}>
                        <Text style={{ color: theme.font }}>{Translator.get('LANGUAGE')}</Text>
                    </View>
                    <View style={style.settings.dialogContentView}>
                        <Picker
                            selectedValue={this.state.language}
                            itemStyle={{ color: theme.font }}
                            style={{ color: theme.font, width: '100%', height: '100%' }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                            <Picker.Item label="Français" value="fr" />
                            <Picker.Item label="English" value="en" />
                        </Picker>
                    </View>
                </PopupDialog>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        savedGroup: state.favorite.groupName,
        filters: state.filters.filters,
        language: state.language,
        themeName: state.darkMode.themeName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetFilters: (filters) => {
            dispatch(setFilters(filters));
        },
        dispatchSetLanguage: (language) => {
            dispatch(setLanguage(language));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
