import React from 'react';
import { View, WebView } from 'react-native';
import { AppContext } from '../utils/DeviceUtils';

import URL from '../utils/URL';
const locations = require('../assets/locations.json');

export default class Geolocation extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
            lat: null,
            lng: null,
        };
    }

    componentDidMount() {
        this.getLatLng();
    }

    getLatLng() {
        let data = this.state.location.split('/');
        let house = data[0];
        if (locations.hasOwnProperty(house)) {
            this.setState({ lat: location[house].lat, lng: location[house].lng });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView source={{ uri: URL['MAP'] + '?q=' + this.state.lat + ',' + this.state.lng }} />
            </View>
        );
    }
}
