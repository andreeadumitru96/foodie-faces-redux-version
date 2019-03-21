import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class FilterItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: []

        };
        this._getFilterItems = this._getFilterItems.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._getSelectedFilters = this._getSelectedFilters.bind(this);
    }

    render() {
        return (
            <SelectField
                multiple={true}
                hintText={this.props.type}
                value={this.state.selectedFilters}
                onChange={this._handleChange}
            >
                {this._getFilterItems()}
            </SelectField>
        );
    }

    _getSelectedFilters() {
        return this.state.selectedFilters;
    }

    _handleChange(event, index, values) {
        this.setState({selectedFilters: values});
    } 

    _getFilterItems() {
        return this.props.filterElements.map((item) => (
            <MenuItem
                key={item}
                insetChildren={true}
                checked={this.state.selectedFilters && this.state.selectedFilters.indexOf(item) > -1}
                value={item}
                primaryText={item}
            />
        ));
    }

}

export default FilterItem;