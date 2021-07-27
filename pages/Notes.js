import React from 'react';
import { Text, View, FlatList, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { upperCaseFirstLetter } from '../utils';
import { AppContext } from '../utils/DeviceUtils';
import style from '../Style';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import DataManager from '../utils/DataManager';

class Notes extends React.Component {
	static contextType = AppContext;
	constructor(props) {
		super(props);
		this.state = {
			notesList: DataManager.getNotesList(),
			textInput: '',
		};
	}

	changeTextInput = (textInput) => {
		this.setState({ textInput });
	};

	addTextInputToList = () => {
		if (this.state.textInput !== '') {
			const item = {
				id: 'xxxxxxxxxxxxxxxx'.replace(/x/g, () => Math.ceil(Math.random() * 10)),
				text: this.state.textInput,
				selected: false,
			};
			DataManager.addNotesList(item);
			this.setState({ textInput: '' });
			Keyboard.dismiss();
		}
	};

	renderItem = ({ item }) => {
		const theme = style.Theme[this.context.themeName];
		const _onPress = () => {
			item.selected = !item.selected;
			DataManager.updateNotesList(item);
		};
		const _onLongPress = () => {
			DataManager.removeNotesList(item);
		};
		return (
			<TouchableOpacity
				onPress={_onPress}
				onLongPress={_onLongPress}
				style={{
					backgroundColor: theme.settings.button.backgroundColor,
					marginHorizontal: 16,
					marginVertical: 4,
					padding: 16,
					borderRadius: 16,
					flex: 1,
					flexDirection: 'row',
				}}>
				<MaterialCommunityIcons
					name={item.selected ? 'check-circle-outline' : 'circle-outline'}
					size={24}
					color={theme.icon}
				/>
				<Text
					style={{
						textDecorationLine: item.selected ? 'line-through' : 'none',
						fontSize: 16,
						color: theme.fontSecondary,
						marginHorizontal: 8,
					}}>
					{item.text}
				</Text>
			</TouchableOpacity>
		);
	};

	render() {
		const theme = style.Theme[this.context.themeName];

		DataManager.on('notesList', (newList) => {
			this.setState({ notesList: newList });
		});

		return (
			<SafeAreaView
				style={{ flex: 1, backgroundColor: theme.settings.background.backgroundColor }}>
				<View
					style={{
						justifyContent: 'center',
						flexDirection: 'row',
						alignItems: 'center',
						marginVertical: 10,
					}}>
					<Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.fontSecondary }}>
						{upperCaseFirstLetter(moment().format('dddd L'))}
					</Text>
				</View>
				<View style={{ flex: 1 }}>
					<FlatList
						data={this.state.notesList}
						renderItem={this.renderItem}
						keyExtractor={(item) => item.id}
					/>
				</View>
				<View style={{ marginVertical: 8, marginHorizontal: 16 }}>
					<View style={{ flexDirection: 'row' }}>
						<TextInput
							value={this.state.textInput}
							onChangeText={this.changeTextInput}
							style={{
								backgroundColor: theme.settings.button.backgroundColor,
								color: theme.fontSecondary,
								marginHorizontal: 4,
								fontSize: 16,
								marginVertical: 4,
								padding: 8,
								borderRadius: 16,
								flex: 1,
							}}
						/>
						<TouchableOpacity
							onPress={this.addTextInputToList}
							style={{
								marginHorizontal: 4,
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<MaterialCommunityIcons
								name={'plus-circle-outline'}
								size={36}
								color={theme.icon}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

export default Notes;
