import React from 'react';
import {SectionList, TextInput, View, ActivityIndicator, Text} from 'react-native';
import style from '../Style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import GroupRow from './containers/groupRow';
import SectionListHeader from './containers/sectionListHeader';

export default class Home extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Liste des groupes',
        drawerIcon: ({tintColor}) => (
            <MaterialIcons
                name="search"
                size={24}
                style={{color: tintColor}}
            />
        ),
        title: 'Liste des groupes'
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
        this.setState({input, sections: null, emptySearchResults: false});
        let list = this.state.list;
        if (input.length !== 0) {
            let regex = new RegExp(input, "gi");
            list = list.filter(e => {
                return e.name.replace(/_/g, ' ').match(regex);
            });
        }
        if (list.length > 0) {
            this.generateSections(list);
        } else {
            this.setState({emptySearchResults: true});
        }
    };

    render() {
        let content;
        let searchInput = (
            <View style={style.list.searchInputView}>
                <TextInput
                    style={style.list.searchInput}
                    onChangeText={(text) => this.search(text)}
                    value={this.state.text}
                />
            </View>
        );
        if (this.state.sections === null) {
            content = (
                <ActivityIndicator style={style.containerView} size="large" animating={true}/>
            );
        } else if (this.state.emptySearchResults) {
            content = (
                <View style={style.schedule.course.noCourse}>
                    <Text style={style.schedule.course.noCourseText}>Aucun groupe correspondant à cette recherche n'a été trouvé.</Text>
                </View>
            );
        } else {
            content = (
                <SectionList
                    renderItem={({item, j, index}) => <GroupRow group={item} index={parseInt(index)} openGroup={_ => this.openGroup(item)}/>}
                    renderSectionHeader={({section}) => <SectionListHeader title={section.key} sectionIndex={section.sectionIndex}/>}
                    sections={this.state.sections}
                    keyExtractor={(item, index) => String(item.dayNumber) + String(index)}
                    initialNumToRender={100}
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