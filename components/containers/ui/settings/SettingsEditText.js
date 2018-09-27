import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

export default class SettingsEditText extends React.Component {
    static propTypes = {
        containerProps: PropTypes.object,
        containerStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        disabledOverlayStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        titleProps: PropTypes.object,
        titleStyle: Text.propTypes.style,
        title: PropTypes.string.isRequired,
        valueProps: PropTypes.object,
        valueStyle: Text.propTypes.style,
        value: PropTypes.string.isRequired,
        valuePlaceholder: PropTypes.string,
        disabled: PropTypes.bool,
        touchableProps: PropTypes.object,
        onPress: PropTypes.func.isRequired,
    };

    static defaultProps = {
        containerProps: {},
        containerStyle: {},
        disabledOverlayStyle: {},
        titleProps: {},
        titleStyle: {},
        valueProps: {},
        valuePlaceholder: '...',
        valueStyle: {},
        disabled: false,
        androidDialogProps: {},
        touchableProps: {},
        onPress: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            dialogShow: false,
        };
    }

    trimValue = (val) => {
        return val ? val.trim() : '';
    };

    render() {
        const {
            disabled,
            containerProps,
            containerStyle,
            title,
            titleProps,
            titleStyle,
            valueProps,
            valueStyle,
            valuePlaceholder,
            disabledOverlayStyle,
            touchableProps,
            value,
            onPress,
        } = this.props;

        return !disabled ? (
            <TouchableOpacity {...touchableProps} onPress={onPress}>
                <View {...containerProps} style={[styles.defaultContainerStyle, containerStyle]}>
                    <Text numberOfLines={1} {...titleProps} style={[styles.defaultTitleStyle, titleStyle]}>
                        {title}
                    </Text>
                    <Text numberOfLines={1} {...valueProps} style={[styles.defaultValueStyle, valueStyle]}>
                        {value ? value : valuePlaceholder}
                    </Text>
                </View>
            </TouchableOpacity>
        ) : (
            <View {...containerProps} style={[styles.defaultContainerStyle, containerStyle]}>
                <Text numberOfLines={1} {...titleProps} style={[styles.defaultTitleStyle, titleStyle]}>
                    {title}
                </Text>
                <Text numberOfLines={1} {...valueProps} style={[styles.defaultValueStyle, valueStyle]}>
                    {value ? value : valuePlaceholder}
                </Text>
                <View
                    style={[
                        { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
                        styles.defaultDisabledOverlayStyle,
                        disabledOverlayStyle,
                    ]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    defaultContainerStyle: {
        padding: 0,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
    },
    defaultTitleStyle: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 8,
        fontSize: 16,
    },
    defaultValueStyle: {
        color: '#a0a0a0',
        fontSize: 14,
        flex: 1,
        paddingLeft: 8,
        paddingRight: 16,
        textAlign: 'right',
    },
    defaultDisabledOverlayStyle: {
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
});
