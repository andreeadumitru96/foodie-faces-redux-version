import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PinPoint from '../../../individual/LocationSearchContainer/GoogleMapContainer/PinPoint/PinPoint';

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
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    onChange={this._onChange}
                    defaultZoom={this._getCenterZoom()}
                    center = {this._getCenterCoordinates()}
                >
                    <PinPoint
                        text={this.props.locationDetails.name}
                        lat={parseFloat(this.props.locationDetails.coordinates.latitude)}
                        lng={parseFloat(this.props.locationDetails.coordinates.longitude)}
                        key={this.props.locationDetails.name} />
                </GoogleMapReact>
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

export default LocationDetailsMap;