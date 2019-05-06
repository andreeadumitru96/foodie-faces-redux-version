import React, { Component } from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';


import { notificationError } from '../../constants';
import './LocationDetailsMostRecommendedDishes.css';
import { fetchLocationById } from '../../../../reducers/locationReducer/index';
import { fetchMostRecommendedDishes } from '../../../../reducers/locationReducer/index';


class LocationDetailsMostRecommendedDishes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this._getMostRecommendedDishes = this._getMostRecommendedDishes.bind(this);
    }

    render() {
        return (
            <div className="location-details-most-recommended-dishes">
                <div className="list-title">
                    <p>Most recommended dishes</p>
                </div>
                {
                    this.props.mostRecommendedDishes ? 
                        <div>
                            {this.props.mostRecommendedDishes.length > 0 ?

                                <div className="location-details-most-recommended-dishes__list">
                                    <div className="list-items">
                                        {this.props.mostRecommendedDishes.map(dish => {
                                            // return (<Badge
                                            //     badgeContent={<img src={dish.image} alt="" />}
                                            //     primary={true}
                                            //     className="list-badge"
                                            // >
                                            //     <div className="list-badge-text">{dish.name}</div>
                                            // </Badge>)
                                            return (
                                                <div className="item-container">
                                                    <img src={dish.image}/>
                                                    <p>{dish.name}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                :
                                <div className="title-no-dishes">
                                    <p>There are no recommended dishes yet</p>
                                </div>
                            }
                        </div>
                    :
                        null
            }
                
            </div>
        );
    }

    _getMostRecommendedDishes() {
        this.props.fetchMostRecommendedDishes(this.props.locationDetails._id).then(() =>{

        }).catch((errorMessage) => {
            notificationError(errorMessage);
        });
    }

    componentDidMount() {
        this._getMostRecommendedDishes();
    }
}
const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails,
    mostRecommendedDishes: state.locations.mostRecommendedDishes
});

export default connect(mapStateToProps, { fetchLocationById, fetchMostRecommendedDishes })(LocationDetailsMostRecommendedDishes);