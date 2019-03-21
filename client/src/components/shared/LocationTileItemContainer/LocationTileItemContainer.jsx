import React, { Component } from 'react';

import LocationTileItem from './LocationTileItem/LocationTileItem';
import { notificationError, successNotification } from '../constants';
import * as defaultImage from '../../../assets/location-default-image.jpg';
import { cookies } from '../constants';

class LocationTileItemContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationData: props.locationData,
            isLocationBookmarked: false
        };
        this._setDefaultImage = this._setDefaultImage.bind(this);
        this._onLocationClick = this._onLocationClick.bind(this);
        this._saveLocationWishList = this._saveLocationWishList.bind(this);
        this._isLocationBookmarked = this._isLocationBookmarked.bind(this);
        this._removeLocationWishList = this._removeLocationWishList.bind(this);
        this._triggerMouseHoverMapItem = this._triggerMouseHoverMapItem.bind(this);
        this._triggerMouseUnhoverMapItem = this._triggerMouseUnhoverMapItem.bind(this);
    }

    render() {
        return (
            <LocationTileItem
                locationData = {this.state.locationData}
                onLocationClick = {this._onLocationClick}
                saveLocationWishList = {this._saveLocationWishList}
                isLocationBookmarked = {this.state.isLocationBookmarked}
                removeLocationWishList = {this._removeLocationWishList}
                triggerMouseHoverMapItem = {this._triggerMouseHoverMapItem}
                triggerMouseUnhoverMapItem = {this._triggerMouseUnhoverMapItem}
            />
        );
    }

    _setDefaultImage() {
        if (this.state.locationData.images.length === 0) {
            this.state.locationData.images[0] = defaultImage;
        }
    }

    componentWillMount() {
        this.setState({
            isLocationBookmarked: this._isLocationBookmarked()
        });
        this._setDefaultImage();
    }

    _getLocationDetails = async() => {
        let id = this.state.locationData._id; 
        try {
            const response = await fetch(`http://localhost:3001/api/location/getSingleLocation/${id}`, {
                headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                },
                method: 'get',
             });
            const data = await response.json();
            return data;
            
        } catch(e) {
            notificationError(e.message);
        }
    }

    _onLocationClick = async() => {
        let mountComponent = 'LocationDetailsComponent';
        let locationDetails = await this._getLocationDetails();
        
        this.props.triggeredBody(mountComponent, locationDetails)

    }

    _saveLocationWishList(event) {
        event.preventDefault();
        event.stopPropagation();
        
        let data = {
            userId: cookies.get('user')._id,
            locationId: this.state.locationData._id
        };

        fetch('http://localhost:3001/api/saveLocationWishList', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
            body: JSON.stringify(data),
		}).then((response) => {
			if(response.status === 200) {
				response.json().then((user) => {
					successNotification('The location has been added to wish list.');
                    cookies.set('user', user);
                    
					this.setState({
                        isLocationBookmarked: true
                    });
				})
			} else {
				response.json().then((err) => {
					notificationError(err);
				})
			}
		});
    }

    _isLocationBookmarked() {
		let bookmarksList = cookies.get('user').wishList;
        let isBookmarked = false;
        
        for(let bookmarkId of bookmarksList) {
            if(bookmarkId === this.state.locationData._id) {
				isBookmarked = true;
			}
        }

		return isBookmarked;
    }
     
    _removeLocationWishList(event) {
        event.preventDefault();
        event.stopPropagation();

        let data = {
			userId: cookies.get('user')._id,
			locationId: this.state.locationData._id
        }
        
        fetch('http://localhost:3001/api/removeLocationWishList', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
			body: JSON.stringify(data)
		}).then((response) => {
			if(response.status === 200) {
				response.json().then((user) => {
					successNotification("The locations has been removed from wish list");
                    cookies.set('user', user);
                    this.setState({
                        isLocationBookmarked: false
                    });
                    this.props.updateWishListAfterRemoving(this.state.locationData._id);                
				})
			} else {
				response.json().then((err) => {
					notificationError(err);
				});
			}
		});
    }

    _getLocationRemovedId() {
        return this.state.locationRemovedId;
    }

    _triggerMouseHoverMapItem() {
        if(this.props.isSiblingRendered) {
            this.props.handleHoverTriggered(true, this.state.locationData._id);
        }
    }

    _triggerMouseUnhoverMapItem() {
        if(this.props.isSiblingRendered) {
            this.props.handleHoverTriggered(false, null);
        }
    }
}

export default LocationTileItemContainer;