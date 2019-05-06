import React, { Component } from 'react';
import ReactStars from 'react-stars';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';

import { addLocationReview } from '../../../../reducers/locationReducer/index';
import { fetchLocationById } from '../../../../reducers/locationReducer/index';
import { cookies } from '../../../shared/constants';
import { notificationError } from '../../../shared/constants';
import './LocationDetailsReviews.css';
import LocationDetailsAddDish from '../LocationDetailsMenu/LocationDetailsAddDish/LocationDetailsAddDish';


class LocationDetailsReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialDisplayedReviews: this.props.locationDetails.receivedReviews.slice(0, 4),
            isAddDishOpen: false,
            isShowMoreDisplayed: true,
        };

        this.reviewScore = this.props.locationDetails.averageScore;
        this._getReviewDetails = this._getReviewDetails.bind(this);
        this._onAddReview = this._onAddReview.bind(this);
        this._onRatingChanged = this._onRatingChanged.bind(this);
        this._triggerWindowClose = this._triggerWindowClose.bind(this);
        this._onShowMoreReviews = this._onShowMoreReviews.bind(this);
        this._onPressShowMore = this._onPressShowMore.bind(this);
    }

    render() {
        return (
            <div className="location-details-reviews">
                <div className="location-details-reviews__list">
                    <p className="location-details-reviews__list-title">
                        Reviews ({this.props.locationDetails.receivedReviews.length})
                    </p>

                    {this.props.locationDetails.receivedReviews.length > 0 ?

                        <div className="location-details-reviews__list-wrapper">
                            {this.state.initialDisplayedReviews.map((receivedReview) => (
                                <div className="list--entity" key={receivedReview._id}>
                                    <div className="list--entity-review">
                                        <div className="list--entity--review-title">
                                            {receivedReview.title}
                                        </div>
                                        <div className="list--entity-review-content">
                                            {receivedReview.content}
                                        </div>
                                    </div>     

                                    <div className="list--entity-user">
                                        <div className="list--entity-user-name">
                                            {receivedReview.userName} 
                                        </div>
                                        <div className="list--entity-user-date">
                                            {/* {this._parseDate(receivedReview.createdDate)} */}
                                            on {this._getFormattedDate(receivedReview.createdDate)}
                                        </div>
                                        <div className="list--entity-user-score">
                                            <span>{receivedReview.score}</span>
                                            <span> star(s) </span>
                                        </div>                                          
                                    </div>                             
                                </div>
                            ))}
                            {
                                (this.state.isShowMoreDisplayed && this.props.locationDetails.receivedReviews.length > 4) ?
                                    <div className="location-details-reviews__show-more" onClick={this._onShowMoreReviews}>
                                        Show more
                                    </div>
                                :
                                     null
                            }
                        </div>
                        :
                        <div className="location-details-reviews__list-no-items">
                            <p> There are no reviews yet </p>
                        </div>
                    }
                </div>

                <div className="location-details-reviews__add-review">
                    <form className="add-review-form">
                        <label className="add-review-form-label"> Write a review </label>

                        <fieldset className="add-review-form-fieldset">
                            <input className="add-review-form-fieldset-input" placeholder="Review Title"
                                ref={(reviewTitle) => { this.reviewTitle = reviewTitle }}
                            />
                        </fieldset>

                        <fieldset className="add-review-form-fieldset">
                            <textarea className="add-review-form-fieldset-textarea" placeholder="Leave a review..."
                                ref={(reviewContent) => { this.reviewContent = reviewContent }}
                            />

                        </fieldset>

                        <fieldset className="add-review-form-fieldset">
                            <ReactStars
                                count={5}
                                size={24}
                                color2={'black'}
                                half={false}
                                value={this.props.locationDetails.averageScore}
                                onChange={this._onRatingChanged}
                            />
                        </fieldset>

                        <div className="add-review-form-button">
                            <RaisedButton
                                className="add-review-form-button-add"
                                label="Add review"
                                onClick={this._onAddReview}
                            />
                        </div>
                    </form>
                </div>

                <div className="location-details-reviews__add-dish">
                    <LocationDetailsAddDish
                        triggerWindowClose={this._triggerWindowClose}
                        isAddDishOpen={this.state.isAddDishOpen}
                        locationDetails={this.props.locationDetails}
                    />
                </div>
            </div>

        );
    }

    _onRatingChanged(newRating) {
        this.reviewScore = newRating;
    }

    _getReviewDetails() {

        let user = cookies.get('user');

        let reviewDetails = {
            title: this.reviewTitle.value,
            content: this.reviewContent.value,
            score: this.reviewScore,
            averageScore: this.props.locationDetails.averageScore,
            userName: user.firstName,
            userId: user._id,
            locationId: this.props.locationDetails._id
        };
        return reviewDetails;
    }

    _onAddReview() {

        let reviewDetails = this._getReviewDetails();

        this.props.addLocationReview(reviewDetails).then((location) => {
            this.reviewTitle.value = '';
            this.reviewContent.value = '';

        }).catch((error) => {
            notificationError(error);
        });

        this.setState({
            isAddDishOpen: true
        });
    }

    _triggerWindowClose() {
        this.setState({
            isAddDishOpen: false
        });
    }

    _onShowMoreReviews() {
        this.setState({
            initialDisplayedReviews: this.props.locationDetails.receivedReviews
        });
        this._onPressShowMore();
    }

    _onPressShowMore() {
        this.setState({
            isShowMoreDisplayed: !this.state.isShowMoreDisplayed
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            locationDetails: newProps.locationDetails,
            initialDisplayedReviews: newProps.locationDetails.receivedReviews.slice(0, 4),
        })
    }

    _getFormattedDate(date) {
        return date.split('T')[0];
    }

}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails
});

export default connect(mapStateToProps, { addLocationReview, fetchLocationById })(LocationDetailsReviews);