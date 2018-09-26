import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Split extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
        color: PropTypes.string,
        lineColor: PropTypes.string,
        noMargin: PropTypes.bool,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    marginVertical: this.props.noMargin || this.props.onlyBottomMargin ? 0 : 8,
                }}>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: this.props.lineColor,
                        marginBottom: this.props.noMargin ? 0 : 8,
                    }}
                />
                {this.props.title && (
                    <Text
                        style={{
                            color: this.props.color,
                            paddingLeft: 16,
                            fontWeight: 'bold',
                        }}>
                        {this.props.title}
                    </Text>
                )}
            </View>
        );
    }
}
