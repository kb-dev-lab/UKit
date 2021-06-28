import React from 'react';
import { Text, TouchableOpacity, View, Modal, Platform, FlatList, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Translator from '../../../../utils/translator';
import SettingsManager from '../../../../utils/SettingsManager';

const renderFilterItem = ({ item }) => {
	const removeFilters = () => {
		SettingsManager.removeFilters(item);
	};
	return (
		<TouchableOpacity
			key={item}
			onLongPress={removeFilters}
			style={{
				backgroundColor: '#EAEAEC',
				padding: 8,
				borderRadius: 16,
				margin: 8,
				flexDirection: 'row',
				alignItems: 'center',
			}}>
			<Text
				style={{
					fontSize: 18,
					fontWeight: 'bold',
					color: '#4C5464',
				}}>
				{item}
			</Text>
			<MaterialIcons name="close" size={22} color="#4C546455" />
		</TouchableOpacity>
	);
};

export default ({
	theme,
	popupVisible,
	popupClose,
	filterList,
	filterTextInput,
	setFilterTextInput,
	submitFilterTextInput,
}) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={popupVisible}
			onRequestClose={popupClose}>
			<View style={theme.popup.background}>
				<View style={theme.popup.container}>
					<View style={theme.popup.header}>
						<Text style={theme.popup.textHeader}>
							{Translator.get('FILTERS').toUpperCase()}
						</Text>
						<TouchableOpacity onPress={popupClose}>
							<MaterialIcons name="close" size={32} style={theme.popup.closeIcon} />
						</TouchableOpacity>
					</View>
					<Text style={theme.popup.textDescription}>
						{Translator.get('REMOVE_FILTER')}
					</Text>
					<View style={theme.popup.filterListContainer}>
						<FlatList
							keyExtractor={(item) => item}
							data={filterList}
							renderItem={renderFilterItem}
							horizontal={true}
							ListEmptyComponent={
								<Text style={theme.popup.textDescription}>
									{Translator.get('NO_FILTER')}
								</Text>
							}
						/>
					</View>
					<Text style={theme.popup.textDescription}>
						{Translator.get('FILTERS_ENTER_CODE')}
					</Text>
					<View style={theme.popup.textInputContainer}>
						<TextInput
							style={theme.popup.textInput}
							onChangeText={setFilterTextInput}
							value={filterTextInput}
							placeholder="4TIN603U"
							placeholderTextColor={theme.popup.textInputPlaceholderColor}
							autoCorrect={false}
							keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
						/>
						<TouchableOpacity onPress={submitFilterTextInput}>
							<MaterialIcons
								name="add"
								size={32}
								color={theme.popup.textInputIconColor}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};
