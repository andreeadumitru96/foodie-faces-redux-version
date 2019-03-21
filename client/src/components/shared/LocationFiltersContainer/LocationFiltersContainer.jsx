import React, { Component } from 'react';

import LocationFilters from './LocationFilters/LocationFilters';
import {notificationError} from '../constants';

class LocationFiltersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersList: {
                cuisine: [],
                goodFor: [],
                meals: [],
                city: []
            }
        };
        this._getFiltersByLocations = this._getFiltersByLocations.bind(this);
        this._getAllSelectedFilters = this._getAllSelectedFilters.bind(this);
        this._onClickFilteredLocations = this._onClickFilteredLocations.bind(this);

    }

    render() {
        return (
            <div>
                <LocationFilters 
                    filtersList={this.state.filtersList}
                    ref={(filterDropdown) => this.filterDropdown = filterDropdown}
                    onClickFilteredLocations={this._onClickFilteredLocations} 
                />    
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

    _getFiltersByLocations() {
        fetch('http://localhost:3001/api/location/getFiltersByLocations', {
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
           },
           method: 'get',
        }).then(function(response){
            if(response.status === 200) {
                response.json().then((data) => {
                    this.setState({filtersList: data});
                })
            } else {
                response.json().then((data) => {
                    notificationError(data.message);
                });
            }
        }.bind(this));
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

    componentWillMount() {
        this._getFiltersByLocations();
    }

}

export default LocationFiltersContainer;