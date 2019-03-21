import React, { Component } from 'react';

import FilterItem from './FilterItem';
import './LocationFilters.css';
import { RaisedButton } from 'material-ui';


class LocationFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="location-filters">
                <div className="location-filters__cuisine">
                    <FilterItem
                        filterElements={this.props.filtersList.cuisine}
                        type={"Cuisine"}
                        ref={(cuisineFilterDropdown) => this.cuisineFilterDropdown = cuisineFilterDropdown}
                    />
                </div>
                <div className="location-filters__goodFor">
                    <FilterItem
                        filterElements={this.props.filtersList.goodFor}
                        type={"Good for"}
                        ref={(goodForFilterDropdown) => this.goodForFilterDropdown = goodForFilterDropdown}
                    />
                </div>
                <div className="location-filters__meals">
                    <FilterItem
                        filterElements={this.props.filtersList.meals}
                        type={"Meals"}
                        ref={(mealsFilterDropdown) => this.mealsFilterDropdown = mealsFilterDropdown}
                    />
                </div>
                <div className="location-filters__search-button">
                    <RaisedButton
                        onClick={this.props.onClickFilteredLocations}    
                    >
                        <i className="fa fa-search"></i>
                    </RaisedButton>
                </div>
            </div>
        );
    }

}

export default LocationFilters;