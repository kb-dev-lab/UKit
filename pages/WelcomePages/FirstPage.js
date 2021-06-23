import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import WelcomePagination from '../../components/ui/WelcomePagination';
import WelcomeButton from '../../components/buttons/WelcomeButton';
import WelcomeBackButton from '../../components/buttons/WelcomeBackButton';
import Translator from '../../utils/translator';
import styles from '../../StyleWelcome';

class FirstWelcomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	navigateToNextPage = () => {
		const { navigation } = this.props;
		navigation.navigate('SecondWelcomePage');
	};

	render() {
		const { navigation } = this.props;
		const theme = this.props.navigatorState.theme;
		return (
			<LinearGradient
				style={{ flex: 1, display: 'flex' }}
				colors={styles[theme].gradientColor}
				start={{ x: 0.05, y: 0.05 }}
				end={{ x: 0.95, y: 0.95 }}>
				<SafeAreaView style={{ flex: 1 }}>
					<WelcomeBackButton onPress={() => {}} visible={false} />
					<View style={{ flexGrow: 1 }}>
						<Text style={styles[theme].mainText}>{Translator.get('WELCOME')}</Text>
						<Text style={styles[theme].secondaryText}>
							{Translator.get('SETTINGS_TO_MAKE')}
						</Text>
					</View>

					<WelcomeButton
						onPress={this.navigateToNextPage}
						buttonText={Translator.get('START')}
						theme={theme}
					/>

					<WelcomePagination pageNumber={1} maxPage={4} theme={theme} />
				</SafeAreaView>
			</LinearGradient>
		);
	}
}

export default FirstWelcomePage;
