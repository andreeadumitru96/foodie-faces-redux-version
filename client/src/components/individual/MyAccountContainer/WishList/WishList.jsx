import React, { Component } from 'react';
import { GridList } from 'material-ui';

import LocationTileItemContainer from '../../../shared/LocationTileItemContainer/LocationTileItemContainer';
import './WishList.css';

class WishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishList: props.wishList
        };
        this._updateWishListAfterRemoving = this._updateWishListAfterRemoving.bind(this);
    }

    render() {
        return (
            <div className="wish-list-grid">
                <GridList 
                    cols={3}
                    className="wish-list-grid__items"
                >
                    {this.state.wishList.map((location) => {
                        return(
                            <LocationTileItemContainer
                                locationData = {location}
                                key = {location._id}
                                triggeredBody = {this.props.triggeredBody}
                                updateWishListAfterRemoving = {this._updateWishListAfterRemoving}
                        />) 
                    })}
                </GridList>
            </div>
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