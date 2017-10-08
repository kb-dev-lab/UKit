import React from 'react';
import {View, Text} from 'react-native';

export default class Split extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title
        };
    }

    render(){
        return (
            <View style={{
                marginVertical: 5
            }}>
            <View style={{
                borderBottomWidth:2,
                borderColor: '#d9d9d9',
                marginBottom: 7
            }}>
            </View>
                <Text style={{
                    color: '#bebebe',
                    paddingLeft: 7,
                    fontWeight: 'bold'
                }}>{this.state.title}</Text>
            </View>
        );
    }
}