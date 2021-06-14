import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import Translator from '../../utils/translator';
import styles from '../../StyleWelcome';

class FirstWelcomePage extends React.Component {
	render() {
		return (
			<LinearGradient
				style={{ flex: 1, display: 'flex' }}
				colors={['#009DE0', '#45D7E8']}
				start={{ x: 0.05, y: 0.05 }}
				end={{ x: 0.95, y: 0.95 }}>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={{ flexGrow: 1 }}>
						<Text style={styles.mainText}>{Translator.get('WELCOME')}</Text>
						<Text style={styles.secondaryText}>
							{Translator.get('SETTINGS_TO_MAKE')}
						</Text>
					</View>

					<TouchableOpacity
						onPress={this.props.incrementPage}
						style={styles.buttonContainer}>
						<Text style={styles.buttonText}>{Translator.get('START')}</Text>
					</TouchableOpacity>
					<View style={styles.pageDots}>
						<View style={styles.circleFill} />
						<View style={styles.circleEmpty} />
						<View style={styles.circleEmpty} />
						<View style={styles.circleEmpty} />
					</View>
				</SafeAreaView>
			</LinearGradient>
		);
	}
}

export default FirstWelcomePage;
