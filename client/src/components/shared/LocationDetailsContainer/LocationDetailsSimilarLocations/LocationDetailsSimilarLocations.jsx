import React, { Component } from 'react';
import { GridList } from 'material-ui';
import { connect } from 'react-redux';

import { fetchSimilarLocations } from '../../../../reducers/locationReducer/index.js';
import { fetchLocationById } from '../../../../reducers/locationReducer/index.js';

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
        this._getSimilarLocations = this._getSimilarLocations.bind(this);
    }

    render() {
        return (
            <div className="location-details-similars">
                <p className="location-details-similars__title">   
                    Here are some locations you may also like...
                </p>

                {this.props.similarLocations.length > 0 ?

                    <div className="location-details-similars__grid" style={styles.root}>
                        <GridList 
                            style={styles.gridList} 
                            cols={3}
                            className="grid-items"
                        >
                            {this.props.similarLocations.map((location, index) => {
                                return(<LocationTileItemContainer
                                    locationsTypeFlag = 'SimilarLocationsComponent'
                                    locationId={location._id}
                                    key={location._id}
                                    triggeredBody = {this.props.triggeredBody}
                                />)
                            })}
                        </GridList>
                    </div>
                :
                    null
                }
            </div>
        );
    }

    _getSimilarLocations(locationDetails) {
      
        let locationInfo = {
            filters: {
                meals: locationDetails.categories.meals.slice(),
                goodFor: locationDetails.categories.goodFor.slice(),
                cuisine: locationDetails.categories.cuisine.slice()
            },
            cityLocation: locationDetails.city
        }
        this.props.fetchSimilarLocations(locationInfo, locationDetails._id); 
        console.log(this.props.similarLocations); 
    }
    componentWillReceiveProps(newProps) {
        if(newProps.locationDetails && JSON.stringify(this.props.locationDetails) !== JSON.stringify(newProps.locationDetails)) {
            this._getSimilarLocations(newProps.locationDetails); 
        }
        
    }
}

const mapStateToProps = (state) => ({
    similarLocations: state.locations.similarLocations,
    locationDetails: state.locations.locationDetails

});

export default connect(mapStateToProps, { fetchLocationById, fetchSimilarLocations })(LocationDetailsSimilarLocations);