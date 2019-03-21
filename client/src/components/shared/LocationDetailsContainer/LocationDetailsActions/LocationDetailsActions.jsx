import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import './LocationDetailsActions.css';
import LocationDetailsRecommendDish from '../LocationDetailsRecommendDish/LocationDetailsRecommendDish';

class LocationDetailsActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecommendDishOpen: false,
            isMenuDishesAvailable: false
        };
        this._onRecommendButton = this._onRecommendButton.bind(this);
        this._triggerWindowClose = this._triggerWindowClose.bind(this);
    }

    render() {
        return (
            <div className="location-details-actions">
                <div className="location-details-actions__recommend">
                    <RaisedButton
                        label="Recommend a dish"
                        disabled={this.state.isMenuDishesAvailable ? false : true}
                        onClick = {this._onRecommendButton}
                    />
                    <LocationDetailsRecommendDish
                        isRecommendDishOpen = {this.state.isRecommendDishOpen}
                        triggerWindowClose = {this._triggerWindowClose}
                        locationDetails = {this.props.locationDetails}
                    />
                </div>
            </div>

        );
    }

    _onRecommendButton() {
        this.setState({
            isRecommendDishOpen: true
        });
    }

    _triggerWindowClose() {
        this.setState({
            isRecommendDishOpen: false
        });
    }

    componentWillMount() {
        if(this.props.locationDetails.menu.length > 0) {
            this.setState({
                isMenuDishesAvailable: !this.state.isMenuDishesAvailable
            });
        }
    }

    

}

export default LocationDetailsActions;