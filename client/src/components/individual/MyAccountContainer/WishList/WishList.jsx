import React, { Component } from 'react';
import { GridList } from 'material-ui';

import LocationTileItemContainer from '../../../shared/LocationTileItemContainer/LocationTileItemContainer';
import './WishList.css';

class WishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishList: []
        };
        this._updateWishListAfterRemoving = this._updateWishListAfterRemoving.bind(this);
    }

    render() {
        return (
            this.props.wishListLocations.length > 0 ? 

            <div className="wish-list-grid">
                <GridList 
                    cols={3}
                    className="wish-list-grid__items"
                >
                    {this.props.wishListLocations.map((location) => {
                        return(
                            <LocationTileItemContainer
                                locationId = {location._id}
                                locationsTypeFlag = {'WishListComponent'}
                                locationData = {location}
                                key = {location._id}
                                triggeredBody = {this.props.triggeredBody}
                                updateWishListAfterRemoving = {this._updateWishListAfterRemoving}
                        />) 
                    })}
                </GridList>
            </div>
            : <div></div>
        );
    }

    _updateWishListAfterRemoving(locationIdForDeleting) {
        
        let wishListAfterRemoving = this.state.wishList.slice();

        for(let index = wishListAfterRemoving.length - 1; index >= 0 ; index--) {
            if(wishListAfterRemoving[index]._id === locationIdForDeleting) {
                wishListAfterRemoving.splice(index, 1);
            }
        }

        this.setState({
            wishList: wishListAfterRemoving
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            wishList: newProps.wishList
        });
    }
}

export default WishList;