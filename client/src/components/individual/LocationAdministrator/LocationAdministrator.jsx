import React, { Component } from 'react';
import { connect } from 'react-redux';

import { cookies } from '../../../components/shared/constants';
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
               yggg
            </div>
        );
    }

    componentDidMount() {
        let ownerInformation = {
            ownerId: cookies.get('user')._id
        }
        
        this.props.fetchOwnerLocations(ownerInformation);
    }

}

const mapStateToProps = (state) => ({
    ownerLocations: state.users.ownerLocations
});

  
export default connect(mapStateToProps, { fetchOwnerLocations })(LocationAdministrator);