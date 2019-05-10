import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import socketIOClient from "socket.io-client";

import { fetchLocationById } from '../../../../reducers/locationReducer/index';


class OwnerLocationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onMockMessageSocketSend = this.onMockMessageSocketSend.bind(this);
    }

    render() {
        const socket = socketIOClient('localhost:3001');
        socket.on('mock data event from server', (data) => {
          console.log(data)
        })
    
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
                        <button type="text" onClick={this.onMockMessageSocketSend}> Socket Test </button>
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

    onMockMessageSocketSend = () => {
        const socket = socketIOClient('localhost:3001');
        socket.emit('mock data event from client', 'socket test');
    }    


}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails
});

  
export default connect ( mapStateToProps, { fetchLocationById }) (OwnerLocationInfo);