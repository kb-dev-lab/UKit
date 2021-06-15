import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import WelcomeButton from '../../components/buttons/WelcomeButton';
import styles, { GradientColor } from '../../StyleWelcome';
import Translator from '../../utils/translator';
import SettingsManager from '../../utils/SettingsManager';
import WelcomePagination from '../../components/ui/WelcomePagination';

class FourthWelcomePage extends React.Component {
	finishWelcome = () => {
		SettingsManager.setFirstLoad(false);
	};

	render() {
		return (
			<LinearGradient
				style={{ flex: 1 }}
				colors={GradientColor()}
				start={{ x: 0.05, y: 0.05 }}
				end={{ x: 0.95, y: 0.95 }}>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={{ flexGrow: 1 }}>
						<Text style={styles('mainText')}>{Translator.get('WELL_DONE')}</Text>
						<Text style={styles('secondaryText')}>{Translator.get('APP_READY')}</Text>
					</View>

					<WelcomeButton
						onPress={this.finishWelcome}
						buttonText={Translator.get('FINISH')}
					/>

					<WelcomePagination pageNumber={4} maxPage={4} />

				</SafeAreaView>
			</LinearGradient>
		);
	}
}

export default FourthWelcomePage;
