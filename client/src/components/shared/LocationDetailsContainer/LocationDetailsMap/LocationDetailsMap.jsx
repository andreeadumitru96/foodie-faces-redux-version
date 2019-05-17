import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import PinPoint from '../../../individual/LocationSearchContainer/GoogleMapContainer/PinPoint/PinPoint';

import { fetchLocationById } from '../../../../reducers/locationReducer/index';

class LocationDetailsMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this._getCenterCoordinates = this._getCenterCoordinates.bind(this);
        this._getCenterZoom = this._getCenterZoom.bind(this);
    }

    render() {
        return (
            <div className="google-maps">
                {
                    Object.entries(this.props.locationDetails).length === 0 && this.props.locationDetails.constructor === Object ?
                        null
                        :
                        <GoogleMapReact
                            defaultCenter={this.props.center}
                            onChange={this._onChange}
                            defaultZoom={this._getCenterZoom()}
                            center={this._getCenterCoordinates()}
                        >
                            <PinPoint
                                text={this.props.locationDetails.name}
                                lat={parseFloat(this.props.locationDetails.coordinates.latitude)}
                                lng={parseFloat(this.props.locationDetails.coordinates.longitude)}
                                key={this.props.locationDetails.name} />
                        </GoogleMapReact>
                        

                }

            </div>
        );
    }

    _getCenterCoordinates() {

        let center = {
            lat: parseFloat(this.props.locationDetails.coordinates.latitude),
            lng: parseFloat(this.props.locationDetails.coordinates.longitude)
        };
        return center;

    }

    _getCenterZoom() {
        let centerZoom = 16;
        return centerZoom;
    }

}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails
});

export default connect(mapStateToProps, { fetchLocationById })(LocationDetailsMap);