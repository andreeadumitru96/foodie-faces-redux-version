import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar'

import './LocationDetailsMenu.css';

class LocationDetailsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this._sortMenuItemsByCategory = this._sortMenuItemsByCategory.bind(this);
        this._getFormattedMenuByCategory = this._getFormattedMenuByCategory.bind(this);
    }

    render() {
        return (
            <div className="location-details-menu">
                <div className="location-details-menu__title">
                    <p> Menu </p>
                    {this.props.locationDetails.menu.length > 0 ?
                        <div className="location-details-menu__dishes-list">
                            <List>
                                {Object.keys(this._getFormattedMenuByCategory()).map((key, index) => {
                                    return (<ListItem
                                        primaryText={key}
                                        initiallyOpen={false}
                                        primaryTogglesNestedList={true}
                                        nestedItems={
                                            this._getFormattedMenuByCategory()[key].map((item) => {
                                                return (<ListItem
                                                    leftAvatar={<Avatar icon={<img src={item.image} alt="" />} />}
                                                    key={item.name}
                                                    primaryText={item.name}
                                                    rightIcon={<span>{Math.round(item.price * 10) / 10}€</span>}
                                                />)
                                            })
                                        }
                                    >
                                    </ListItem>)
                                })}
                            </List>
                        </div>
                        :
                        <p className="title-no-items"> There are no items in the menu</p>
                    }
                </div>
            </div>
        );
    }

    _sortMenuItemsByCategory() {

        this.props.locationDetails.menu.sort(function (a, b) {
            var categoryA = a["category"].toLowerCase(), categoryB = b["category"].toLowerCase();
            return categoryA.localeCompare(categoryB);
        });
    }

    _getFormattedMenuByCategory() {

        this._sortMenuItemsByCategory();

        let formattedMenu = {};

        this.props.locationDetails.menu.forEach((item, index) => {
            let formattedItem = {
                name: item.name,
                price: item.price,
                score: item.score,
                image: item.image[0]
            }

            if (index === 0) {
                formattedMenu[item.category] = [];
                formattedMenu[item.category].push(formattedItem)

            } else if (item.category === this.props.locationDetails.menu[index - 1].category) {
                formattedMenu[item.category].push(formattedItem);

            } else {
                formattedMenu[item.category] = [];
                formattedMenu[item.category].push(formattedItem)
            }
        });
        return formattedMenu;
    }

}

export default LocationDetailsMenu;