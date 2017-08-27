import React from 'react';
import {SectionList, Text, ActivityIndicator} from 'react-native';
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
            sections: null
        };
        this.fetchList();
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

                let sections = [];
                let sectionContent = null;
                let previousSection = null;
                list.forEach((e) => {
                    let splitName = e.name.split('_');
                    if (splitName[0] !== previousSection) {
                        if (previousSection !== null) {
                            sections.push(sectionContent);
                        }
                        previousSection = splitName[0];
                        sectionContent = {key: previousSection, data: []};
                    }
                    sectionContent.data.push(e);
                });
                sections.push(sectionContent);
                console.log(sections);
                this.setState({sections});
            });
    }

    openGroup(group) {
        const {navigate} = this.props.navigation;
        navigate('Group', {name: group.name, code: group.code});
    }

    render() {
        if (this.state.sections === null) {
            return (
                <ActivityIndicator style={style.containerView} size="large" animating={true}/>
            );
        } else {
            return (
                <SectionList
                    renderItem={({item, j, index}) => <GroupRow group={item} index={parseInt(index)}
                                                                openGroup={_ => this.openGroup(item)}/>}
                    renderSectionHeader={({section}) => <SectionListHeader title={section.key}/>}
                    sections={this.state.sections}
                    keyExtractor={(item, index) => String(item.dayNumber) + String(index)}
                    initialNumToRender={100}
                />
            );
        }
    }
}