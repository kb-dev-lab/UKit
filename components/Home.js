import React from 'react';
import { ActivityIndicator, Image, SectionList, Text, TouchableOpacity, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Hideo } from 'react-native-textinput-effects';
import NavigationBar from 'react-native-navbar';
import store from 'react-native-simple-store';
import moment from 'moment';
import 'moment/locale/fr';

import SectionListHeader from './containers/headers/SectionListHeader';
import GroupRow from './containers/GroupRow';
import style from '../Style';
moment.locale('fr');

function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
}

function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let title = 'Groupes';
        return {
            drawerLabel: title,
            drawerIcon: ({ tintColor }) => <MaterialIcons name="list" size={24} style={{ color: tintColor }} />,
            title,
            header: (
                <View
                    style={{
                        backgroundColor: style.Theme.primary,
                    }}>
                    <NavigationBar
                        title={{ title, tintColor: 'white' }}
                        tintColor={'transparent'}
                        leftButton={
                            <TouchableOpacity
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
                            </TouchableOpacity>
                        }
                    />
                </View>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            completeList: null,
            sections: null,
            list: null,
            emptySearchResults: false,
            refreshing: false,
        };
    }

    static async _loadAssetsAsync() {
        const imageAssets = cacheImages([require('./../assets/icons/app_96.png')]);

        const fontAssets = cacheFonts([
            FontAwesome.font,
            Feather.font,
            Ionicons.font,
            MaterialCommunityIcons.font,
            MaterialIcons.font,
            SimpleLineIcons.font,
        ]);

        await Promise.all([...imageAssets, ...fontAssets]);
    }

    componentDidMount() {
        this.getList();
    }

    generateSections(list, save = false) {
        let sections = [];
        let sectionContent = null;
        let previousSection = null;
        let sectionIndex = -1;
        list.forEach((e) => {
            let splitName = e.name.split('_');
            if (splitName[0] !== previousSection) {
                if (previousSection !== null) {
                    sections.push(sectionContent);
                }
                previousSection = splitName[0];
                sectionContent = { key: previousSection, data: [], sectionIndex: ++sectionIndex };
            }
            e.sectionStyle = style.list.sections[sectionIndex % style.list.sections.length];
            sectionContent.data.push(e);
        });
        sections.push(sectionContent);
        if (save) {
            store
                .delete('home')
                .then(() => store.update('home', { list, sections, unix: moment().unix() }))
                .then(() => this.setState({ list, sections, completeList: list, refreshing: false }));
        } else {
            this.setState({ list, sections });
        }
    }

    refreshList() {
        this.setState({ refreshing: true });
        this.fetchList();
    }

    getList() {
        store.get('home').then((home) => {
            const now = moment().unix();
            const daysWithoutUpdate = 8;
            if (home !== null && home.unix && now - home.unix < daysWithoutUpdate * 24 * 3600) {
                this.setState({ list: home.list, completeList: home.list, sections: home.sections });
            } else {
                this.fetchList();
            }
        });
    }

    fetchList() {
        axios.get('https://hackjack.info/et/json.php').then((response) => {
            let groupList = [];
            for (let groupName in response.data) {
                if (response.data.hasOwnProperty(groupName)) {
                    groupList.push({
                        name: groupName,
                        code: response.data[groupName],
                        cleanName: groupName.replace(/_/g, ' '),
                    });
                }
            }
            let list = groupList.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            this.generateSections(list, true);
        });
    }

    openGroup(group) {
        const { navigate } = this.props.navigation;
        navigate('Group', { name: group.name, code: group.code });
    }

    search(input) {
        this.setState({ sections: null, emptySearchResults: false });
        let list = this.state.completeList;
        if (input.length !== 0) {
            let regex = new RegExp(input, 'gi');
            list = list.filter((e) => {
                return e.name.replace(/_/g, ' ').match(regex);
            });
        }
        if (list.length > 0) {
            this.setState({ emptySearchResults: false });
            this.generateSections(list, false);
        } else {
            this.setState({ emptySearchResults: true });
        }
    }

    render() {
        let content;
        let searchInput = (
            <Hideo
                iconClass={FontAwesome}
                iconName={'search'}
                iconColor={style.Theme.primary}
                iconBackgroundColor={'white'}
                inputStyle={{ color: '#464949' }}
                onChangeText={(text) => this.search(text)}
                style={style.list.searchInputView}
            />
        );
        if (!this.state.isReady) {
            return <AppLoading startAsync={Home._loadAssetsAsync} onFinish={() => this.setState({ isReady: true })} onError={console.warn} />;
        } else if (this.state.emptySearchResults) {
            content = (
                <View style={style.schedule.course.noCourse}>
                    <Text style={style.schedule.course.noCourseText}>Aucun groupe correspondant à cette recherche n'a été trouvé.</Text>
                </View>
            );
        } else if (this.state.sections === null) {
            content = <ActivityIndicator style={style.containerView} size="large" animating={true} />;
        } else {
            content = (
                <SectionList
                    renderItem={({ item, j, index }) => <GroupRow group={item} key={index} openGroup={() => this.openGroup(item)} />}
                    renderSectionHeader={({ section }) => (
                        <SectionListHeader title={section.key} key={section.key} sectionIndex={section.sectionIndex} />
                    )}
                    sections={this.state.sections}
                    keyExtractor={(item, index) => index}
                    initialNumToRender={20}
                    onEndReachedThreshold={0.1}
                    style={style.list.sectionList}
                    onRefresh={() => this.refreshList()}
                    refreshing={this.state.refreshing}
                />
            );
        }
        return (
            <View style={style.list.homeView}>
                {searchInput}
                {content}
            </View>
        );
    }
}
