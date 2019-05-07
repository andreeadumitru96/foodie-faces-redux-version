import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationFilters from './LocationFilters/LocationFilters';
import {notificationError} from '../constants';
import { fetchAllFilters } from '../../../reducers/locationReducer/index';
import { fetchFilteredLocations } from '../../../reducers/locationReducer/index';
import { setSelectedCity } from '../../../reducers/locationReducer/index';

class LocationFiltersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
        this._getAllSelectedFilters = this._getAllSelectedFilters.bind(this);
        this._onClickFilteredLocations = this._onClickFilteredLocations.bind(this);

    }

    render() {
        return (
            <div>
                {Object.entries(this.props.filtersList).length === 0 && this.props.filtersList.constructor === Object ? 
                   null
                :
                    <LocationFilters 
                        filtersList = {this.props.filtersList}
                        ref={(filterDropdown) => this.filterDropdown = filterDropdown}
                        onClickFilteredLocations={this._onClickFilteredLocations} 
                    /> 
                }
                  
            </div>
        );
    }

    _getAllSelectedFilters() {
        let selectedFilters = {
            cuisine: [],
            goodFor: [],
            meals: [],
            city: []
        };
        selectedFilters.cuisine = this.filterDropdown.cuisineFilterDropdown._getSelectedFilters();
        selectedFilters.goodFor = this.filterDropdown.goodForFilterDropdown._getSelectedFilters();
        selectedFilters.meals = this.filterDropdown.mealsFilterDropdown._getSelectedFilters();
        selectedFilters.city = this.props.selectedCity.cityName;

        return selectedFilters;

    }

    _onClickFilteredLocations() {

        let selectedFilters = this._getAllSelectedFilters();
        if(selectedFilters.cuisine.length <= 0 && selectedFilters.goodFor.length <= 0 && selectedFilters.meals.length <= 0) {
            notificationError("Please choose a filter");
        } else {
            this.props.fetchFilteredLocations(selectedFilters).then((locations) => {
                // this.props.onFilterLocationsReceived(locations);
            }).catch((errorMessage) => {
                notificationError('It may be a problem when finding the filtered locations');
            });
        }

    }

    componentDidMount() {
        this.props.fetchAllFilters().catch((errorMessage) => {
            notificationError(errorMessage);
        });
    }

}

const mapStateToProps = (state) => ({
    filtersList: state.locations.filtersList,
    // filteredLocations: state.locations.filteredLocations,
    selectedCity: state.locations.selectedCity
});

export default connect(mapStateToProps, { fetchAllFilters, fetchFilteredLocations, setSelectedCity })(LocationFiltersContainer);