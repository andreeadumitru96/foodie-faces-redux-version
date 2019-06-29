import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";

import { API_URL } from '../../constants';
import { API_PORT_URL, HOST_URL } from '../../constants'

import ReactStars from 'react-stars'
import { fetchLocationById } from '../../../../reducers/locationReducer/index';
import './LocationDetailsHeader.css';

class LocationDetailsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationDetails: props.locationDetails
            
        };
        // this._onListenSocket = this._onListenSocket.bind();

    }

    render() {
        return (
            <div className="location-details-header">
                {Object.entries(this.state.locationDetails).length === 0 && this.state.locationDetails.constructor === Object ?

                    null

                :
                    <div>
                        <div className="location-details-header__title-container">
                            <div className="title-container__name">
                                {this.state.locationDetails.name}
                            </div>
                            <div className="title-container__rating">
                                <ReactStars
                                    count={5}
                                    size={18}
                                    color2={'black'}
                                    half={false}
                                    edit={false}
                                    value={this.state.locationDetails.tripAdvisorRating}
                                />
                            </div>
                        </div>

                        <div className="location-details-header__information">
                            <div className="information__general">
                                {
                                    this.state.locationDetails.address
                                        ?
                                        <div className="information-address information-item">
                                            <i className="fa fa-map-marker"> Address: </i>
                                            <span className="information-address-span main-information-details">
                                                {this.state.locationDetails.address}
                                            </span>
                                        </div>
                                        : null
                                }
                                {
                                    this.state.locationDetails.phone.length > 0 && this.state.locationDetails.phone[0] !== ''
                                        ?
                                        <div className="information-phone information-item">
                                            <i className="fa fa-phone"> Phone Number: </i>
                                            <span className="information-phone-span main-information-details">
                                                {this.state.locationDetails.phone[0]}
                                            </span>
                                        </div>
                                        : null
                                }
                                {
                                    this.state.locationDetails.price
                                        ?
                                        <div className="information-average-price information-item">
                                            <i className="fa fa-money"> Price Range: </i>
                                            <span className="information-average-price-span main-information-details">
                                                {this.state.locationDetails.price}
                                            </span>
                                        </div>
                                        : null
                                }
                                {
                                    this.state.locationDetails.availableSeats
                                        ?
                                        <div className="information-available-seats information-item">
                                            <i class="fas fa-chair"> Available Seats: </i>
                                            <span className="information-available-seats-span main-information-details">
                                                {this.state.locationDetails.availableSeats}
                                            </span>
                                        </div>
                                        : null
                                }
                            </div>

                        
                        </div>
                    </div>
                    
                }

            </div>
        );
    }

    _onListenSocket = () => {
        const socket = socketIOClient(`http://${HOST_URL}:${API_PORT_URL}`);
        socket.on('onSendUpdatedLocation', (updatedLocation) => {

            this.setState({
                locationDetails: updatedLocation
            })
        
        });

    }

    componentDidMount() {
        
        this.props.fetchLocationById(this.props.locationId);
        this._onListenSocket();

    }

    componentWillReceiveProps(newProps) {
        if(newProps) {
            this.setState({
                locationDetails: newProps.locationDetails
            });
        }
        if(newProps.locationDetails._id !== newProps.locationId) {
            this.props.fetchLocationById(this.props.locationId);
            
        }
    }

}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails

});

export default connect(mapStateToProps, { fetchLocationById })(LocationDetailsHeader);