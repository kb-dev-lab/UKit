import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Switch, ActivityIndicator, Button } from 'react-native'
import axios from 'axios';

import SettingsManager from '../utils/SettingsManager';
import { MaterialCommunityIcons } from "@expo/vector-icons";

// some code from: https://reactnative.dev/docs/switch to test out features

const style = StyleSheet.create({
    button: {
        backgroundColor: "red",
    },
    container: {
        // flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        // padding: 50
    },
    bg: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#009ee0',
    },
})

class WelcomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIsReady: false,
            isEnabled: false,
            groupList: null,
            groupListFiltered: null,
            selectedGroup: null,
            selectedYear: null,
        };
    }

    toggleSwitch = () => this.setState({ isEnabled: !this.state.isEnabled });

    updateSelectedYear = (year) => {
        this.setState({ selectedYear: year });
        let list = this.state.groupList;
        let newList = [];

        switch (year) {
            case 'L1':
                list.forEach(e => {
                    let groupName = e.name;
                    if (groupName.includes('10') || groupName.includes('20') || groupName.includes('MIASHS1') || groupName.includes('MIASHS2')) {
                        newList.push(e)
                    }
                });
                break;

            case 'L2':
                list.forEach(e => {
                    let groupName = e.name;
                    if (groupName.includes('30') || groupName.includes('40') || groupName.includes('MIASHS3') || groupName.includes('MIASHS4')) {
                        newList.push(e)
                    }
                });
                this.setState({ groupListFiltered: newList })
                break;

            case 'L3':
                list.forEach(e => {
                    let groupName = e.name;
                    if (groupName.includes('50') || groupName.includes('60') || groupName.includes('MIASHS5') || groupName.includes('MIASHS6')) {
                        newList.push(e)
                    }
                });
                break;

            case 'M1':
                list.forEach(e => {
                    let groupName = e.name;
                    if (groupName.includes('Master1')) {
                        newList.push(e)
                    }
                });
                break;

            case 'M2':
                list.forEach(e => {
                    let groupName = e.name;
                    if (groupName.includes('Master2')) {
                        newList.push(e)
                    }
                });
                break;

            default:
                newList = this.state.groupList;
                break;
        }
        this.setState({ groupListFiltered: newList });
    }

    async componentDidMount() {
        await this.fetchList();
    }

    async fetchList() {
        const response = await axios.get('https://hackjack.info/et/json.php?clean=true');
        const list = response.data;

        this.setState({ groupList: list, groupListFiltered: list, pageIsReady: true });
    }

    // MAIN COLOR SHADE
    // #009DE0
    // #45B7E8
    //
    //

    render() {

        let PicketItems = this.state.groupListFiltered?.map((e, i) => {
            return <Picker.Item key={i} label={e.name.replace('_', ' ')} value={e.name} />
        })

        if (!this.state.pageIsReady) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={style.bg}>
                <Text
                    style={{
                        color: '#FFFFFF',
                        textAlign: 'center',
                        fontSize: 36,
                        padding: 40,
                    }}
                >
                    Welcome to UKit !
                </Text>


                <View style={style.container}>
                    <Text>Choose the App's Theme</Text>
                    <Switch
                        trackColor={{ false: "#ffffff", true: "#200f21" }}
                        thumbColor={this.state.isEnabled ? "#00617E" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.isEnabled}
                    />
                </View>
                <View>
                    <Text>Choose your Group!</Text>
                    <Picker
                        selectedValue={this.state.selectedYear}
                        onValueChange={(i) => { this.updateSelectedYear(i) }}
                    >
                        <Picker.Item label='Toutes les années' value='' />
                        <Picker.Item label='L1' value='L1' />
                        <Picker.Item label='L2' value='L2' />
                        <Picker.Item label='L3' value='L3' />
                        <Picker.Item label='M1' value='M1' />
                        <Picker.Item label='M2' value='M2' />
                    </Picker>
                    <Picker
                        selectedValue={this.state.selectedGroup}
                        onValueChange={(i) => { this.setState({ selectedGroup: i }) }}
                    >
                        {PicketItems}
                    </Picker>
                </View>

                <Button
                    title='button'
                    onPress={() => SettingsManager.setLanguage('en')}
                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 0,
                    }}
                    onPress={() => {
                        SettingsManager.setFirstLoad(false);
                        SettingsManager.setTheme(
                            this.state.isEnabled ? 'dark' : 'light'
                        )
                        SettingsManager.setGroup(this.state.selectedGroup);
                        console.log("new group:", this.state.selectedGroup);
                    }}
                >
                    <MaterialCommunityIcons name="chevron-right" size={96} style={{ width: 96, height: 96, color: 'white' }} />
                </TouchableOpacity>

            </View>

        )
    }

}

export default WelcomePage;