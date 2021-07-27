import React from 'react';
import { Text, View, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { upperCaseFirstLetter } from '../utils';
import { AppContext } from '../utils/DeviceUtils';
import style from '../Style';
import moment from 'moment';

const NOTES_CONTENT = [
	{
		id: '1',
		text: 'BLABLA',
		selected: false,
	},
	{
		id: '2',
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique eu urna a feugiat. In euismod hendrerit augue, et ultrices lorem molestie nec. Integer nisi felis, posuere non semper viverra, feugiat quis turpis. Maecenas quis volutpat lectus, eget venenatis eros. ',
		selected: true,
	},
	{
		id: '3',
		text: 'BLABLA',
		selected: true,
	},
];

class ToDoList extends React.Component {
	static contextType = AppContext;

	renderItem = ({ item }) => {
		const theme = style.Theme[this.context.themeName];
		return (
			<View
				style={{
					backgroundColor: '#FFF',
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
			</View>
		);
	};

	render() {
		const theme = style.Theme[this.context.themeName];

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: theme.greyBackground }}>
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
						data={NOTES_CONTENT}
						renderItem={this.renderItem}
						keyExtractor={(item) => item.id}
					/>
				</View>
				<TextInput
					style={{
						backgroundColor: '#FFF',
						marginHorizontal: 16,
						marginVertical: 4,
						padding: 8,
						borderRadius: 16,
					}}
				/>
			</SafeAreaView>
		);
	}
}

export default ToDoList;
