import React, { Component } from 'react';
import { connect } from 'react-redux';
import OwnerDashboard from './OwnerDashboard/OwnerDashboard';
import OwnerLocationInfo from './OwnerLocationInfo/OwnerLocationInfo';
import { fetchOwnerLocations } from '../../../reducers/userReducer/index';

import './OwnerDashboard/OwnerDashboard.css';


class LocationAdministrator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOwnerDashboardMount: true,
            isOwnerLocationInfoMount: null,
            selectedLocationId: null
        };
        this._goToOwnerLocationInfoComponent = this._goToOwnerLocationInfoComponent.bind(this);

    }

    render() {
        return (
            <div className="location-administrator-wrapper">
                {this.state.isOwnerDashboardMount ? 
                    <OwnerDashboard
                        goToOwnerLocationInfoComponent={this._goToOwnerLocationInfoComponent}
                    />
                :
                    null
                }
                {this.state.isOwnerLocationInfoMount ? 
                    <OwnerLocationInfo
                        selectedLocationId={this.state.selectedLocationId}
                    />
                :
                    null
                }
               
            </div>
        );
    }

    _goToOwnerLocationInfoComponent(selectedLocationId) {
        this.setState({
            isOwnerDashboardMount: false,
            isOwnerLocationInfoMount: true,
            selectedLocationId: selectedLocationId
        });
    }


}

const mapStateToProps = (state) => ({
    ownerLocations: state.users.ownerLocations
});

  
export default connect(mapStateToProps, { fetchOwnerLocations })(LocationAdministrator);