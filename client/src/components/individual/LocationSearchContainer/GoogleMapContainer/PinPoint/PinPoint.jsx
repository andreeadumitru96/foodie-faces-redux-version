import React, { Component } from 'react';

import './PinPoint.css';


class PinPoint extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isHovered: false
        }
    }

    render() {
        return (
            <div>
                {this.state.isHovered ?
                    <div className="pin-point-hovered">
                        <i className="fa fa-map-marker"></i>
                    </div>
                    :
                    <div className="pin-point">
                        <i className="fa fa-map-marker"></i>
                    </div>
                }
            </div>
        );
    }

    componentWillReceiveProps(newProps) {
        this.setState({isHovered: newProps.isHovered})
    }
}

export default PinPoint;