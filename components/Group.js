import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

export default class Results extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.name.replace(/_/g," groupe ")
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            groupName: this.props.navigation.state.params.name,
            schedule: null
         };
        // this.fetchSchedule();
    }

    fetchSchedule() {
        axios.get(`https://hackjack.info/et`)
            .then((response) => {
                this.setState({report: response.data});
            })
    }

    render() {
       return(
           <View>
               <Text>Ceci est l'emploi du temps du groupe {this.state.groupName}</Text>
           </View>
       );
    }
}