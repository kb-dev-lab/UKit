import React from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import style from '../../Style';

class CustomStatusBar extends React.PureComponent {
    render() {
        const theme = style.Theme[this.props.themeName];
        return <StatusBar barStyle="light-content" backgroundColor={theme.statusBar} />;
    }
}

const mapStateToProps = (state) => {
    return {
        themeName: state.darkMode.themeName,
    };
};

export default connect(mapStateToProps)(CustomStatusBar);
