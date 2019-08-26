import React from 'react';
import { Platform, StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

export default class SettingsCategoryHeader extends React.PureComponent {

    static propTypes = {
        container: PropTypes.object,
        containerStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        titleProps: PropTypes.object,
        titleStyle: Text.propTypes.style,
        title: PropTypes.string.isRequired,
    };

    static defaultProps = {
        container: {},
        containerStyle: {},
        titleProps: {},
        titleStyle: {},
    };

    render() {
        const {container, containerStyle, titleProps, titleStyle, title} = this.props;

        return <View {...container} style={containerStyle}>
            <Text {...titleProps} style={[styles.defaultTitleStyle, titleStyle]}>{title.toUpperCase()}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    defaultTitleStyle: {
        borderWidth: 0,
        fontWeight: "300",
        color: (Platform.OS === "ios") ? "#424246" : "#000000",
        fontSize: (Platform.OS === "ios") ? 13 : 16,
        padding: 16,
        paddingTop: 16,
        paddingBottom: 4,
    },

});