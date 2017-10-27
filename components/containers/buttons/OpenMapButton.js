import React from 'react';
import {View} from 'react-native';
import URLButton from './URLButton';
const locations = require('../../../assets/locations.json');

export default class OpenMapButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location.split('/')[0],
            lat: null,
            lng: null
        }
    }

    isLocationKnown() {
        return locations.hasOwnProperty(this.state.location);
    }

    getLatLng() {
        let lat = locations[this.state.location].lat;
        let lng = locations[this.state.location].lng;
        return 'https://www.google.com/maps/?q=' + lat + ',' + lng;
    }

    render() {
        if (this.isLocationKnown()) {
            return (
                <View style={{paddingBottom: 5}}>
                    <URLButton title="Afficher sur la carte" url={this.getLatLng()}/>
                </View>
            );
        }
        return (<View></View>)
    }

}

