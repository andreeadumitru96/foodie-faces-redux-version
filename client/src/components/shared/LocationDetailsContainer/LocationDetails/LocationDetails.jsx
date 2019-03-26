import React, { Component } from 'react';

import LocationDetailsHeader from '../LocationDetailsHeader/LocationDetailsHeader';
import './LocationDetails.css';
import LocationDetailsGrid from '../LocatonDetailsGrid.jsx/LocationDetailsGrid';
import LocationDetailsActions from '../LocationDetailsActions/LocationDetailsActions';
import LocationDetailsReviews from '../LocationDetailsReviews/LocationDetailsReviews';
import LocationDetailsMap from '../LocationDetailsMap/LocationDetailsMap';
import LocationDetailsMenu from '../LocationDetailsMenu/LocationDetailsMenu';
import LocationDetailsMostRecommendedDishes from '../LocationDetailsRecommendDish/LocationDetailsMostRecommendedDishes';
import LocationDetailsSimilarLocations from '../LocationDetailsSimilarLocations/LocationDetailsSimilarLocations';

class LocationDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
            locationDetails: props.locationDetails
        };
    }
    
    componentWillReceiveProps(newProps) {
        this.setState({
            locationDetails: newProps.locationDetails
        })
    }

	render() {
		return (
			<div className="location-details">
                <LocationDetailsHeader
                    locationDetails = {this.state.locationDetails}
                />
                <LocationDetailsGrid
                    locationDetails = {this.state.locationDetails}
                />
                <LocationDetailsActions
                    locationDetails = {this.state.locationDetails}
                />

                <LocationDetailsMenu
                    locationDetails = {this.state.locationDetails}
                />

                <LocationDetailsMostRecommendedDishes
                    locationDetails = {this.state.locationDetails}
                />

                <div className="location-details-reviews-map">
                    <LocationDetailsReviews
                        locationDetails = {this.state.locationDetails}
                    />
                    <LocationDetailsMap
                        locationDetails = {this.state.locationDetails} 
                    />
                </div>
                <LocationDetailsSimilarLocations
                    locationDetails = {this.state.locationDetails}
                    triggeredBody = {this.props.triggeredBody}
                />

			</div>
		);
    }
}

export default LocationDetails;