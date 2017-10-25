import React from 'react';
import {TouchableHighlight, Text, View, Linking} from 'react-native';
import style from '../../../Style';

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
        if (this.isLocationKnown()) {
            return {lat: locations[this.state.location].lat, lng: locations[this.state.location].lng};
        }
        return {lat: null, lng: null};
    }

    openMaps() {
        let {lat: lat, lng: lng} = this.getLatLng();
        console.log('latlng', lat, lng);
        let url = 'https://www.google.com/maps/?q=' + lat + ',' + lng;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        if (this.isLocationKnown()) {
            return (
                <View style={{paddingRight: 5}}>
                    <TouchableHighlight onPress={() => this.openMaps()}>
                        <Text style={{color:style.colors.darkred}}>Afficher sur la carte</Text>
                    </TouchableHighlight>
                </View>
            );
        }
        return (<View></View>)
    }

}

