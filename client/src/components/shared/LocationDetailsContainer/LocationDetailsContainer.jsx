import React, { Component } from 'react';
import LocationDetails from './LocationDetails/LocationDetails';


class LocationDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <LocationDetails
                locationDetails = {this.props.locationDetails}
                triggeredBody = {this.props.triggeredBody}
            />

        );
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    componentWillReceiveProps() {
        window.scrollTo(0,0);
    }
    
}

export default LocationDetailsContainer;