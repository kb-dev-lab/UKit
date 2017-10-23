import React from 'react';
import {View, WebView} from 'react-native';

const locations = require('../assets/locations.json');

export default class Geolocation extends React.Component {
    constructor(props) {
        super(props);
        console.log('WebBrowser', props);
        this.state = {
            location: this.props.location,
            lat: null,
            lng: null
        };
    }

    componentWillMount() {
        this.getLatLng();
    }

    getLatLng() {
        let data = this.state.location.split('/');
        let house = data[0];
        if (locations.hasOwnProperty(house)) {
            this.setState({lat: location[house].lat, lng: location[house].lng});
        }

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: 'https://www.google.com/maps/?q=' + this.state.lat + ',' + this.state.lng}}
                />
            </View>
        );
    }
}