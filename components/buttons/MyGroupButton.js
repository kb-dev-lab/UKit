import React from 'react';

import DrawerButton from './DrawerButton';
import style from '../../Style';
import SettingsManager from '../../utils/SettingsManager';

class MyGroupButton extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (this.props.groupName !== null && SettingsManager.getOpenAppOnFavoriteGroup()) {
			this.props.navigate('Home', {
				screen: 'Group',
				params: {
					name: this.props.groupName,
				},
			});
		}
	}

	_onPress = () => {
		this.props.navigate('Home', {
			screen: 'Group',
			params: {
				name: this.props.groupName,
			},
		});
	};

	render() {
		const theme = style.Theme[this.props.themeName];
		const favoriteGroup = this.props.groupName;

		return (
			<DrawerButton
				title={favoriteGroup.replace('_', ' ')}
				size={28}
				textSize={14}
				icon={'star'}
				color={theme.icon}
				fontColor={theme.font}
				onPress={this._onPress}
			/>
		);
	}
}

export default MyGroupButton;
