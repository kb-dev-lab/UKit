import React from 'react';

import DayView from './DayView';

export default class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = { groupName: this.props.route.params.name };
    }

    render() {
        return <DayView navigation={this.props.navigation} groupName={this.state.groupName} />;
    }
}
