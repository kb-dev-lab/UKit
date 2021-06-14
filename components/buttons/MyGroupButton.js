import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import DrawerButton from './DrawerButton';
import style from '../../Style';
import SettingsManager from '../../utils/SettingsManager';
import Translator from '../../utils/translator';

class MyGroupButton extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (SettingsManager.getGroup() !== null) {
			this.props.navigate('Home', {
				screen: 'Group',
				params: {
					name: SettingsManager.getGroup(),
				},
			});
		}
	}

	_onPress = () => {
		this.props.navigate('Group', { name: SettingsManager.getGroup() });
	};

	render() {
		const theme = style.Theme[this.props.themeName];
		const favoriteGroup = SettingsManager.getGroup();

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

const mapStateToProps = (state) => {
	return {
		savedGroup: state.favorite.groupName,
		themeName: state.darkMode.themeName,
	};
};

export default connect(mapStateToProps)(MyGroupButton);
