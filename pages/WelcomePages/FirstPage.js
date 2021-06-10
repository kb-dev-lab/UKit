import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../StyleWelcome'

class FirstWelcomePage extends React.Component {
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<LinearGradient
					style={{ flex: 1, display: 'flex' }}
					colors={['#009DE0', '#45D7E8']}
					start={{ x: 0.05, y: 0.05 }}
					end={{ x: 0.95, y: 0.95 }}>
					<View style={{ flexGrow: 1 }}>
						<Text style={styles.mainText}>Bienvenue !</Text>
						<Text style={styles.secondaryText}>
							Avant d’utiliser l’application, nous avons quelques réglages à faire.
						</Text>
					</View>

					<TouchableOpacity
						onPress={this.props.incrementPage}
						style={styles.buttonContainer}>
						<Text style={styles.buttonText}>Commencer</Text>
					</TouchableOpacity>
					<View style={styles.pageDots}>
						<View style={styles.circleFill} />
						<View style={styles.circleEmpty} />
						<View style={styles.circleEmpty} />
						<View style={styles.circleEmpty} />
					</View>
				</LinearGradient>
			</SafeAreaView>
		);
	}
}


export default FirstWelcomePage;