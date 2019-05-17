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
            <div>
                <LocationDetails
                    locationId = {this.props.locationId}
                    triggeredBody = {this.props.triggeredBody}
                />
             </div>
            

        );
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    componentWillReceiveProps() {
        window.scrollTo(0,0);
    }
    
}
export default (LocationDetailsContainer);