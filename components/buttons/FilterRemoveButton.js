import React from 'react';
import { TouchableOpacity, View, Modal, Text } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import SettingsManager from '../../utils/SettingsManager';
import Translator from '../../utils/translator';
import style from '../../Style';

class FilterRemoveButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popupVisible: false,
		};
	}

	popupClose = () => this.setState({ popupVisible: false });

	openPopup = () => this.setState({ popupVisible: true });

	filterOutUE = () => {
		if (this.props.UE) {
			SettingsManager.addFilters(this.props.UE);
		}
        this.popupClose();
        this.props.backAction();
	};

	render() {
        const theme = style.Theme[this.props.themeName].settings;
		return (
			<View>
				<TouchableOpacity
					onPress={this.openPopup}
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<View>
						<MaterialCommunityIcons
							name="filter-variant-remove"
							size={30}
							style={{ color: '#FFFFFF', height: 32, width: 32 }}
						/>
					</View>
				</TouchableOpacity>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.popupVisible}
					onRequestClose={this.popupClose}>
					<View style={theme.popup.background}>
						<View style={theme.popup.container}>
							<View style={theme.popup.header}>
								<Text style={theme.popup.textHeader}>
									{Translator.get('FILTERS_UE').toUpperCase()}
								</Text>
								<TouchableOpacity onPress={this.popupClose}>
									<MaterialIcons
										name="close"
										size={32}
										style={theme.popup.closeIcon}
									/>
								</TouchableOpacity>
							</View>
							<Text style={theme.popup.textDescription}>
								{Translator.get('FILTERS_CONFIRMATION')}
							</Text>
							<View style={theme.popup.buttonContainer}>
								<TouchableOpacity
									style={theme.popup.buttonSecondary}
									onPress={this.popupClose}>
									<Text style={theme.popup.buttonTextSecondary}>
										{Translator.get('CANCEL')}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity style={theme.popup.buttonMain} onPress={this.filterOutUE}>
									<Text style={theme.popup.buttonTextMain}>
										{Translator.get('CONFIRM')}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

export default FilterRemoveButton;
