import React from 'react';
import { Text, View } from 'react-native';

import DrawerButton from './DrawerButton';
import style from '../../Style';
import Translator from '../../utils/translator';

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
		this.props.navigate('Group', { name: this.props.groupName });
	};

	render() {
		const theme = style.Theme[this.props.themeName];
		const favoriteGroup = this.props.groupName;

		if (!favoriteGroup) {
			return (
				<View style={{ paddingLeft: 24, paddingVertical: 4 }}>
					<Text style={{ color: theme.font }}>{Translator.get('NONE')}</Text>
				</View>
			);
		} else {
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
}

export default MyGroupButton;
