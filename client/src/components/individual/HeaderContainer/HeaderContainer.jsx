import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header/Header';
// import {notificationError} from '../../shared/constants';
import { cookies } from '../../shared/constants';

import { fetchCities } from '../../../reducers/locationReducer/index';
import { setSelectedCity } from '../../../reducers/locationReducer/index';
import { fetchAllLocations } from '../../../reducers/locationReducer/index';
import { fetchWishListLocations } from '../../../reducers/locationReducer/index';

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: cookies.get('user')._id,
            wishList: props.wishList,
            isGoogleSearchMount: props.isGoogleSearchMount,
            isMyAccountMount: props.isMyAccountMount,
            isLocationSearchMount: props.isLocationSearchMount
        };
        // this.fetchedLocationsData = [];
        this._onSelectCity = this._onSelectCity.bind(this);
        this._findLocationByName = this._findLocationByName.bind(this);

    }

    render() {
        return (
            <Header 
                citiesList = {this.props.citiesList}
                onSelectCity = {this._onSelectCity}
                onSelectLocation = {this._onSelectLocation}
                isMyAccountMount = {this.state.isMyAccountMount}
                isGoogleSearchMount = {this.state.isGoogleSearchMount}
                isLocationSearchMount = {this.state.isLocationSearchMount}
                wishListFormattedByName = {this.props.wishListFormattedByName}
            />
            
            
        );
    }

    componentDidMount() {
        this.props.fetchCities();
        this.props.fetchAllLocations();
        this.props.fetchWishListLocations(this.state.userId);
    }
    
    _onSelectCity = function(cityName, index) {
        const cityData = {
            cityName: cityName
        };
        this.props.setSelectedCity(cityData);
        
        let mountComponent = 'LocationSearchComponent' ;                  
        this.props.manageBodyComponents(mountComponent);
    }



    _findLocationByName(){
        // let searchedLocation = {};
        // this.state.wishList.forEach((location) => {
        //     if(location.name === locationName) {
        //         searchedLocation = Object.assign({}, location);
        //         console.log(location);
        //     }
        // });
        // return location;
    }

    // _onSelectLocation(locationName, index) {
}

const mapStateToProps = (state) => ({
    citiesList: state.locations.citiesList,
});
  
export default connect(mapStateToProps, { fetchCities, setSelectedCity, fetchAllLocations, fetchWishListLocations })(HeaderContainer);