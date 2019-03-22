import React, { Component } from 'react';
import GoogleMap from './GoogleMap/GoogleMap';

import { connect } from 'react-redux';

import { fetchLocationsByCity } from '../../../../reducers/locationReducer/index';

class GoogleMapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
            hoveredPinPoint: null
            
        };
        this._getCenterCoordinates = this._getCenterCoordinates.bind(this);
        this._getCenterZoom = this._getCenterZoom.bind(this);
        this._triggeredPinPointHovering = this._triggeredPinPointHovering.bind(this);
        
	}

	render() {
		return (
            // <div></div>
            <GoogleMap 
                locationsList = {this.props.locationsListByCity}
                getCenterCoordinates = {this._getCenterCoordinates}
                getCenterZoom = {this._getCenterZoom}
                hoveredPinPoint = {this.state.hoveredPinPoint}
            /> 
		);
    }
    
    _getCenterCoordinates() {

        let center = {
            lat: parseFloat(this.props.locationsListByCity[0].coordinates.latitude),
            lng: parseFloat(this.props.locationsListByCity[0].coordinates.longitude)
        };
        return center;

    }
    _getCenterZoom() {
        let centerZoom = 12;
        return centerZoom;
    }

    _triggeredPinPointHovering(hoveredPinPoint, pinPointId) {
        if(hoveredPinPoint === true) {
            this.setState({
                hoveredPinPoint: pinPointId
            });
        } else {
            this.setState({
                hoveredPinPoint: null
            })
        }
    }
}

const mapStateToProps = (state) => ({
    locationsListByCity: state.locations.locationsListByCity,
});
  
export default connect(mapStateToProps, { fetchLocationsByCity })(GoogleMapContainer);