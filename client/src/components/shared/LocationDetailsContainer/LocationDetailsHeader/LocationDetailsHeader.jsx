import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactStars from 'react-stars'
import { List, ListItem } from 'material-ui/List';
import { fetchLocationById } from '../../../../reducers/locationReducer/index';
import './LocationDetailsHeader.css';

class LocationDetailsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div className="location-details-header">
                <div className="location-details-header__title-container">
                    <div className="title-container__name">
                        {this.props.locationDetails.name}
                    </div>
                    <div className="title-container__rating">
                        <ReactStars
                            count={5}
                            size={18}
                            color2={'black'}
                            half={false}
                            edit={false}
                            value={this.props.locationDetails.tripAdvisorRating}
                        />
                    </div>
                </div>

                <div className="location-details-header__information">
                    <div className="information__general">
                        {
                            this.props.locationDetails.address
                                ?
                                <div className="information-address information-item">
                                    <i className="fa fa-map-marker"> Address: </i>
                                    <span className="information-address-span main-information-details">
                                        {this.props.locationDetails.address}
                                    </span>
                                </div>
                                : null
                        }
                        {
                            this.props.locationDetails.phone[0]
                                ?
                                <div className="information-phone information-item">
                                    <i className="fa fa-phone"> Phone Number: </i>
                                    <span className="information-phone-span main-information-details">
                                        {this.props.locationDetails.phone[0]}
                                    </span>
                                </div>
                                : null
                        }
                        {
                            this.props.locationDetails.price
                                ?
                                <div className="information-average-price information-item">
                                    <i className="fa fa-money"> Price Range: </i>
                                    <span className="information-average-price-span main-information-details">
                                        {this.props.locationDetails.price}
                                    </span>
                                </div>
                                : null
                        }
                        {
                            this.props.locationDetails.availableSeats
                                ?
                                <div className="information-average-price information-item">
                                    <i class="fas fa-chair"> Available Seats: </i>
                                    <span className="information-average-price-span main-information-details">
                                        {this.props.locationDetails.availableSeats}
                                    </span>
                                </div>
                                : null
                        }
                    </div>

                    <div className="information-categories">
                        {
                            this.props.locationDetails.categories.goodFor.length !== 0
                                ?
                                <div className="infromation-categories__good-for information-categories__general">
                                    <div className="good-for__label label-container">
                                        <span className="label-text"> Good For: </span>
                                    </div>
                                    <ul className="good-for__items">
                                        {this.props.locationDetails.categories.goodFor.map((item) => {
                                            return (
                                                <li className="items__item">
                                                    {item}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                : null
                        }

                        {
                            this.props.locationDetails.categories.meals.length !== 0
                                ?
                                <div className="infromation-categories__meals information-categories__general">
                                    <div className="meals__label label-container">
                                        <span className="label-text"> Meals: </span>
                                    </div>
                                    <ul className="meals__items">
                                        {this.props.locationDetails.categories.meals.map((item) => {
                                            return (
                                                <li className="items__item">
                                                    {item}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                : null
                        }
                        {
                            this.props.locationDetails.categories.cuisine.length !== 0
                                ?
                                <div className="infromation-categories__cuisine information-categories__general">
                                <div className="cuisine__label label-container">
                                    <span className="label-text"> Cuisine: </span>
                                </div>
                                <ul className="cuisine__items">
                                    {this.props.locationDetails.categories.cuisine.map((item) => {
                                        return (
                                            <li className="items__item">
                                                {item}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            : null
                        }
                        {
                            this.props.locationDetails.categories.cuisine.length === 0
                            && this.props.locationDetails.categories.meals.length === 0
                            && this.props.locationDetails.categories.goodFor.length === 0
                            ?
                                <div className="infromation-categories__cuisine__no-categories information-categories__general">
                                    <p>There are no categories for this place yet</p>
                                </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchLocationById(this.props.locationId);
    }

}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails

});

export default connect(mapStateToProps, { fetchLocationById })(LocationDetailsHeader);