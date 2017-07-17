import React from 'react';
import {View, ListView, ActivityIndicator, Text} from 'react-native';
import axios from 'axios';
import style from '../Style';
import CourseRow from "./containers/courseRow";

export default class Week extends React.Component {
    static navigationOptions = {
        title: "Semaine"
    };

    constructor(props) {
        super(props);
        this.state = {
            groupName: this.props.screenProps.groupName,
            schedule: null
        };
        this.fetchSchedule(this.state.groupName);
    }

    fetchSchedule(groupName) {
        let data = groupName.split('_');
        axios.get(`https://hackjack.info/et/json.php?type=day&name=${data[0]}&group=${data[1]}&date=2017/04/03`)
            .then((response) => {
                this.setState({schedule: response.data});
            });
    }

    render() {
        if (this.state.schedule === null) {
            return (
                <ActivityIndicator style={style.containerView} size="large" animating={true}/>
            );
        } else if (this.state.schedule instanceof Array) {
            if (this.state.schedule.length === 0) {
                return (
                    <View>
                        <Text>Pas de cours</Text>
                    </View>
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
}