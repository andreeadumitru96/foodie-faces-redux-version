import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header/Header';
// import {notificationError} from '../../shared/constants';

import { fetchCities } from '../../../reducers/locationReducer/index';
import { setSelectedCity } from '../../../reducers/locationReducer/index';

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    componentWillReceiveProps(newProps) {
       console.log(newProps);
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

        

    //     this.setState({

    //     });
    // }
}

const mapStateToProps = (state) => ({
    citiesList: state.locations.citiesList,
});
  
export default connect(mapStateToProps, { fetchCities, setSelectedCity })(HeaderContainer);