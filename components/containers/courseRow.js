import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import style from '../../Style';

export default class CourseRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight onPress={() => {}} underlayColor="white">
                <View style={[style.list.view]}>
                    <Text>{this.props.data.schedule}</Text>
                    <Text>Cours : {this.props.data.subject}</Text>
                    <Text>Avec : {this.props.data.staff}</Text>
                    <Text>Salle : {this.props.data.room}</Text>
                    <Text>Groupes : {this.props.data.group}</Text>
                    <Text>Notes : {this.props.data.annotation}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}