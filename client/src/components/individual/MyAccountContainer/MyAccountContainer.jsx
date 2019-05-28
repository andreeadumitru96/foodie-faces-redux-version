import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWishListLocations } from '../../../reducers/locationReducer/index';
import { fetchAllLocations } from '../../../reducers/locationReducer/index';
import MyAccount from './MyAccount/MyAccount';
import { cookies, notificationError } from '../../shared/constants';

class MyAccountContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishListFormattedByName: [],
            isLocationDetailsMount: false
        };
        this._getLocationsWishList = this._getLocationsWishList.bind(this);
        // this._formatWishListByName = this._formatWishListByName.bind(this);
    }

    render() {
        return (
            <MyAccount
                wishListLocations = {this.props.wishListLocations}
                wishListFormattedByName = {this.state.wishListFormattedByName}
                isLocationDetailsMount = {this.state.isLocationDetailsMount}
            />
        );
    }

    componentDidMount() {
        this.props.fetchAllLocations().then(() => {
            this._getLocationsWishList();
        });
        
    }
    
    _getLocationsWishList() {
        let userId = cookies.get('user')._id;

        this.props.fetchWishListLocations(userId).then(() => {
        }).catch((errorMessage) => {
            notificationError(errorMessage);
        });
       
               
    } 

    // _formatWishListByName() {

    //     let formattedWishList = this.props.wishListLocations.map(location => location.name);

    //     this.setState({
    //         wishListFormattedByName: formattedWishList
    //     });
    // }
}

const mapStateToProps = (state) => ({
    wishListLocations: state.locations.wishListLocations,
    allLocations: state.locations.allLocations
});

export default connect(mapStateToProps, { fetchWishListLocations, fetchAllLocations })(MyAccountContainer);