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

import styles from '../../StyleWelcome';
import { FlatList, TextInput } from 'react-native-gesture-handler';

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
	{ id: 'autumn', title: 'Automne' },
	{ id: 'spring', title: 'Printemps' },
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
	const styleButton = selected ? styles.whiteCardButtonSelected : styles.whiteCardButton;
	const styleText = selected ? styles.whiteCardButtonTextSelected : styles.whiteCardButtonText;

	return (
		<TouchableOpacity onPress={onPress} key={index} style={styleButton}>
			<Text style={styleText}>{item.replace('_', ' ')}</Text>
		</TouchableOpacity>
	);
};

class SecondWelcomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			yearSelected: null,
			seasonSelected: null,
			groupSelected: null,
			groupList: Array.from(new Set(this.props.groupList.map((e) => e.name))),
			groupListFiltered: [],
			textFilter: '',
		};
	}

	filterList = (year, season, textFilter) => {
		const newList = [];

		if (year && season) {
			const list = this.state.groupList;

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

		this.setState({
			groupListFiltered: newList,
			yearSelected: year,
			seasonSelected: season,
			textFilter: textFilter,
		});
	};

	onChangeText = (text) => {
		this.filterList(this.state.yearSelected, this.state.seasonSelected, text);
	};

	selectYear = (year) => {
		this.filterList(year, this.state.seasonSelected, this.state.textFilter);
	};

	selectSeason = (season) => {
		this.filterList(this.state.yearSelected, season, this.state.textFilter);
	};

	selectGroup = (group) => {
		this.setState({ groupSelected: this.state.groupSelected === group ? null : group });
	};

	renderGroupListItem = ({ item }) => {
		return (
			<GroupItem
				item={item}
				selected={this.state.groupSelected === item}
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
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<LinearGradient
					style={{ flex: 1, display: 'flex' }}
					colors={['#009DE0', '#45D7E8']}
					start={{ x: 0.05, y: 0.05 }}
					end={{ x: 0.95, y: 0.95 }}>
					<KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'height' : ''}>
						<ScrollView style={styles.whiteCardContainer}>
							<View style={styles.whiteCard}>
								<Text style={styles.whiteCardText}>Quel est ton année ?</Text>

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
												this.state.yearSelected === yearEntry
													? styles.whiteCardButtonSelected
													: styles.whiteCardButton
											}>
											<Text
												style={
													this.state.yearSelected === yearEntry
														? styles.whiteCardButtonTextSelected
														: styles.whiteCardButtonText
												}>
												{yearEntry.title}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>

							<View style={styles.whiteCard}>
								<Text style={styles.whiteCardText}>À quel semestre es-tu ?</Text>
								{UNIVERSITY_SEASON_LIST.map((seasonEntry) => (
									<TouchableOpacity
										key={seasonEntry.id}
										onPress={() => this.selectSeason(seasonEntry)}
										style={
											this.state.seasonSelected === seasonEntry
												? styles.whiteCardButtonSelected
												: styles.whiteCardButton
										}>
										<Text
											style={
												this.state.seasonSelected === seasonEntry
													? styles.whiteCardButtonTextSelected
													: styles.whiteCardButtonText
											}>
											{seasonEntry.title}
										</Text>
									</TouchableOpacity>
								))}
							</View>
							<View style={styles.whiteCard}>
								<Text style={styles.whiteCardText}>Quel est ton groupe ?</Text>
								<TextInput
									autoCorrect={false}
									style={[styles.whiteCardGroupButton, styles.whiteCardGroupText]}
									placeholder="Nom du groupe..."
									onChangeText={this.onChangeText}
								/>

								<FlatList
									data={this.state.groupListFiltered}
									renderItem={this.renderGroupListItem}
									keyExtractor={this.extractGroupListItemId}
									extraData={this.groupSelected}
									initialScrollIndex={0}
									initialNumToRender={5}
									viewabilityConfig={{
										itemVisiblePercentThreshold: 0,
									}}
								/>
							</View>
						</ScrollView>

						<TouchableOpacity
							onPress={this.props.incrementPage}
							style={styles.buttonContainer}>
							<Text style={styles.buttonText}>Suivant</Text>
						</TouchableOpacity>
						<View style={styles.pageDots}>
							<View style={styles.circleFill} />
							<View style={styles.circleFill} />
							<View style={styles.circleEmpty} />
							<View style={styles.circleEmpty} />
						</View>
					</KeyboardAvoidingView>
				</LinearGradient>
			</SafeAreaView>
		);
	}
}

export default SecondWelcomePage;
