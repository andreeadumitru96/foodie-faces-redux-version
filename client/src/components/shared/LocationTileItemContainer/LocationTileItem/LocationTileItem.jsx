import React, { Component } from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import ReactStars from 'react-stars';

import './LocationTileItem.css';

class LocationTileItem extends Component {
    constructor(props) {

        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <GridTile className="location-tile"
                key={this.props.locationData._id}
                title={this.props.locationData.name}
                subtitle={
                    <ReactStars
                        count={5}
                        size={14}
                        color2={'white'}
                        edit={false}
                        value={parseFloat(this.props.locationData.tripAdvisorRating)}
                    />}
                onClick={this.props.onLocationClick}
                onMouseEnter = {this.props.triggerMouseHoverMapItem}
                onMouseLeave = {this.props.triggerMouseUnhoverMapItem}
                actionIcon={
                    <IconButton
                        className="location-tile__button"
                        onClick={
                            this.props.isLocationBookmarked ? 
                                this.props.removeLocationWishList 
                            : 
                                this.props.saveLocationWishList}
                    >
                        {this.props.isLocationBookmarked ?
                            <Favorite className="location-tile__button-marked"/>
                            :
                            <Favorite className="location-tile__button"/>
                        }
                    </IconButton>
                }
            >
                <img className="location-tile__image" src={this.props.locationData.images[0]} alt="" />
            </GridTile>
        );
    }


}

export default LocationTileItem;