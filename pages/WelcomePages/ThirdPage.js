import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TextInput } from 'react-native-gesture-handler';

import SettingsManager from '../../utils/SettingsManager';
import Translator from '../../utils/translator';
import styles, { GradientColor, PlaceholderTextColor } from '../../StyleWelcome';
import WelcomeButton from '../../components/buttons/WelcomeButton';
import WelcomePagination from '../../components/ui/WelcomePagination';
import WelcomeBackButton from '../../components/buttons/WelcomeBackButton';

const MAXIMUM_NUMBER_ITEMS_GROUPLIST = 10;

const UNIVERSITY_YEARS_LIST = [
	{
		id: 'L1',
		title: 'Licence 1',
	},
	{
		id: 'L2',
		title: 'Licence 2',
	},
	{
		id: 'L3',
		title: 'Licence 3',
	},
	{
		id: 'M1',
		title: 'Master 1',
	},
	{
		id: 'M2',
		title: 'Master 2',
	},
];

const UNIVERSITY_SEASON_LIST = [
	{ id: 'autumn', title: Translator.get('AUTUMN') },
	{ id: 'spring', title: Translator.get('SPRING') },
];

const filterCaseAutumn = {
	L1: ['10', 'MIASHS1'],
	L2: ['30', 'MIASHS3'],
	L3: ['50', 'MIASHS5'],
	M1: ['Master1'],
	M2: ['Master2'],
};

const filterCaseSpring = {
	L1: ['20', 'MIASHS2'],
	L2: ['40', 'MIASHS4'],
	L3: ['60', 'MIASHS6'],
	M1: ['Master1'],
	M2: ['Master2'],
};

const filterSeason = {
	autumn: filterCaseAutumn,
	spring: filterCaseSpring,
};

const GroupItem = ({ item, index, selected, onPress }) => {
	const styleButton = selected ? styles('whiteCardButtonSelected') : styles('whiteCardButton');
	const styleText = selected
		? styles('whiteCardButtonTextSelected')
		: styles('whiteCardButtonText');

	return (
		<TouchableOpacity onPress={onPress} key={index} style={styleButton}>
			<Text style={styleText}>{item.replace('_', ' ')}</Text>
		</TouchableOpacity>
	);
};

class ThirdWelcomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	filterList = (year, season, textFilter) => {
		const newList = [];

		if (year && season) {
			const list = this.props.getState('groupList');
			
			list.forEach((e) => {
				const groupName = e.toLowerCase();

				filterSeason[season.id][year.id].forEach((filter) => {
					if (
						groupName.includes(filter.toLowerCase()) &&
						groupName.includes(textFilter.toLowerCase())
					) {
						newList.push(e);
					}
				});
			});
		}

