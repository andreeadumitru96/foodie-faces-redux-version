import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PinPoint from '../PinPoint/PinPoint';

import './GoogleMap.css'

class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredPinPoint: null
        }
    }


    render() {
        return (
            <div className="google-maps">
                {this.props.locationsList.length ?
                    <GoogleMapReact
                        center={this.props.getCenterCoordinates()}
                        defaultZoom={this.props.getCenterZoom()}
                        hoverDistance={30 / 2}
                        distanceToMouse={this._distanceToMouse}

                    >
                        {this.props.locationsList.map((location) => {
                            return (
                                location.coordinates.latitude ?

                                    <PinPoint
                                        isHovered={this.state.hoveredPinPoint === location._id ? true : false}
                                        lat={parseFloat(location.coordinates.latitude)}
                                        lng={parseFloat(location.coordinates.longitude)}
                                        key={location._id}


                                    />
                                    :
                                    null

                            )
                        })}

                    </GoogleMapReact> 
                :
                    null
                }
                
            </div>
        );
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            hoveredPinPoint: newProps.hoveredPinPoint
        })
    }

}

export default GoogleMap;