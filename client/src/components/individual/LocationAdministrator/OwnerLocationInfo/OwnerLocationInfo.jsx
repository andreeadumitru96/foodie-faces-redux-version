import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import socketIOClient from "socket.io-client";

import { API_URL } from '../../../shared/constants';

import { fetchLocationById } from '../../../../reducers/locationReducer/index';


class OwnerLocationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableSeats: null
        };
        this.onUpdateSeatsSocketSend = this.onUpdateSeatsSocketSend.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange = event => {
        console.log(event.target.value);
        this.setState({
            availableSeats: event.target.value
        });
    };

    render() {
        // const socket = socketIOClient(API_URL);

        // socket.on('mock data event from server', (data) => {
        //   console.log(data)
        // })
    
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
                            onChange={this.handleOnChange}
                            type="number"
                            margin="normal"
                            variant="outlined"
                        />
                        <button type="text" onClick={this.onUpdateSeatsSocketSend}> Update seats </button>
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

    onUpdateSeatsSocketSend = () => {
        const socket = socketIOClient(API_URL);

        let locationToUpdate = {
            locationId: this.props.locationDetails._id,
            availableSeats: this.state.availableSeats
        }

        socket.emit('onUpdateSeatsEvent', locationToUpdate);    
    }    

}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails,
});

  
export default connect ( mapStateToProps, { fetchLocationById }) (OwnerLocationInfo);