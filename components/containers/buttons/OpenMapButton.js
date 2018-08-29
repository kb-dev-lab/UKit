import React from 'react';
import { Text } from 'react-native';
import style from './../../../Style';
import URLButton from './URLButton';

const locations = require('../../../assets/locations.json');

export default class OpenMapButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location.split('/')[0],
        };
    }

    isLocationKnown() {
        return locations.hasOwnProperty(this.state.location);
    }

    getGMapsLocation() {
        let location = locations[this.state.location];
        if (location.hasOwnProperty('placeID')) {
            return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}&query_place_id=${location.placeID}`;
        }
        return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    }

    render() {
        if (this.isLocationKnown()) {
            return <URLButton title={this.props.location} url={this.getGMapsLocation()} />;
        }
        return <Text style={style.schedule.course.content}>{this.props.location}</Text>;
    }
}
