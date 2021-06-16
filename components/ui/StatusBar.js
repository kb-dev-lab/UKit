import React from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { AppContext } from '../../utils/DeviceUtils';

import style from '../../Style';

class CustomStatusBar extends React.PureComponent {
	render() {
		return (
			<AppContext.Consumer>
				{({ themeName }) => (
					<StatusBar barStyle="light-content" backgroundColor={style.Theme[themeName].statusBar} />
				)}
			</AppContext.Consumer>
		);
	}
}

export default CustomStatusBar;
