import React from 'react';
import { ActivityIndicator, SectionList, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { Hideo } from 'react-native-textinput-effects';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import 'moment/locale/fr';

import NavigationBackground from './containers/ui/NavigationBackground';
import SectionListHeader from './containers/ui/SectionListHeader';
import Split from './containers/ui/Split';
import GroupRow from './containers/GroupRow';
import style from '../Style';

moment.locale('fr');

class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let title = 'Groupes';
        return {
            drawerLabel: title,
            drawerIcon: ({ tintColor }) => <MaterialIcons name="list" size={24} style={{ color: tintColor }} />,
            title,
            header: (
                <NavigationBackground>
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
                                    paddingLeft: 16,
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
                                            height: 32,
                                            width: 32,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </NavigationBackground>
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

        this.refreshList = this.refreshList.bind(this);
        this.openGroup = this.openGroup.bind(this);
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

            e.cleanName = `${splitName[0]} ${splitName[1]}`;

            if (splitName[0] !== previousSection) {
                if (previousSection !== null) {
                    sections.push(sectionContent);
                }

                previousSection = splitName[0];
                sectionContent = {
                    key: previousSection,
                    data: [],
                    sectionIndex: ++sectionIndex,
                    colorIndex: sectionIndex % style.Theme[this.props.themeName].sections.length,
                };
            }

            e.colorIndex = sectionContent.colorIndex;
            e.sectionStyle = style.list.sections[sectionIndex % style.list.sections.length];

            sectionContent.data.push(e);
        });

        sections.push(sectionContent);

        this.setState({ list, sections, refreshing: false });
    }

    refreshList() {
        this.setState({ refreshing: true });
        this.fetchList();
    }

    getList() {
        this.fetchList();
    }

    fetchList() {
        axios.get('https://hackjack.info/et/json.php?clean=true').then((response) => {
            this.generateSections(response.data, true);
        });
    }

    openGroup(name) {
        const { navigate } = this.props.navigation;
        navigate('Group', { name });
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
        const theme = style.Theme[this.props.themeName];

        let content;
        let searchInput = (
            <Hideo
                iconClass={FontAwesome}
                iconName={'search'}
                iconColor={theme.icon}
                iconBackgroundColor={theme.field}
                inputStyle={{ color: theme.font, backgroundColor: theme.field }}
                onChangeText={(text) => this.search(text)}
                style={style.list.searchInputView}
            />
        );
        if (this.state.emptySearchResults) {
            content = (
                <View style={[style.schedule.course.noCourse, { backgroundColor: theme.greyBackground }]}>
                    <Text style={[style.schedule.course.noCourseText, { color: theme.font }]}>
                        Aucun groupe correspondant à cette recherche n'a été trouvé.
                    </Text>
                </View>
            );
        } else if (this.state.sections === null) {
            content = (
                <View style={{ flex: 1, backgroundColor: theme.background }}>
                    <ActivityIndicator style={[style.containerView]} size="large" animating={true} />
                </View>
            );
        } else {
            content = (
                <SectionList
                    renderItem={({ item, j, index }) => {
                        return (
                            <GroupRow
                                name={item.name}
                                cleanName={item.cleanName}
                                sectionStyle={item.sectionStyle}
                                key={index}
                                color={theme.sections[item.colorIndex]}
                                fontColor={theme.font}
                                openGroup={this.openGroup}
                            />
                        );
                    }}
                    renderSectionHeader={({ section }) => (
                        <SectionListHeader
                            title={section.key}
                            key={section.key}
                            sectionIndex={section.sectionIndex}
                            color={theme.sections[section.colorIndex]}
                            headerColor={theme.sectionsHeaders[section.colorIndex]}
                        />
                    )}
                    sections={this.state.sections}
                    keyExtractor={(item, index) => index}
                    initialNumToRender={20}
                    onEndReachedThreshold={0.1}
                    style={[style.list.sectionList, { backgroundColor: theme.greyBackground }]}
                    onRefresh={this.refreshList}
                    refreshing={this.state.refreshing}
                />
            );
        }
        return (
            <View style={style.list.homeView}>
                {searchInput}
                <Split lineColor={theme.border} noMargin={true} />
                {content}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        themeName: state.darkMode.themeName,
    };
};

export default connect(mapStateToProps)(Home);
