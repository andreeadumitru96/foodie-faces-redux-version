import React, { Component } from 'react';
import { connect } from 'react-redux';

import { cookies } from '../../../components/shared/constants';
import OwnerDashboard from './OwnerDashboard/OwnerDashboard';
import OwnerLocationInfo from './OwnerLocationInfo/OwnerLocationInfo';
import { fetchOwnerLocations } from '../../../reducers/userReducer/index';


class LocationAdministrator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOwnerDashboardMount: this.props.isOwnerDashboardMount,
            isOwnerLocationInfoMount: null
        };
        this._goToOwnerLocationInfoComponent = this._goToOwnerLocationInfoComponent.bind(this);

    }

    render() {
        return (
            <div>
                {this.state.isOwnerDashboardMount ? 
                    <OwnerDashboard
                        goToOwnerLocationInfoComponent={this._goToOwnerLocationInfoComponent}
                    />
                :
                    null
                }
                {this.state.isLocationInfoMount ? 
                    <OwnerLocationInfo/>
                :
                    null
                }
               
            </div>
        );
    }

    _goToOwnerLocationInfoComponent() {
        this.setState({
            isOwnerDashboardMount: false,
            isOwnerLocationInfoMount: true
        });
    }


}

const mapStateToProps = (state) => ({
    ownerLocations: state.users.ownerLocations
});

  
export default connect(mapStateToProps, { fetchOwnerLocations })(LocationAdministrator);