import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { Polygon, Svg } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import style from '../Style';
import CourseRow from '../components/CourseRow';
import { getLocations, getLocationsInText } from '../utils';
import { AppContext } from '../utils/DeviceUtils';
import URL from '../utils/URL';

const mapStyle = [
	{
		featureType: 'landscape.man_made',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#ff0000',
			},
		],
	},
	{
		featureType: 'landscape.man_made',
		elementType: 'labels',
		stylers: [
			{
				color: '#ff0000',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#000000',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#ffffff',
			},
		],
	},
];

class Course extends React.Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);
		const { data } = this.props.route.params;

		this.state = {
			data,
			locations: [],
		};
	}

	onPressGoogleMaps = () => {
		let link =
			URL['MAP'] +
			`search/?api=1&query=${this.state.locations[0].lat},${this.state.locations[0].lng}`;
		if (this.state.locations[0].placeID) {
			link =
				URL['MAP'] +
				`search/?api=1&query=${this.state.locations[0].lat},${this.state.locations[0].lng}&query_place_id=${this.state.locations[0].placeID}`;
		}

		Linking.canOpenURL(link)
			.then((supported) => {
				if (!supported) {
					console.warn("Can't handle url: " + link);
				} else {
					return Linking.openURL(link);
				}
			})
			.catch((err) => console.error('An error occurred', err));
	};

	componentDidMount() {
		let locations = [];
		this.props.navigation.setParams({ title: this.state.data.schedule });

		if (this.state.data.room && this.state.data.room !== 'N/C') {
			locations = getLocations(this.state.data.room);
			locations = locations.concat(getLocationsInText(this.state.data.room));
		}
		if (locations.length < 1) {
			locations = getLocationsInText(this.state.data.description);
		}

		if (locations.length > 0) {
			this.setState({ locations });
		}
	}

	render() {
		const theme = style.Theme[this.context.themeName];

		let map = null;
		if (this.state.locations.length > 0) {
			map = (
				<View style={{ flex: 1 }}>
					<MapView
						style={{ flex: 1 }}
						provider={MapView.PROVIDER_GOOGLE}
						initialRegion={{
							latitude: this.state.locations[0].lat,
							longitude: this.state.locations[0].lng,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						}}
						customMapStyle={mapStyle}
						showsMyLocationButton={false}
						loadingEnabled={true}
						showsCompass={true}>
						{this.state.locations.map((location, index) => {
							return (
								<MapView.Marker
									key={index}
									coordinate={{
										latitude: location.lat,
										longitude: location.lng,
									}}>
									<View
										style={{
											flexDirection: 'column',
											justifyContent: 'flex-start',
											alignItems: 'center',
											paddingBottom: 10,
										}}>
										<View
											style={{
												backgroundColor: '#E57373',
												padding: 4,
											}}>
											<Text style={{ color: 'white', fontWeight: 'bold' }}>
												{location.title}
											</Text>
										</View>
										<View style={{ backgroundColor: 'transparent' }}>
											<Svg height={12} width={12}>
												<Polygon points="0,0 6,12 12,0" fill="#E57373" />
											</Svg>
										</View>
									</View>
								</MapView.Marker>
							);
						})}
					</MapView>
					<View style={{ position: 'absolute', top: 0, right: 0 }}>
						<TouchableOpacity
							onPress={this.onPressGoogleMaps}
							style={{
								alignSelf: 'stretch',
								backgroundColor: 'rgba(255,255,255,0.5)',
								margin: 8,
								padding: 4,
							}}>
							<View style={{ backgroundColor: '#FFF', padding: 0 }}>
								<MaterialCommunityIcons
									name="google-maps"
									size={32}
									style={{ width: 32, height: 32, color: '#5f9ea0' }}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			);
		}

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: theme.greyBackground }}>
				<View>
					<CourseRow data={this.state.data} theme={theme} />
				</View>
				{map}
			</SafeAreaView>
		);
	}
}

export default Course;
