import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveLocationWishList } from '../../../reducers/locationReducer/index.js';
import { getLocationById } from '../../../reducers/locationReducer/index.js';

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
        // this._saveLocationWishList = this._saveLocationWishList.bind(this);
        // this._isLocationBookmarked = this._isLocationBookmarked.bind(this);
        // this._removeLocationWishList = this._removeLocationWishList.bind(this);
        this._triggerMouseHoverMapItem = this._triggerMouseHoverMapItem.bind(this);
        this._triggerMouseUnhoverMapItem = this._triggerMouseUnhoverMapItem.bind(this);
    }

    render() {
        return (
            this.state.locationItem ? (
            <LocationTileItem
                locationData = {this.state.locationItem}
                onLocationClick = {this._onLocationClick}
                saveLocationWishList = {this._saveLocationWishList}
                // isLocationBookmarked = {this.state.isLocationBookmarked}
                // removeLocationWishList = {this._removeLocationWishList}
                triggerMouseHoverMapItem = {this._triggerMouseHoverMapItem}
                triggerMouseUnhoverMapItem = {this._triggerMouseUnhoverMapItem}
            />) : null
        );
    }

    componentDidMount() {
        
        let locationItem = this.props.getLocationById(this.props.locationId);
        this.setState({
            locationItem: locationItem
        });
        
    }

    componentWillMount() {
       this.setState({
            isLocationBookmarked: this._isLocationBookmarked()
        });
        
    }

    _onLocationClick = () => {

        let mountComponent = 'LocationDetailsComponent';
        this.props.triggeredBody(mountComponent, this.props.locationId);
        
    }

    _saveLocationWishList(event) {
        event.preventDefault();
        event.stopPropagation();
        
        let data = {
            userId: cookies.get('user')._id,
            locationId: this.props.locationId
        };

        this.props.saveLocationWishList(data);

        this.setState({
            isLocationBookmarked: true
        });
        
        cookies.set('user', this.props.userDetails);
        
    }

    _isLocationBookmarked() {
		let bookmarksList = cookies.get('user').wishList;
        let isBookmarked = false;
        
        for(let bookmarkId of bookmarksList) {
            if(bookmarkId === this.state.locationItem._id) {
				isBookmarked = true;
			}
        }

		return isBookmarked;
    }
     
    // _removeLocationWishList(event) {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     let data = {
	// 		userId: cookies.get('user')._id,
	// 		locationId: this.state.locationItem._id
    //     }
        
    //     fetch('http://localhost:3001/api/removeLocationWishList', {
	// 		headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
	// 		method: 'post',
	// 		body: JSON.stringify(data)
	// 	}).then((response) => {
	// 		if(response.status === 200) {
	// 			response.json().then((user) => {
	// 				successNotification("The locations has been removed from wish list");
    //                 cookies.set('user', user);
    //                 this.setState({
    //                     isLocationBookmarked: false
    //                 });
    //                 this.props.updateWishListAfterRemoving(this.state.locationItem._id);                
	// 			})
	// 		} else {
	// 			response.json().then((err) => {
	// 				notificationError(err);
	// 			});
	// 		}
	// 	});
    // }

    // _getLocationRemovedId() {
    //     return this.state.locationRemovedId;
    // }

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
    userDetails: state.locations.userDetails
});

export default connect(mapStateToProps, { getLocationById, saveLocationWishList })(LocationTileItemContainer);