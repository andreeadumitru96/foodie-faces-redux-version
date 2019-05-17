import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";

import { API_URL } from '../constants';

import { saveLocationToWishList } from '../../../reducers/locationReducer/index.js';
import { removeLocationFromWishList } from '../../../reducers/locationReducer/index.js';
import { getLocationById } from '../../../reducers/locationReducer/index.js';
import { fetchLocationById } from '../../../reducers/locationReducer/index.js';

import LocationTileItem from './LocationTileItem/LocationTileItem';
import { notificationError, successNotification } from '../constants';
import { cookies } from '../constants';


class LocationTileItemContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationItem: null,
            isLocationBookmarked: false
        };
        this._onLocationClick = this._onLocationClick.bind(this);
        this._saveLocationToWishList = this._saveLocationToWishList.bind(this);
        this._updateLocationBookmark = this._updateLocationBookmark.bind(this);
        this._removeLocationFromWishList = this._removeLocationFromWishList.bind(this);
        this._triggerMouseHoverMapItem = this._triggerMouseHoverMapItem.bind(this);
        this._triggerMouseUnhoverMapItem = this._triggerMouseUnhoverMapItem.bind(this);
        this._onListenSocket = this._onListenSocket.bind(this);
    }

    render() {
        return (
            this.state.locationItem ? (
            <LocationTileItem
                locationData = {this.state.locationItem}
                onLocationClick = {this._onLocationClick}
                saveLocationToWishList = {this._saveLocationToWishList}
                isLocationBookmarked = {this.state.isLocationBookmarked}
                removeLocationFromWishList = {this._removeLocationFromWishList}  
                triggerMouseHoverMapItem = {this._triggerMouseHoverMapItem}
                triggerMouseUnhoverMapItem = {this._triggerMouseUnhoverMapItem}
                
            />) : null
        );
    }

    componentDidMount() {

        
        let locationItem = this.props.getLocationById(this.props.locationId, this.props.locationsTypeFlag);

        if(locationItem) {
            this.setState({
                locationItem: locationItem
            }, () => {
                this._updateLocationBookmark(locationItem);
                this._onListenSocket();
            });
        }
        
    }

    _onListenSocket = () => {
        const socket = socketIOClient(API_URL);
        socket.on('onSendUpdatedLocation', (updatedLocation) => {

            if(updatedLocation._id === this.state.locationItem._id) {
                this.setState({
                    locationItem: updatedLocation
                });
            }
        
        });

    }

    _onLocationClick = () => {

        let mountComponent = 'LocationDetailsComponent';
        console.log(this.state.locationItem._id);
        this.props.triggeredBody(mountComponent, this.state.locationItem._id);
        
    }

    _saveLocationToWishList(event) {
        event.preventDefault();
        event.stopPropagation();
        
        let data = {
            userId: cookies.get('user')._id,
            locationId: this.props.locationId
        };

        this.props.saveLocationToWishList(data).then(() => {
            console.log(this.props);
            if(Object.keys(this.props.userDetails).length === 0 && this.props.userDetails.constructor === Object) {
                notificationError('A problem have been occurred while saving the location... ');
            } else {
                successNotification('The location has been added to wish list.');
                cookies.set('user', this.props.userDetails);
            }
            
        }).catch((error) => {
            notificationError(error);
        });

        this.setState({
            isLocationBookmarked: true
        });
        
        
        
    }

    _updateLocationBookmark(locationItem) {
		let bookmarksList = cookies.get('user').wishList;
        let isBookmarked = false;
        
        for(let bookmarkId of bookmarksList) {
            if(bookmarkId === locationItem._id) {
				isBookmarked = true;
			}
        }

		this.setState({
            isLocationBookmarked: isBookmarked
        });
    }
     
    _removeLocationFromWishList(event) {
        event.preventDefault();
        event.stopPropagation();

        let locationToRemove = {
			userId: cookies.get('user')._id,
			locationId: this.state.locationItem._id
        }

        this.props.removeLocationFromWishList(locationToRemove).then(() => {
            if(Object.keys(this.props.userDetails).length === 0 && this.props.userDetails.constructor === Object) {
                notificationError('A problem have been occurred while deleting the location... ');
            } else {
                successNotification('The location has been removed to wish list.');
                cookies.set('user', this.props.userDetails);
            }
            
        }).catch((error) => {
            notificationError(error);
        });

        this.setState({
            isLocationBookmarked: false
        });
        
    }

    _triggerMouseHoverMapItem() {
        if(this.props.isSiblingRendered) {
            this.props.handleHoverTriggered(true, this.state.locationItem._id);
        }
    }

    _triggerMouseUnhoverMapItem() {
        if(this.props.isSiblingRendered) {
            this.props.handleHoverTriggered(false, null);
        }
    }
}

const mapStateToProps = (state) => ({
    userDetails: state.locations.userDetails,
    locationDetails: state.locations.locationDetails
});

export default connect(mapStateToProps, { getLocationById, saveLocationToWishList, removeLocationFromWishList, fetchLocationById })(LocationTileItemContainer);