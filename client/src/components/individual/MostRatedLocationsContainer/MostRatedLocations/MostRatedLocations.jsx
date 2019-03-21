import React, { Component } from 'react';

import LocationTileListContainer from '../../../shared/LocationTileListContainer/LocationTileListContainer';
import './MostRatedLocations.css';

class MostRatedLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="most-rated-locations">
                <div className="most-rated-location__header">
                    <p className="header-p">Here are the most rated locations...</p>
                </div>
                <div className="most-rated-location__content">
                    <LocationTileListContainer 
                        locationsList={this.props.locationsList}
                        triggeredBody = {this.props.triggeredBody}
                    />
                </div>
                

            </div>
        );
    }
    componentWillReceiveProps() {
        this.forceUpdate();
    }
}

export default MostRatedLocations;