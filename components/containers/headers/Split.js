import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Split extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    marginVertical: 5,
                }}>
                <View
                    style={{
                        borderBottomWidth: 2,
                        borderColor: '#d9d9d9',
                        marginBottom: 7,
                    }}
                />
                <Text
                    style={{
                        color: '#bebebe',
                        paddingLeft: 7,
                        fontWeight: 'bold',
                    }}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}
