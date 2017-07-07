import React from 'react';
import {ListView, ActivityIndicator} from 'react-native';
import style from '../Style';
import {StackNavigator} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import GroupRow from './containers/groupRow';

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
            list: null
        };
        this.fetchList();
    }

    fetchList() {
        axios.get('https://hackjack.info/et/json.php')
            .then((response) => {
                let groupList = [];
                for (let groupName in response.data) {
                    if (response.data.hasOwnProperty(groupName)) {
                        groupList.push({name: groupName, code: response.data[groupName]})
                    }
                }
                console.log(groupList);
                this.setState({list: groupList});
            })
    }

    render() {
        if (this.state.list === null) {
            return (
                <ActivityIndicator style={style.containerView} size="large" animating={true}/>
            );
        } else {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            return (
                <ListView
                    dataSource={ds.cloneWithRows(this.state.list)}
                    pageSize={10}
                    renderRow={(row, j, index) => <GroupRow group={row} index={parseInt(index)}/>}
                />
            );
        }
    }
}