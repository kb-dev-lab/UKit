import React from 'react';
import {SectionList, View, ActivityIndicator, Text, StatusBar, Platform, TouchableHighlight} from 'react-native';
import style from '../Style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import GroupRow from './containers/groupRow';
import SectionListHeader from './containers/sectionListHeader';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Hideo} from 'react-native-textinput-effects';
import NavigationBar from 'react-native-navbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        let title = 'Groupes';
        return {
            drawerLabel: title,
            drawerIcon: ({tintColor}) => (
                <MaterialIcons
                    name="list"
                    size={24}
                    style={{color: tintColor}}
                />
            ),
            title,
            header: (
                <View
                    style={{
                        paddingTop: (Platform.OS === "android") ? StatusBar.currentHeight : 0,
                        backgroundColor: style.colors.green
                    }}>
                    <NavigationBar
                        title={{title, tintColor: "white"}}
                        tintColor={"transparent"}
                        leftButton={
                            <TouchableHighlight onPress={_ => {navigation.navigate('DrawerOpen')}} underlayColor={"transparent"} style={{
                                justifyContent: 'space-around',
                                paddingLeft: 5
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <MaterialCommunityIcons
                                        name="menu"
                                        size={32}
                                        style={{
                                            color: 'white'
                                        }}
                                    />
                                </View>
                            </TouchableHighlight>
                        }
                    />
                </View>
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            sections: null,
            list: null,
            emptySearchResults: false
        };
        this.fetchList();
    }

    generateSections(list) {
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
                sectionContent = {key: previousSection, data: [], sectionIndex: ++sectionIndex};
            }
            e.sectionIndex = sectionIndex;
            sectionContent.data.push(e);
        });
        sections.push(sectionContent);
        this.setState({sections});
    }

    fetchList() {
        axios.get('https://hackjack.info/et/json.php')
            .then((response) => {
                let groupList = [];
                for (let groupName in response.data) {
                    if (response.data.hasOwnProperty(groupName)) {
                        groupList.push({name: groupName, code: response.data[groupName]});
                    }
                }
                let list = groupList.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                this.setState({list});
                this.generateSections(list);
            });
    }

    openGroup(group) {
        const {navigate} = this.props.navigation;
        navigate('Group', {name: group.name, code: group.code});
    }

    search(input) {
        this.setState({sections: null, emptySearchResults: false});
        let list = this.state.list;
        if (input.length !== 0) {
            let regex = new RegExp(input, "gi");
            list = list.filter(e => {
                return e.name.replace(/_/g, ' ').match(regex);
            });
        }
        if (list.length > 0) {
            this.setState({emptySearchResults: false});
            this.generateSections(list);
        } else {
            this.setState({emptySearchResults: true});
        }
    }
    ;

    render() {
        let content;
        let searchInput = (
            <Hideo
                iconClass={FontAwesomeIcon}
                iconName={'search'}
                iconColor={'white'}
                iconBackgroundColor={'#4CAF50'}
                inputStyle={{color: '#464949'}}
                onChangeText={(text) => this.search(text)}
                style={style.list.searchInputView}
            />
        );
        if (this.state.emptySearchResults) {
            content = (
                <View style={style.schedule.course.noCourse}>
                    <Text style={style.schedule.course.noCourseText}>Aucun groupe correspondant à cette recherche n'a été trouvé.</Text>
                </View>
            );
        } else if (this.state.sections === null) {
            content = (
                <ActivityIndicator style={style.containerView} size="large" animating={true}/>
            );
        } else {
            content = (
                <SectionList
                    renderItem={({item, j, index}) => <GroupRow group={item} index={parseInt(index)} openGroup={_ => this.openGroup(item)}/>}
                    renderSectionHeader={({section}) => <SectionListHeader title={section.key} sectionIndex={section.sectionIndex}/>}
                    sections={this.state.sections}
                    keyExtractor={(item, index) => String(item.dayNumber) + String(index)}
                    initialNumToRender={100}
                    style={style.list.sectionList}
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