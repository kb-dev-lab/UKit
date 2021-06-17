import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import WelcomeButton from '../../components/buttons/WelcomeButton';
import styles, { GradientColor } from '../../StyleWelcome';
import Translator from '../../utils/translator';
import SettingsManager from '../../utils/SettingsManager';
import WelcomePagination from '../../components/ui/WelcomePagination';
import WelcomeBackButton from '../../components/buttons/WelcomeBackButton';

class FourthWelcomePage extends React.Component {
	finishWelcome = () => {
		SettingsManager.setFirstLoad(false);
	};

	render() {
		const { navigation } = this.props;
		const theme = this.props.getState('theme');
		return (
			<LinearGradient
				style={{ flex: 1 }}
				colors={GradientColor()}
				start={{ x: 0.05, y: 0.05 }}
				end={{ x: 0.95, y: 0.95 }}>
				<SafeAreaView style={{ flex: 1 }}>
					<WelcomeBackButton onPress={navigation.goBack} visible={true}/>
					<View style={{ flexGrow: 1 }}>

						<Text style={styles[theme].mainText}>{Translator.get('WELL_DONE')}</Text>
						<Text style={styles[theme].secondaryText}>{Translator.get('APP_READY')}</Text>
					</View>

					<WelcomeButton
						onPress={this.finishWelcome}
						buttonText={Translator.get('FINISH')}
						theme={theme}
					/>

					<WelcomePagination pageNumber={4} maxPage={4} theme={theme}/>
				</SafeAreaView>
			</LinearGradient>
		);
	}
}

export default FourthWelcomePage;
