import React, { Component } from 'react';
import { connect } from 'react-redux';

// import './LocationDetailsActions.css';
import { fetchLocationById } from '../../../../reducers/locationReducer/index';

class LocationDetailsActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
           
            <div className="information-categories">
                {Object.entries(this.props.locationDetails).length === 0 && this.props.locationDetails.constructor === Object ?
                    null
                :
                    <div className="categories-wrapper">
                        {
                            this.props.locationDetails.categories.goodFor.length !== 0
                                ?
                                <div className="infromation-categories__good-for information-categories__general">
                                    <div className="good-for__label label-container">
                                        <span className="label-text"> Good For: </span>
                                    </div>
                                    <ul className="good-for__items">
                                        {this.props.locationDetails.categories.goodFor.map((item) => {
                                            return (
                                                <li className="items__item">
                                                    {item}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                : null
                        }

                        {
                            this.props.locationDetails.categories.meals.length !== 0
                                ?
                                <div className="infromation-categories__meals information-categories__general">
                                    <div className="meals__label label-container">
                                        <span className="label-text"> Meals: </span>
                                    </div>
                                    <ul className="meals__items">
                                        {this.props.locationDetails.categories.meals.map((item) => {
                                            return (
                                                <li className="items__item">
                                                    {item}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                : null
                        }
                        {
                            this.props.locationDetails.categories.cuisine.length !== 0
                                ?
                                <div className="infromation-categories__cuisine information-categories__general">
                                    <div className="cuisine__label label-container">
                                        <span className="label-text"> Cuisine: </span>
                                    </div>
                                    <ul className="cuisine__items">
                                        {this.props.locationDetails.categories.cuisine.map((item) => {
                                            return (
                                                <li className="items__item">
                                                    {item}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                : null
                        }
                        {
                            this.props.locationDetails.categories.cuisine.length === 0
                                && this.props.locationDetails.categories.meals.length === 0
                                && this.props.locationDetails.categories.goodFor.length === 0
                                ?
                                <div className="infromation-categories__cuisine__no-categories information-categories__general">
                                    <p>There are no categories for this place yet</p>
                                </div>
                                : null
                        }
                    </div>
                }
            </div>
        );
    }



    componentWillReceiveProps(newProps) {
        // if(newProps.locationDetails && newProps.locationDetails.menu.length > 0) {
        //     this.setState({
        //         isMenuDishesAvailable: !this.state.isMenuDishesAvailable
        //     });
        // }
    }

}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails

});

export default connect(mapStateToProps, { fetchLocationById })(LocationDetailsActions);