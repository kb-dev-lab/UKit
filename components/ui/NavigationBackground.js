import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import style from '../../Style';

const mapStateToProps = (state) => ({ themeName: state.darkMode.themeName });

export default connect(mapStateToProps)((props) => {
    return <View style={{ backgroundColor: style.Theme[props.themeName].primary }}>{props.children}</View>;
});
