import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import NavigationBar from 'react-native-navbar';
import PropTypes from 'prop-types';

import NavigationBackground from './NavigationBackground';

export default class NavBar extends React.PureComponent {
    static propTypes = {
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        title: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { leftButton, rightButton, title } = this.props;

        let style = {},
            titleStyle = {};
        if (Platform.OS === 'android') {
            style.height = 56;
            titleStyle.fontSize = 22;
            titleStyle.fontWeight = 'bold';
        }

        return (
            <NavigationBackground>
                <NavigationBar
                    style={style}
                    title={{ title, tintColor: 'white', style: titleStyle }}
                    tintColor={'transparent'}
                    leftButton={leftButton}
                    rightButton={rightButton}
                    statusBar={{ style: 'light-content' }}
                />
            </NavigationBackground>
        );
    }
}
