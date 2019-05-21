import React, { Component } from 'react';

import Home from './Home/Home'
import HeaderContainer from '../HeaderContainer/HeaderContainer';
import BodyContainer from '../BodyContainer/BodyContainer';
import {cookies} from '../../shared/constants';

class HomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
            userData: cookies.get('user'),
            componentMountInBody: 'MostRatedLocationsComponent',
            urlLocationData: props.urlLocationData
        };
        this._manageBodyComponents = this._manageBodyComponents.bind(this);
	}

	render() {
		return (
			<div>
                <HeaderContainer 
                    manageBodyComponents = {this._manageBodyComponents}
                    isLocationSearchMount = {true}
                />
                <BodyContainer 
                    componentToMount = {this.state.componentMountInBody} 
                    urlLocationData = {this.state.urlLocationData}
                />
               
				<Home userData={this.state.userData} />
                
			</div>
		);
    }
    
    _manageBodyComponents(mountComponent) {
        if(mountComponent === 'LocationSearchComponent') {
            this.setState({
                componentMountInBody: mountComponent
            })
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.urlLocationData !== null) {
            this.setState({
                urlLocationData: newProps.urlLocationData,
                componentMountInBody: newProps.componentMountInBody
            });
        }
    }
}

export default HomeContainer;