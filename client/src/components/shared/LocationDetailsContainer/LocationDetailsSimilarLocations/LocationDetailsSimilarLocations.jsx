import React, { Component } from 'react';
import { GridList } from 'material-ui';

import { notificationError } from '../../constants';
import LocationTileItemContainer from '../../LocationTileItemContainer/LocationTileItemContainer';
import './LocationDetailsSimilarLocations.css';


const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    }
};
  

class LocationDetailsSimilarLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
           similarLocations: [] 
        };
        this._getSimilarLocations = this._getSimilarLocations.bind(this);
    }

    render() {
        return (
            <div className="location-details-similars">
                <p className="location-details-similars__title">   
                    Here are some locations you may also like...
                </p>

                <div className="location-details-similars__grid" style={styles.root}>
                    <GridList 
                        style={styles.gridList} 
                        cols={3}
                        className="grid-items"
                    >
                        {this.state.similarLocations.map((location, index) => {
                            return(<LocationTileItemContainer
                                locationData={location}
                                key={location._id}
                                triggeredBody = {this.props.triggeredBody}
                            />)
                        })}
                    </GridList>
                </div>
            </div>
        );
    }

    _getSimilarLocations() {

        let locationInfo = {
            filters: {
                meals: this.props.locationDetails.categories.meals.slice(),
                goodFor: this.props.locationDetails.categories.goodFor.slice(),
                cuisine: this.props.locationDetails.categories.cuisine.slice()
            },
            cityLocation: this.props.locationDetails.city
        }

        fetch(`http://localhost:3001/api/location/getSimilarLocations`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'post',
            body: JSON.stringify(locationInfo),
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((locations) => {
                    locations.forEach((location, index) => {
                        if(location._id === this.props.locationDetails._id) {
                            locations.splice(index, 1);
                        }
                    });
                    this.setState({
                        similarLocations: locations
                    });
                })
            } else {
                response.json().then((error) => {
                    notificationError(error.message);
                })
            }
        }.bind(this));
    }

    componentWillMount() {
        this._getSimilarLocations();    
    }

    componentWillReceiveProps(newProps) {
        this._getSimilarLocations();
    }
}

export default LocationDetailsSimilarLocations;