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
import LocationDetailsCategories from '../LocationDetailsCategories/LocationDetailsCategories';

class LocationDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
         
        };
    }
    
    componentWillReceiveProps(newProps) {
        this.setState({
            locationId: newProps.locationId
        })
    }

	render() {
		return (
			<div className="location-details">
                <LocationDetailsHeader
                    locationId = {this.props.locationId}
                />
                
                <div className="location-details-photos-map-container">
                    <LocationDetailsGrid />
                </div>
                
                <LocationDetailsActions />
                
                <LocationDetailsCategories/>

                <LocationDetailsMenu/>

                <LocationDetailsMostRecommendedDishes/>

                <LocationDetailsMap className="google-maps-location-details" />
 
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