import React, { Component } from 'react';
import { connect } from 'react-redux';

import { cookies } from '../../../components/shared/constants';
import OwnerDashboard from './OwnerDashboard';
import { fetchOwnerLocations } from '../../../reducers/userReducer/index';


class LocationAdministrator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div>
               <OwnerDashboard/>
            </div>
        );
    }


}

const mapStateToProps = (state) => ({
    ownerLocations: state.users.ownerLocations
});

  
export default connect(mapStateToProps, { fetchOwnerLocations })(LocationAdministrator);