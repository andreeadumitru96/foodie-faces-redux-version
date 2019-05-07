import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationFilters from './LocationFilters/LocationFilters';
import {notificationError} from '../constants';
import { fetchAllFilters } from '../../../reducers/locationReducer/index';

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
        selectedFilters.city = this.props.city;

        return selectedFilters;

    }

    _onClickFilteredLocations() {

        let selectedFilters = this._getAllSelectedFilters();
        if(selectedFilters.cuisine.length <= 0 || !selectedFilters.goodFor.length <= 0 || selectedFilters.meals.length <= 0) {
            notificationError("Please choose a filter");
        } else {
            fetch('http://localhost:3001/api/location/getFilteredLocations', {
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(selectedFilters)

            }).then(function(response){
                if(response.status === 200) {
                    response.json().then((data) => {
                        this.props.onFilterLocationsReceived(data);
                    })
                } else {
                    response.json().then((data) => {
                        notificationError(data.message);
                    });
                }
            }.bind(this));  
        }

    }

    componentDidMount() {
        this.props.fetchAllFilters().then(() => {

        }).catch(() => {

        });
    }

}

const mapStateToProps = (state) => ({
    filtersList: state.locations.filtersList
});

export default connect(mapStateToProps, {fetchAllFilters})(LocationFiltersContainer);