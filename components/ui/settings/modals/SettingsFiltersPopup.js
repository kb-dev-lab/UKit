import React, { useRef } from 'react';
import {
	Text,
	TouchableOpacity,
	View,
	Modal,
	Platform,
	FlatList,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Translator from '../../../../utils/translator';
import SettingsManager from '../../../../utils/SettingsManager';
import SettingsDismissKeyboard from '../SettingsDismissKeyboard';

export default ({
	theme,
	popupVisible,
	popupClose,
	filterList,
	filterTextInput,
	setFilterTextInput,
	submitFilterTextInput,
}) => {
	const flatListRef = useRef(null);
	const scrollToEnd = () => {
		flatListRef.current.scrollToEnd();
	};
	const renderFilterItem = ({ item }) => {
		const removeFilters = () => {
			SettingsManager.removeFilters(item);
		};
		return (
			<TouchableOpacity
				key={item}
				onLongPress={removeFilters}
				style={theme.popup.filters.button}>
				<Text style={theme.popup.filters.buttonText}>{item}</Text>
			</TouchableOpacity>
		);
	};
	const addFilterTextInput = () => {
		submitFilterTextInput();
		setTimeout(() => {
			scrollToEnd();
		}, 500);
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={popupVisible}
			onRequestClose={popupClose}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'height' : ''}
				style={{ flex: 1 }}>
				<SettingsDismissKeyboard>
					<View style={theme.popup.filters.container}>
						<View style={theme.popup.filters.header}>
							<Text style={theme.popup.textHeader}>
								{Translator.get('FILTERS').toUpperCase()}
							</Text>
							<TouchableOpacity onPress={popupClose}>
								<MaterialIcons
									name="close"
									size={32}
									style={theme.popup.closeIcon}
								/>
							</TouchableOpacity>
						</View>
						<Text style={theme.popup.textDescription}>
							{Translator.get('REMOVE_FILTER')}
						</Text>
						<View style={theme.popup.filterListContainer}>
							<FlatList
								ref={flatListRef}
								keyExtractor={(item) => item}
								data={filterList}
								renderItem={renderFilterItem}
								numColumns={2}
								ListEmptyComponent={
									<Text style={theme.popup.textDescription}>
										{Translator.get('NO_FILTER')}
									</Text>
								}
							/>
						</View>
						<View style={theme.popup.filters.footer}>
							<TextInput
								style={theme.popup.textInput}
								onChangeText={setFilterTextInput}
								value={filterTextInput}
								placeholder="4TIN603U"
								placeholderTextColor={theme.popup.textInputPlaceholderColor}
								autoCorrect={false}
								keyboardType={
									Platform.OS === 'ios' ? 'default' : 'visible-password'
								}
							/>
							<TouchableOpacity onPress={addFilterTextInput}>
								<MaterialIcons
									name="add"
									size={32}
									color={theme.popup.textInputIconColor}
								/>
							</TouchableOpacity>
						</View>
						<Text style={theme.popup.textDescription}>
							{Translator.get('FILTERS_ENTER_CODE')}
						</Text>
					</View>
				</SettingsDismissKeyboard>
			</KeyboardAvoidingView>
		</Modal>
	);
};
