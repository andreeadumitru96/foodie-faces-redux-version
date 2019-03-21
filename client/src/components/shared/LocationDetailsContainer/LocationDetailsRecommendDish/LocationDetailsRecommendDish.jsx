import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RaisedButton } from 'material-ui';

import { notificationError } from '../../constants';
import './LocationDetailsRecommendDish.css';

class LocationDetailsRecommendDish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null,
            menuDishes: [],
            isRecommendDishOpen: this.props.isRecommendDishOpen,
            isDishRecommended: false
        };

        this._getMenuDishes = this._getMenuDishes.bind(this);
        this._getDropDownItems = this._getDropDownItems.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._onRecommendDish = this._onRecommendDish.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._onPressedRecommend = this._onPressedRecommend.bind(this);
    }

    render() {
        return (

            <Dialog
                modal={false}
                open={this.state.isRecommendDishOpen}
                onRequestClose={this._handleClose}
            >

                <div className="location-details-recommend-dish">
                    {this.state.isDishRecommended ?
                        <div className="location-details-recommend-dish__done">
                            <div className="done-title">
                                Thank you for the recommended dish
                            </div>
                        </div>
                        :
                        <div className="location-details-recommend-dish__add-dish">
                            <div className="add-dish-title">
                                What did you like? Recommend a dish!
                            </div>

                            <SelectField
                                multiple={false}
                                value={this.state.selectedDish}
                                onChange={this._handleChange}
                                className="add-dish-items"
                            >
                                {this._getDropDownItems()}
                            </SelectField>

                            <div className="add-dish-actions">
                                <RaisedButton
                                    label="Recommend"
                                    onClick={this._onRecommendDish}
                                    className="add-dish-actions--recommend"
                                />
                                <RaisedButton
                                    label="Cancel"
                                    onClick={this._handleClose}
                                    className="add-dish-actions--cancel"
                                />
                            </div>
                        </div>
                    }
                </div>


            </Dialog>
        );
    }

    _getMenuDishes() {

        let id = this.props.locationDetails._id;

        fetch(`http://localhost:3001/api/location/getMenuDishes/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'get'
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((menuDishes) => {
                    this.setState({
                        menuDishes: menuDishes
                    });
                })
            } else {
                response.json().then((error) => {
                    notificationError(error.message);
                })
            }
        }.bind(this));
    }

    _getDropDownItems() {
        return this.state.menuDishes.map((item) => (
            <MenuItem
                key={item.name}
                insetChildren={true}
                checked={this.state.menuDishes.name && this.state.menuDishes.name.indexOf(item) > -1}
                value={item.name}
                primaryText={item.name}
            />
        ));
    }

    _handleChange(event, index, values) {
        this.setState({ selectedDish: values });
    }

    _onRecommendDish() {

        let recommendDishImage;

        this.state.menuDishes.forEach((item) => {
            if (item.name === this.state.selectedDish) {
                recommendDishImage = item.image[0];
            }
        })

        let data = {
            locationId: this.props.locationDetails._id,
            recommendedDish: {
                name: this.state.selectedDish,
                image: recommendDishImage
            }
        }

        if (!data.recommendedDish.image) {
            notificationError("Please choose a dish");
        }
        else {
            fetch(`http://localhost:3001/api/location/recommendDish`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                method: 'post',
                body: JSON.stringify(data),
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((menuDishes) => {

                    })
                } else {
                    response.json().then((error) => {
                        notificationError(error.message);
                    })
                }
            }.bind(this));

            this._onPressedRecommend();
        }
    }

    componentWillMount() {
        this._getMenuDishes();
    }

    _handleClose() {
        this.setState({
            isRecommendDishOpen: !this.state.isRecommendDishOpen
        });
        this.props.triggerWindowClose();
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            isRecommendDishOpen: newProps.isRecommendDishOpen
        })
    }

    _onPressedRecommend() {
        this.setState({
            isDishRecommended: !this.state.isDishRecommended
        })
    }

    
}

export default LocationDetailsRecommendDish;