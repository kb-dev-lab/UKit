import React from 'react';
import {View} from 'react-native';

export default class Split extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={{
                borderBottomWidth:1,
                borderColor: '#303030'
            }}>
            </View>
        );
    }
}