		this.props.changeState('groupListFiltered', newList);
		this.props.changeState('year', year);
		this.props.changeState('season', season);
		this.props.changeState('textFilter', textFilter);
	};

	onChangeText = (text) => {
		this.filterList(this.props.getState('year'), this.props.getState('season'), text);
	};

	selectYear = (year) => {
		this.filterList(year, this.props.getState('season'), this.props.getState('textFilter'));
	};

	selectSeason = (season) => {
		this.filterList(this.props.getState('year'), season, this.props.getState('textFilter'));
	};

	selectGroup = (group) => {
		const newGroup = this.props.getState('group') === group ? null : group;

		SettingsManager.setGroup(newGroup);
		this.props.changeState('group', newGroup);
	};

	renderGroupListItem = ({ item, index }) => {
		if (index > MAXIMUM_NUMBER_ITEMS_GROUPLIST) {
			return;
		}
		return (
			<GroupItem
				item={item}
				index={index}
				selected={this.props.getState('group') === item}
				onPress={() => this.selectGroup(item)}
			/>
		);
	};

	extractGroupListItemId = (item) => {
		return item;
	};

	static getCalendarListItemLayout(data, index) {
		return {
			length: 50,
			offset: 50 * index,
			index,
		};
	}

	render() {
		const { navigation } = this.props;
		return (
			<LinearGradient
				style={{ flex: 1, display: 'flex' }}
				colors={GradientColor()}
				start={{ x: 0.05, y: 0.05 }}
				end={{ x: 0.95, y: 0.95 }}>
				<SafeAreaView style={{ flex: 1 }}>
					<KeyboardAvoidingView
						style={{ flex: 1 }}
						behavior={Platform.OS === 'ios' ? 'height' : ''}>
						<WelcomeBackButton onPress={navigation.goBack} />
						<ScrollView style={styles('whiteCardContainer')}>
							<View style={styles('whiteCard')}>
								<Text style={styles('whiteCardText')}>
									{Translator.get('YOUR_YEAR')}
								</Text>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'wrap',
										justifyContent: 'flex-start',
									}}>
									{UNIVERSITY_YEARS_LIST.map((yearEntry) => (
										<TouchableOpacity
											key={yearEntry.id}
											onPress={() => this.selectYear(yearEntry)}
											style={
												this.props.getState('year') === yearEntry
													? styles('whiteCardButtonSelected')
													: styles('whiteCardButton')
											}>
											<Text
												style={
													this.props.getState('year') === yearEntry
														? styles('whiteCardButtonTextSelected')
														: styles('whiteCardButtonText')
												}>
												{yearEntry.title}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>

							<View style={styles('whiteCard')}>
								<Text style={styles('whiteCardText')}>
									{Translator.get('YOUR_SEMESTER')}
								</Text>
								{UNIVERSITY_SEASON_LIST.map((seasonEntry) => (
									<TouchableOpacity
										key={seasonEntry.id}
										onPress={() => this.selectSeason(seasonEntry)}
										style={
											this.props.getState('season') === seasonEntry
												? styles('whiteCardButtonSelected')
												: styles('whiteCardButton')
										}>
										<Text
											style={
												this.props.getState('season') === seasonEntry
													? styles('whiteCardButtonTextSelected')
													: styles('whiteCardButtonText')
											}>
											{seasonEntry.title}
										</Text>
									</TouchableOpacity>
								))}
							</View>
							<View style={styles('whiteCard')}>
								<Text style={styles('whiteCardText')}>
									{Translator.get('YOUR_GROUP')}
								</Text>
								<TextInput
									autoCorrect={false}
									style={[
										styles('whiteCardGroupButton'),
										styles('whiteCardGroupText'),
									]}
									placeholder={Translator.get('GROUP_NAME')}
									placeholderTextColor={PlaceholderTextColor()}
									onChangeText={this.onChangeText}
								/>

								<FlatList
									data={this.props.getState('groupListFiltered')}
									renderItem={this.renderGroupListItem}
									keyExtractor={this.extractGroupListItemId}
									extraData={this.groupSelected}
									initialScrollIndex={0}
									initialNumToRender={5}
									viewabilityConfig={{
										itemVisiblePercentThreshold: 0,
									}}
								/>
								{this.props.getState('textFilter') &&
								this.props.getState('groupListFiltered').length === 0 ? (
									<Text style={styles('greyBottomText')}>
										{Translator.get('NO_GROUP_FOUND_WITH_THIS_SEARCH')}
									</Text>
								) : (
									<Text style={styles('greyBottomText')}>
										{Translator.get('USE_SEARCH_BAR')}
									</Text>
								)}
							</View>
						</ScrollView>

						<WelcomeButton
							onPress={() => navigation.navigate('FourthWelcomePage')}
							buttonText={Translator.get('NEXT')}
						/>

						<WelcomePagination pageNumber={3} maxPage={4} />
					</KeyboardAvoidingView>
				</SafeAreaView>
			</LinearGradient>
		);
	}
}

export default ThirdWelcomePage;
