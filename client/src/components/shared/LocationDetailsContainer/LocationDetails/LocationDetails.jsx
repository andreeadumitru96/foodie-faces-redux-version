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
                    locationId = {this.state.locationDetails._id}
                />
                
                <div className="location-details-photos-map-container">
                    <LocationDetailsGrid />
                    <LocationDetailsMap className="google-maps-location-details" />
                </div>
                
                <LocationDetailsActions />

                <LocationDetailsMenu/>

                <LocationDetailsMostRecommendedDishes/>

                <div className="location-details-reviews-map">
                    <LocationDetailsReviews/>
                </div>
                <LocationDetailsSimilarLocations
                    triggeredBody = {this.props.triggeredBody}
                />

			</div>
		);
    }
}

export default LocationDetails;