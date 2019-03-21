import React, {Component} from 'react';
import MostRatedLocations from './MostRatedLocations/MostRatedLocations';
import {notificationError} from '../../shared/constants';

class MostRatedLocationsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationsList: []

        };
        
        this._getMostRatedLocations = this._getMostRatedLocations.bind(this);
    }

    componentDidMount() {
        this._getMostRatedLocations();
    }

    _getMostRatedLocations = function () {
        fetch('http://localhost:3001/api/location/getMostRatedLocations', {
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
           },
           method: 'get',
        }).then(function(response){
            if(response.status === 200) {
                response.json().then((data) => {
                    this.setState({locationsList: data});
                })
            } else {
                response.json().then((data) => {
                    notificationError(data.message);
                });
            }
        }.bind(this));

    }

    render() {
        return(
            <div>
                <MostRatedLocations 
                    locationsList={this.state.locationsList}
                    triggeredBody = {this.props.triggeredBody}
                />
            </div>
        );
    }
}

export default MostRatedLocationsContainer;