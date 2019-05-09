import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import { fetchLocationById } from '../../../../reducers/locationReducer/index';


class OwnerLocationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div>
                {this.props.locationDetails ? 
                    <div>
                        <p>Here are some information for your location</p>
                        <h5>Name: </h5>
                        <h5>{this.props.locationDetails.name}</h5>

                        <p>Modify seats</p>
                        <TextField
                            id="outlined-number"
                            label="Number"
                            // value={}
                            type="number"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                :
                    null
                }
               

                
                
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchLocationById(this.props.selectedLocationId);
    }


}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails
});

  
export default connect ( mapStateToProps, { fetchLocationById }) (OwnerLocationInfo);