import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../StyleWelcome';
import Translator from '../../utils/translator';
import SettingsManager from '../../utils/SettingsManager';

const THEME_LIST = [
	{ id: 'light', title: 'LIGHT_THEME' },
	{ id: 'dark', title: 'DARK_THEME' },
];

const LANGUAGE_LIST = [
	{ id: 'fr', title: 'FRENCH' },
	{ id: 'en', title: 'ENGLISH' },
];

class ThirdWelcomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			switchEnabled: false,
			selectedLanguage: null,
			selectedTheme: null,
		};
	}

	selectLanguage = (newLang) => {
		this.setState({ selectedLanguage: newLang });
		SettingsManager.setLanguage(newLang.id)
	};

	selectTheme = (newTheme) => {
		this.setState({ selectedTheme: newTheme });
	};

	changePage = () => {
		this.props.setSettings({
			theme: this.state.selectedTheme?.id || 'light',
			language: this.state.selectedLanguage?.id || Translator.getLanguage(),
		});
		this.props.incrementPage();
	};

	render() {
		return (
			<LinearGradient
				style={{ flex: 1 }}
				colors={['#009DE0', '#45D7E8']}
				start={{ x: 0.05, y: 0.05 }}
				end={{ x: 0.95, y: 0.95 }}>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.whiteCardContainer} style={{ flexGrow: 1 }}>
						<View style={styles.whiteCard}>
							<Text style={styles.whiteCardText}>{Translator.get('YOUR_THEME')}</Text>
							{THEME_LIST.map((themeEntry) => (
								<TouchableOpacity
									key={themeEntry.id}
									onPress={() => this.selectTheme(themeEntry)}
									style={
										this.state.selectedTheme === themeEntry
											? styles.whiteCardButtonSelected
											: styles.whiteCardButton
									}>
									<Text
										style={
											this.state.selectedTheme === themeEntry
												? styles.whiteCardButtonTextSelected
												: styles.whiteCardButtonText
										}>
										{Translator.get(themeEntry.title)}
									</Text>
								</TouchableOpacity>
							))}
						</View>

						<View style={styles.whiteCard}>
							<Text style={styles.whiteCardText}>
								{Translator.get('YOUR_LANGUAGE')}
							</Text>
							{LANGUAGE_LIST.map((languageEntry) => (
								<TouchableOpacity
									key={languageEntry.id}
									onPress={() => this.selectLanguage(languageEntry)}
									style={
										this.state.selectedLanguage === languageEntry
											? styles.whiteCardButtonSelected
											: styles.whiteCardButton
									}>
									<Text
										style={
											this.state.selectedLanguage === languageEntry
												? styles.whiteCardButtonTextSelected
												: styles.whiteCardButtonText
										}>
										{Translator.get(languageEntry.title)}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>

					<TouchableOpacity onPress={this.changePage} style={styles.buttonContainer}>
						<Text style={styles.buttonText}>{Translator.get('NEXT')}</Text>
					</TouchableOpacity>
					<View style={styles.pageDots}>
						<View style={styles.circleFill} />
						<View style={styles.circleFill} />
						<View style={styles.circleFill} />
						<View style={styles.circleEmpty} />
					</View>
				</SafeAreaView>
			</LinearGradient>
		);
	}
}

export default ThirdWelcomePage;
