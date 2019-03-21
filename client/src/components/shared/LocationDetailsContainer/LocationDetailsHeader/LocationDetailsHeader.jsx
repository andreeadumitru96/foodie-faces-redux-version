import React, { Component } from 'react';
import ReactStars from 'react-stars'
import { List, ListItem } from 'material-ui/List';

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
                <div className="location-details-header__name">
                    {this.props.locationDetails.name}
                </div>
                <div className="location-details-header__information">
                    {
                        this.props.locationDetails.address
                            ?
                            <div className="information-address main-information">
                                <i className="fa fa-map-marker">
                                    <span className="information-address-span main-information-details">
                                        {this.props.locationDetails.address}
                                    </span>
                                </i>
                            </div>
                            : null
                    }
                    {
                        this.props.locationDetails.phone[0]
                            ?
                            <div className="information-phone main-information">
                                <i className="fa fa-phone">
                                    <span className="information-phone-span main-information-details">
                                        {this.props.locationDetails.phone[0]}
                                    </span>
                                </i>
                            </div>
                            : null
                    }
                    {
                        this.props.locationDetails.price
                            ?
                            <div className="information-average-price main-information">
                                <i className="fa fa-money">
                                    <span className="information-average-price-span main-information-details">
                                        {this.props.locationDetails.price}
                                    </span>
                                </i>
                            </div>
                            : null
                    }

                    <div className="information-rating main-information">
                        <ReactStars
                            count={5}
                            size={24}
                            color2={'black'}
                            half={false}
                            edit={false}
                            value={this.props.locationDetails.tripAdvisorRating}
                        />
                    </div>

                    <div className="information-categories main_information">
                    {
                            this.props.locationDetails.categories.goodFor
                                ?
                                <List>
                                    <div className="information-categories__goodFor">
                                        <ListItem
                                            primaryText={"Good for"}
                                            initiallyOpen={false}
                                            primaryTogglesNestedList={true}
                                            nestedItems={
                                                this.props.locationDetails.categories.goodFor.map((item) => {
                                                    return (<ListItem
                                                        className="goodFor-list main-information-details"
                                                        key={item}
                                                        primaryText={item}
                                                    />)
                                                })
                                            }
                                        >
                                        </ListItem>
                                    </div>
                                </List>
                            : null
                        }

                        {
                            this.props.locationDetails.categories.meals
                                ?
                                <List>
                                    <div className="information-categories__meals">
                                        <ListItem
                                            primaryText={"Meals"}
                                            initiallyOpen={false}
                                            primaryTogglesNestedList={true}
                                            nestedItems={
                                                this.props.locationDetails.categories.meals.map((item) => {
                                                    return (<ListItem
                                                        className="meals-list main-information-details"
                                                        key={item}
                                                        primaryText={item}
                                                    />)
                                                })
                                            }
                                        >
                                        </ListItem>
                                    </div>
                                </List>
                            : null
                        }
                         {
                            this.props.locationDetails.categories.cuisine
                                ?
                                <List>
                                    <div className="information-categories__cuisine">
                                        <ListItem
                                            primaryText={"Cuisine"}
                                            initiallyOpen={false}
                                            primaryTogglesNestedList={true}
                                            nestedItems={
                                                this.props.locationDetails.categories.cuisine.map((item) => {
                                                    return (<ListItem
                                                        className="cuisine-list main-information-details"
                                                        key={item}
                                                        primaryText={item}
                                                    />)
                                                })
                                            }
                                        >
                                        </ListItem>
                                    </div>
                                </List>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default LocationDetailsHeader;