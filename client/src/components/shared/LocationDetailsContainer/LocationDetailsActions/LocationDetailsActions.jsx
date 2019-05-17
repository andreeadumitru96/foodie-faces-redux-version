import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import './LocationDetailsActions.css';
import LocationDetailsRecommendDish from '../LocationDetailsRecommendDish/LocationDetailsRecommendDish';
import { fetchLocationById } from '../../../../reducers/locationReducer/index';

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
                {!(Object.entries(this.props.locationDetails).length === 0 && this.props.locationDetails.constructor === Object) ?
                    <div className="location-details-actions__recommend">

                        <RaisedButton
                            label="Recommend a dish"
                            disabled={this.state.isMenuDishesAvailable ? false : true}
                            onClick={this._onRecommendButton}
                        />
                        <LocationDetailsRecommendDish
                            isRecommendDishOpen={this.state.isRecommendDishOpen}
                            triggerWindowClose={this._triggerWindowClose}
                            locationDetails={this.props.locationDetails}
                        />
                    </div>
                :
                    null
                }

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

    componentWillReceiveProps(newProps) {
        if(newProps.locationDetails && newProps.locationDetails.menu.length > 0) {
            this.setState({
                isMenuDishesAvailable: !this.state.isMenuDishesAvailable
            });
        }
    }

    componentWillMount() {

        if (!(Object.entries(this.props.locationDetails).length === 0 && this.props.locationDetails.constructor === Object) && this.props.locationDetails.menu.length > 0) {
            this.setState({
                isMenuDishesAvailable: !this.state.isMenuDishesAvailable
            });
        }
    }



}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails

});

export default connect(mapStateToProps, { fetchLocationById })(LocationDetailsActions);