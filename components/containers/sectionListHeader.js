import React from 'react';
import {View, Text} from 'react-native';
import style from '../../Style';

export default class SectionListHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
           <View style={style.list.sectionHeaderView}>
               <Text style={style.list.sectionHeaderTitle}>{this.props.title}</Text>
           </View>
        );
    }
}