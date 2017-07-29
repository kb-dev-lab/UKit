import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import style from '../../Style';

export default class CourseRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data.category === 'nocourse') {
            return (
                <View style={style.schedule.course.row}>
                    <Text style={style.schedule.course.title}>Aucun cours ce jour</Text>
                </View>
            );
        }
        else {
            return (
                <TouchableHighlight onPress={() => {
                }} underlayColor="white">
                    <View style={style.schedule.course.row}>
                        <Text style={style.schedule.course.title}>{this.props.data.schedule}</Text>
                        <View style={style.schedule.course.line}>
                            <Text style={style.schedule.course.header}>Cours : </Text>
                            <Text style={style.schedule.course.content}>{this.props.data.subject}</Text>
                        </View>
                        <View style={style.schedule.course.line}>
                            <Text style={style.schedule.course.header}>Avec : </Text>
                            <Text style={style.schedule.course.content}>{this.props.data.staff}</Text>
                        </View>
                        <View style={style.schedule.course.line}>
                            <Text style={style.schedule.course.header}>Salle : </Text>
                            <Text style={style.schedule.course.content}>{this.props.data.room}</Text>
                        </View>
                        <View style={style.schedule.course.line}>
                            <Text style={style.schedule.course.header}>Groupes : </Text>
                            <Text style={style.schedule.course.content}>{this.props.data.group}</Text>
                        </View>
                        <View style={style.schedule.course.line}>
                            <Text style={style.schedule.course.header}>Notes : </Text>
                            <Text style={style.schedule.course.content}>{this.props.data.annotation}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        }
    }
}