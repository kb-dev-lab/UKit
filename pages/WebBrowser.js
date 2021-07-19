import React from 'react';
import { ActivityIndicator, Linking, Platform, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigation } from '@react-navigation/compat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import URL from '../utils/URL';

import style from '../Style';
import { AppContext } from '../utils/DeviceUtils';

const entrypoints = {
	ent: 'https://ent.u-bordeaux.fr',
	email: 'https://webmel.u-bordeaux.fr',
	cas: 'https://cas.u-bordeaux.fr',
	apogee: 'https://apogee.u-bordeaux.fr',
};

class WebBrowser extends React.Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);

		let uri = URL.UKIT_WEBSITE;
		if (this.props.route.params) {
			const { entrypoint, href } = this.props.route.params;
			if (entrypoint) {
				if (entrypoints[entrypoint]) {
					uri = entrypoints[entrypoint];
				}
			} else if (href) {
				uri = href;
			}
		}

		this.state = {
			entrypoint: this.props.route.params.entrypoint,
			title: null,
			url: '',
			uri,
			canGoBack: false,
			canGoForward: false,
			loading: true,
		};
	}

	onRefresh = () => {
		this.webBrowser.reload();
	};

	onBack = () => {
		this.webBrowser.goBack();
	};

	onForward = () => {
		this.webBrowser.goForward();
	};

	openURL = () => {
		Linking.canOpenURL(this.state.url)
			.then((supported) => {
				if (!supported) {
					console.warn("Can't handle url: " + this.state.url);
				} else {
					return Linking.openURL(this.state.url);
				}
			})
			.catch((err) => console.error('An error occurred', err));
	};

	renderLoading = () => {
		const theme = style.Theme[this.context.themeName];

		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					backgroundColor: theme.greyBackground,
				}}>
				<ActivityIndicator size="large" color={theme.iconColor} />
			</View>
		);
	};

	render() {
		if (this.state.uri === null) {
			return this.renderLoading();
		}

		const theme = style.Theme[this.context.themeName];

		let javascript = null;
		if (Platform.OS !== 'ios') {
			javascript = 'window.scrollTo(0,0);';
		}

		return (
			<SafeAreaView
				style={{ flex: 1, flexDirection: 'column', backgroundColor: theme.background }}>
				<WebView
					ref={(webBrowser) => (this.webBrowser = webBrowser)}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					startInLoadingState={true}
					renderLoading={this.renderLoading}
					injectedJavaScript={javascript}
					onNavigationStateChange={(e) => {
						if (!e.loading) {
							this.setState(
								{
									url: e.url,
									title: e.title,
									canGoBack: e.canGoBack,
									loading: e.loading,
								},
								() => {
									if (!!this.state.title) {
										this.props.navigation.setParams({
											title: this.state.title,
										});
									}
								},
							);
						}
					}}
					source={{ uri: this.state.uri }}
				/>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: 10,
						paddingVertical: 5,
						backgroundColor: theme.background,
					}}>
					<TouchableOpacity disabled={!this.state.canGoBack} onPress={this.onBack}>
						<MaterialIcons
							name="navigate-before"
							size={30}
							style={{
								color: this.state.canGoBack ? theme.icon : 'grey',
								height: 30,
								width: 30,
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity disabled={!this.state.canGoForward} onPress={this.onForward}>
						<MaterialIcons
							name="navigate-next"
							size={30}
							style={{
								color: this.state.canGoForward ? theme.icon : 'grey',
								height: 30,
								width: 30,
							}}
						/>
					</TouchableOpacity>

					<TouchableOpacity disabled={this.state.loading} onPress={this.onRefresh}>
						<MaterialIcons
							name="refresh"
							size={30}
							style={{
								color: this.state.loading ? 'grey' : theme.icon,
								height: 30,
								width: 30,
							}}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={this.openURL}
						style={{
							paddingRight: 16,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<View>
							{Platform.OS === 'ios' ? (
								<MaterialCommunityIcons
									name="apple-safari"
									size={25}
									style={{ color: theme.icon, height: 25, width: 25 }}
								/>
							) : (
								<MaterialCommunityIcons
									name="google-chrome"
									size={25}
									style={{ color: theme.icon, height: 25, width: 25 }}
								/>
							)}
						</View>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}

export default withNavigation(WebBrowser);
