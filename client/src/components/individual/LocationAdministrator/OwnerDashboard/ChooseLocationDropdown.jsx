import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import { cookies } from '../../../shared/constants';
import { notificationError } from '../../../shared/constants';
import { fetchOwnerLocations } from '../../../../reducers/userReducer/index';

const styles = {
    customWidth: {
      width: 360,
    },
};

class ChooseLocationDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocationId: null
        };
        this._renderDropDownLocations = this._renderDropDownLocations.bind(this);
        this._triggerLocationAdministratorComponent = this._triggerLocationAdministratorComponent.bind(this);
        this._onhandleChangeLocation = this._onhandleChangeLocation.bind(this);
    }  
   
    
    render() {
        return(  
            <div className="choose-location-wrapper">
                <div class="choose-location-elements-container">
                    <p className="choose-location-title">Choose your location in order to modify something...</p>
                    <div className="choose-location-dropdown">
                        <DropDownMenu
                            value={this.state.selectedLocationId}
                            onChange={this._onhandleChangeLocation}
                            style={styles.customWidth}
                            autoWidth={false}
                        >
                            {this._renderDropDownLocations()}      
                        </DropDownMenu>
                    </div>
                    <div className="choose-location-button">
                        <RaisedButton label="CHOOSE" onClick={this._triggerLocationAdministratorComponent}/>
                    </div>
                </div>
            </div>
        );

    }
    _onhandleChangeLocation = (event, index, value) => {
        this.setState({
            selectedLocationId: value
        });
    }

    _triggerLocationAdministratorComponent() {
        if(this.state.selectedLocationId) {
            this.props.goToOwnerLocationInfoComponent(this.state.selectedLocationId)
        } else {
            notificationError('You need to choose a location');
        }
        

    }

    _renderDropDownLocations() {
        return this.props.ownerLocations.map((location) => {
            return (
                <MenuItem
                    key={location._id}
                    value={location._id} 
                    primaryText={location.name}
                    
                />
            );
        });
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

export default connect (mapStateToProps, { fetchOwnerLocations }) (ChooseLocationDropdown);