import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../StyleWelcome'

class FourthWelcomePage extends React.Component {
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<LinearGradient
					style={{ flex: 1 }}
					colors={['#009DE0', '#45D7E8']}
					start={{ x: 0.05, y: 0.05 }}
					end={{ x: 0.95, y: 0.95 }}>
					<View style={{ flexGrow: 1 }}>
						<Text style={styles.mainText}>Bravo !</Text>
						<Text style={styles.secondaryText}>
							L'application est maintenant prête, vous pouvez dès à présent consulter
							votre emploi du temps !
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => console.log('FINISHED')}
						style={styles.buttonContainer}>
						<Text style={styles.buttonText}>Terminer</Text>
					</TouchableOpacity>
					<View style={styles.pageDots}>
						<View style={styles.circleFill} />
						<View style={styles.circleFill} />
						<View style={styles.circleFill} />
						<View style={styles.circleFill} />
					</View>
				</LinearGradient>
			</SafeAreaView>
		);
	}
}

export default FourthWelcomePage;