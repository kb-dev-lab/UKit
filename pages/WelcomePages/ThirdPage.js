import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../StyleWelcome'

class ThirdWelcomePage extends React.Component {
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<LinearGradient
					style={{ flex: 1 }}
					colors={['#009DE0', '#45D7E8']}
					start={{ x: 0.05, y: 0.05 }}
					end={{ x: 0.95, y: 0.95 }}>
					<View style={styles.whiteCardContainer} style={{flexGrow: 1}}>
						<View style={styles.whiteCard}>
							<Text style={styles.whiteCardText}>
								Choisis un thème pour l'application
							</Text>
							<FlatList
								scrollEnabled={false}
								numColumns={3}
								contentContainerStyle={{
									marginBottom: 32,
									marginTop: 16,
									alignItems: 'center',
								}}
								data={this.YEAR}
								renderItem={this.renderItem}
								keyExtractor={(item) => item.id}
							/>
						</View>

						<View style={styles.whiteCard}>
							<Text style={styles.whiteCardText}>Quelle est ta langue ?</Text>

							<FlatList
								scrollEnabled={false}
								numColumns={2}
								contentContainerStyle={{
									margin: 36,
									alignItems: 'center',
								}}
								data={this.SEASON}
								renderItem={this.renderItem}
								keyExtractor={(item) => item.id}
							/>
						</View>
					</View>

					<TouchableOpacity
						onPress={this.props.incrementPage}
						style={styles.buttonContainer}>
						<Text style={styles.buttonText}>Suivant</Text>
					</TouchableOpacity>
					<View style={styles.pageDots}>
						<View style={styles.circleFill} />
						<View style={styles.circleFill} />
						<View style={styles.circleFill} />
						<View style={styles.circleEmpty} />
					</View>
				</LinearGradient>
			</SafeAreaView>
		);
	}
}

export default ThirdWelcomePage;