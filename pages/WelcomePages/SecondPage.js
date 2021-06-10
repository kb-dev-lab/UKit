import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../StyleWelcome'

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

class SecondWelcomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			yearSelected: null,
			seasonSelected: null,
		};
	}

	selectYear = (year) => {
		this.setState({ yearSelected: this.state.yearSelected === year ? null : year });
	};

	selectedSeason = (season) => {
		this.setState({ seasonSelected: this.state.seasonSelected === season ? null : season });
	};

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<LinearGradient
					style={{ flex: 1, display: 'flex' }}
					colors={['#009DE0', '#45D7E8']}
					start={{ x: 0.05, y: 0.05 }}
					end={{ x: 0.95, y: 0.95 }}>
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
									onPress={() => this.selectYear(seasonEntry)}
									style={
										this.state.yearSelected === seasonEntry
											? styles.whiteCardButtonSelected
											: styles.whiteCardButton
									}>
									<Text
										style={
											this.state.yearSelected === seasonEntry
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

							<TouchableOpacity
								onPress={() => console.log('PRESSED')}
								style={styles.whiteCardGroupButton}>
								<Text style={styles.whiteCardGroupText}>Nom du groupe..</Text>
								<MaterialIcons
									name="search"
									size={24}
									style={styles.whiteCardGroupIcon}
								/>
							</TouchableOpacity>
						</View>

						<View style={styles.whiteCard}>
							<Text style={styles.whiteCardText}>Quel est ton groupe ?</Text>

							<TouchableOpacity
								onPress={() => console.log('PRESSED')}
								style={styles.whiteCardGroupButton}>
								<Text style={styles.whiteCardGroupText}>Nom du groupe..</Text>
								<MaterialIcons
									name="search"
									size={24}
									style={styles.whiteCardGroupIcon}
								/>
							</TouchableOpacity>
						</View>

						<View style={styles.whiteCard}>
							<Text style={styles.whiteCardText}>Quel est ton groupe ?</Text>

							<TouchableOpacity
								onPress={() => console.log('PRESSED')}
								style={styles.whiteCardGroupButton}>
								<Text style={styles.whiteCardGroupText}>Nom du groupe..</Text>
								<MaterialIcons
									name="search"
									size={24}
									style={styles.whiteCardGroupIcon}
								/>
							</TouchableOpacity>
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
				</LinearGradient>
			</SafeAreaView>
		);
	}
}

export default SecondWelcomePage;