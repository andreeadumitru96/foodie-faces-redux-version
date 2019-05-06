import React, { Component } from 'react';
import Badge from 'material-ui/Badge';


import { notificationError } from '../../constants';
import './LocationDetailsMostRecommendedDishes.css';

class LocationDetailsMostRecommendedDishes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostRecommendedDishes: []
        };
        this._getMostRecommendedDishes = this._getMostRecommendedDishes.bind(this);
    }

    render() {
        return (
            <div className="location-details-most-recommended-dishes">
                <div className="list-title">
                    <p>Most recommended dishes</p>
                </div>
                {this.state.mostRecommendedDishes.length > 0 ?

                    <div className="location-details-most-recommended-dishes__list">
                        <div className="list-items">
                            {this.state.mostRecommendedDishes.map(dish => {
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
        );
    }

    _getMostRecommendedDishes(location) {

        let id = location._id;

        fetch(`http://localhost:3001/api/location/getRecommendedDishes/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'get'
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((dishes) => {
                    this.setState({
                        mostRecommendedDishes: dishes
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
        this._getMostRecommendedDishes(this.props.locationDetails);
    }

    componentWillReceiveProps(newProps) {
        this._getMostRecommendedDishes(newProps.locationDetails);
    }
}

export default LocationDetailsMostRecommendedDishes;