import React from 'react';
import {View, ListView, ActivityIndicator} from 'react-native';
import axios from 'axios';
import style from '../Style';
import CourseRow from "./containers/courseRow";

export default class Results extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.name.replace(/_/g, " Groupe ")
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            groupName: this.props.navigation.state.params.name,
            schedule: null
        };
        this.fetchSchedule(this.props.navigation.state.params.name);
    }

    fetchSchedule(groupName) {
        let data = groupName.split('_');
        axios.get(`http://hackjack.info/et/json.php?type=day&name=${data[0]}&group=${data[1]}&date=2017/04/03`)
            .then((response) => {
                this.setState({schedule: response.data});
            });
    }

    render() {
        if (this.state.schedule === null) {
            return (
                <ActivityIndicator style={style.containerView} size="large" animating={true}/>
            );
        } else {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            return (
                <ListView
                    dataSource={ds.cloneWithRows(this.state.schedule)}
                    pageSize={10}
                    renderRow={(row, j, index) => <CourseRow data={row} index={parseInt(index)}/>}
                />
            );
        }
    }
}