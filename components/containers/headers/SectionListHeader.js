import React from 'react';
import { Text, View } from 'react-native';

import style from '../../../Style';

export default class SectionListHeader extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getBackgroundSectionStyle() {
        let indexStyle = this.props.sectionIndex % style.list.sectionHeaders.length;
        return style.list.sections[indexStyle];
    }

    getSectionStyle() {
        let indexStyle = this.props.sectionIndex % style.list.sectionHeaders.length;
        return style.list.sectionHeaders[indexStyle];
    }

    render() {
        return (
            <View style={this.getBackgroundSectionStyle()}>
                <View style={[style.list.sectionHeaderView, this.getSectionStyle()]}>
                    <Text style={style.list.sectionHeaderTitle}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}
